import type { IMapLayerParams } from '~/types/components/Map';
import mapData from '../../jackson.json';
import * as DeckGLLayers from "@deck.gl/layers";
const PolygonLayer: any = DeckGLLayers.PolygonLayer;
const SolidPolygonLayer: any = DeckGLLayers.SolidPolygonLayer;
const GeoJsonLayer: any = DeckGLLayers.GeoJsonLayer;

import * as MapBox from "mapbox-gl"

const customVertexShader: any = require('../../src/shaders/custom-polygon.ts');

class CustomSolidPolygonLayer extends SolidPolygonLayer {
  constructor(props: any, b: any, c: any) {
    super(props, b, c);
  }
  getShaders(vsShaderText: string) {
    var define_text = "#define IS_SIDE_VERTEX"
    var is_side = vsShaderText.indexOf(define_text) >= 0
    var result = Object.assign({}, super.getShaders(), {
      vs: `${is_side ? define_text : ""}\n${customVertexShader.default}`
    });
    return result;
  }
  initializeState() {
    super.initializeState()

    function get_building_center(f: any) {
      var sum_lat_long = [0, 0]
      f.geometry.coordinates[0].forEach((lat_long: any) => {
        sum_lat_long[0] += lat_long[0]
        sum_lat_long[1] += lat_long[1]
      });
      var inv_num = 1.0 / f.geometry.coordinates[0].length
      return [sum_lat_long[0] * inv_num, sum_lat_long[1] * inv_num]
    }

    this.state.attributeManager.addInstanced({
      instanceScaleOrigins: { size: 2, accessor: get_building_center }
    });    

    this.state.attributeManager.add({
      scaleOrigins: { size: 2, accessor: get_building_center }
    });    

    this.state.attributeManager.add({
      scaleFactor: { size: 1, accessor: "getScaleFactor"}
    });    

  }
}

class CustomGeoJsonLayer extends GeoJsonLayer {
  constructor(props: any) {
    super(props);
  }
  getSubLayerClass(id: any, defaultConstructor: any) {
    if (id === "polygons-fill") {
      return CustomSolidPolygonLayer;
    }
    const result = super.getSubLayerClass(id, defaultConstructor)
    return result;
  }
  getSubLayerProps(props: any) {
    const result = super.getSubLayerProps(props)
    if (props.id === "polygons-fill") {
      result.getScaleFactor = this.getSubLayerAccessor(this.props.getScaleFactor)
      result.updateTriggers.getScaleFactor = this.props.updateTriggers.getScaleFactor
    }
    return result
  }
}

CustomGeoJsonLayer.defaultProps = {
  getScaleFactor: {type: 'accessor', value: 1}
};


export function GetLayers(params: IMapLayerParams) {

  /// creates a dynamic polygon just big enough to cover all visible land area regardless of zoom level
  const size = Math.pow(2, (19 - params.zoom)) * .004
  const landCover = [
    [[params.cam_long - size, params.cam_lat - size], [params.cam_long - size, params.cam_lat + size], [params.cam_long + size, params.cam_lat + size], [params.cam_long + size, params.cam_lat - size]]
  ];
/// creating layers for a base, and to input geojson(our map data)
  const layers = [
      new PolygonLayer({ /// required for shadows to project onto
          id: "ground",
          data: landCover,
          stroked: false,
          getPolygon: (f: any) => f,
          getFillColor: [0, 0, 0.0, 0.0]
      })
      ,new CustomGeoJsonLayer({
          data: mapData,
          opacity: 0.8,
          stroked: false,
          filled: true,
          extruded: true,
          wireframe: true,
          fp64: true,
    
          getElevation: () => 20,
          // checking the building ids by listening for a change in hashes to determine which building should be highlighted
          getFillColor: (f: any) => {
            const id = `${f.properties["@id"]}`
            if (params.buildingIds[id]) {
              return [0, 255, 255, 255.0]
            }
            return [0, 255, 0, 255.0]
          },
          getScaleFactor: () => {
            //console.log("getScaleFactor called")
            return 1.0
            //return Math.random()
          },
          getLineColor: [255, 255, 255],
          updateTriggers: {
             getFillColor: [params.hash]
             ,getScaleFactor: [params.hash]
          },
          pickable: true,
          onHover: () => {},
          // click actions are used to activate any supplemental features of a building, such as rendering text
          onClick: (f: any) => {
            const id = `${f.object.properties["@id"]}`
            if (params.buildingIds[id]) {
              params.callback({
                location: new MapBox.LngLat(f.lngLat[0], f.lngLat[1]), buildingProperty: f.object.properties
              })
            }
            // params.callback(new MapBox.LngLat(f.lngLat[0], f.lngLat[1]))
          }
        })
  ];
  return layers
}
