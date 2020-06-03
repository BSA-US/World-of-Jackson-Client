import type { FunctionComponent } from 'react'
import type {
  IOnBuildingClickedParams,
  OnBuildingClicked,
  IMapLayerParams
} from '~/types/components/Map'
import { useState } from 'react'
import { StaticMap } from 'react-map-gl'
import * as DeckGLCore from '@deck.gl/core'
import * as DeckGLReact from '@deck.gl/react'
import cn from '~/styles/components/Map.styl'
import { GetLayers } from './layers'
import effects from './effects'
import { ITourNode } from '../TourBar/TourBar'

const FlyToInterpolator: any = DeckGLCore.FlyToInterpolator

export const MapPopup: FunctionComponent = () =>
  <div style={{ backgroundColor: "red" }}>map test</div>

interface IMapProps {
  className?: string
  flyToRegistration: (onBuildingClicked: OnBuildingClicked) => void
  onBuildingClicked: OnBuildingClicked
  selectedTourNode: ITourNode | null
}

const Map: FunctionComponent<IMapProps> = ({
  className = '',
  flyToRegistration,
  onBuildingClicked,
  selectedTourNode
}) => {
  const [hash, setHash] = useState<number>(0)

  const buildingIds: { [key: string]: true } = {}
  selectedTourNode && selectedTourNode.buildingIds.forEach((id: string | number) => {
    buildingIds[`${id}`] = true
  })

  // const [buildingIds, setBuildingIds] = useState<{ [key: string]: true }>({})
  // center: { lng: -90.2093766, lat: 32.3039644 },
  const [viewState, setViewState] = useState<any>({
    latitude: 32.3039644,
    longitude: -90.2094766,
    zoom: 15,
    pitch: 45,
    bearing: 45
  })

  flyToRegistration(({ location }: IOnBuildingClickedParams) => {
    // update hash
    setHash(hash + 1);
    //setBuildingIds(buildingObj);
    setViewState({
      ...viewState,
      longitude: location.lng,
      latitude: location.lat,
      zoom: 17,
      transitionDuration: 450,
      transitionInterpolator: new FlyToInterpolator()
    })
  })

  // latitude: 32.3039644,
  // longitude: -90.2094766,

  const layer_params: IMapLayerParams = {
    cam_lat: viewState.latitude,
    cam_long: viewState.longitude,
    zoom: viewState.zoom,
    hash,
    buildingIds: buildingIds,
    onBuildingClicked
  }

  return <div className={`${cn.map} ${className}`}>
    <DeckGLReact.DeckGL
      layers={ GetLayers(layer_params) }
      effects={ effects }
      controller={ true }
      initialViewState={viewState}
      viewState={viewState}
      onViewStateChange={({ viewState }: any) => setViewState(viewState)}
    >
      <StaticMap
        reuseMaps
        mapStyle={ "mapbox://styles/mapbox/dark-v9" }
        preventStyleDiffing={true}
        width={ "100%" }
        height={ "100%" }
        mapboxApiAccessToken={'pk.eyJ1IjoiZ3JhYm9yZW5rbyIsImEiOiJjazdrenBmZmgwMXhjM2xvMDUxczB3bXdrIn0.TuJeI3ekW2M3_ArY0gMeVA'}
      />
    </DeckGLReact.DeckGL>
  </div>
}

export default Map
