export interface ILngLat {
  lng: number
  lat: number
}

export interface IMapboxCallbackParams {
  location: LngLat
  buildingIds?: Array<(string | number)>
  buildingProperty?: any | null
}

export type MapboxCallback = ({ location, buildingProperty, buildingIds }: IMapboxCallbackParams) => void

export interface IMapLayerParams {
  cam_lat: number
  cam_long: number
  zoom: number
  hash: number
  buildingIds: { [key: string]: true },
  callback: MapboxCallback
}
