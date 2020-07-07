import { ArcLayer } from "@deck.gl/layers";

import { scaleLinear } from "d3-scale";

// import { Entry } from 'contentful';
import { IBuilding } from '~/types/db/contentful';

//@ts-ignore
// export const COLOR_SCALE = scaleThreshold()
// .domain([
//   -0.6,
//   -0.45,
//   -0.3,
//   -0.15,
//   0,
//   0.15,
//   0.3,
//   0.45,
//   0.6,
//   0.75,
//   0.9,
//   1.05,
//   1.2
// ])
// .range([
//   [65, 182, 196],
//   [127, 205, 187],
//   [199, 233, 180],
//   [237, 248, 177],
//   // zero
//   [255, 255, 204],
//   [255, 237, 160],
//   [254, 217, 118],
//   [254, 178, 76],
//   [253, 141, 60],
//   [252, 78, 42],
//   [227, 26, 28],
//   [189, 0, 38],
//   [128, 0, 38]
// ]);

//@ts-ignore
const COLOR_SCALE = scaleLinear().domain([0, 100]).range([[255, 255, 204], [128, 0, 38]]);

function getCenterCoords(feature: IBuilding): ILatLon {
  // TODO(odbol): fix latitutde spelling???
  return [feature.fields.longitude, feature.fields.latitutde];
}


type ILatLon = number[];

interface IConnection {
  start: ILatLon,
  end: ILatLon,
  startColor: any,
  endColor: any
};

// TODO(odbol): load connections from the db instead of these fake ones.
function createFakeConnectionsData(objects: { [key: string]: any }): IConnection[] {
  const features: Array<IBuilding> = objects.Building.all;
  const connections = [];
  for (let i = 0; i < features.length; i++) {
    const endFeature = features[(i + 1) % features.length];
    connections.push({
      start: getCenterCoords(features[i]),
      end: getCenterCoords(endFeature),
      startColor: COLOR_SCALE(0),
      endColor: COLOR_SCALE(100)
    });
    console.log(`createFakeConnectionsData: ${connections[i].startColor} == ${COLOR_SCALE(0)}, ${connections[i].endColor} == ${COLOR_SCALE(100)}, ${COLOR_SCALE(Math.random() * 100)}`);
  }
  return connections;
}

export function CreateConnectionArcsLayer(objects: { [key: string]: any }) {
  const connections = createFakeConnectionsData(objects);

  console.log('CreateConnectionArcsLayer: ', connections);

  const width = 3,
    height = 2;

  return new ArcLayer({
    id: "connection-paths",
    data: connections,
    opacity: 0.8,
    getSourcePosition: (d: IConnection) => d.start,
    getTargetPosition: (d: IConnection) => d.end,
    getSourceColor: (d: IConnection) => d.startColor,
    getTargetColor: (d: IConnection) => d.endColor,
    getWidth: width,
    getHeight: height,
    pickable: true
  });
}
