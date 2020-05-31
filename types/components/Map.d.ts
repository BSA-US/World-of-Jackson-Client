export interface ILngLat {
  lng: number
  lat: number
}

export interface IOnBuildingClickedParams {
  location: LngLat
  buildingIds?: Array<(string | number)>
  buildingProperty?: any | null
}

export type OnBuildingClicked = ({ location, buildingProperty, buildingIds }: IOnBuildingClickedParams) => void

export interface IMapLayerParams {
  cam_lat: number
  cam_long: number
  zoom: number
  hash: number
  buildingIds: { [key: string]: true },
  onBuildingClicked: OnBuildingClicked
}
