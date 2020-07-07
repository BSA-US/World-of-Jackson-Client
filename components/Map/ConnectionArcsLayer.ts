import { ArcLayer } from "@deck.gl/layers";

// import { Entry } from 'contentful';
import { IBuilding } from '~/types/db/contentful';

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
      // TODO(odbol): use the color of the buildings? or custom color depending on connection type??
      startColor: [255, 180, 204],
      endColor: [178, 0, 38]
    });
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
