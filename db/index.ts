import tmpContentful from './contentful'
import tmpUtils from './utils'
import TmpZone from './Zone'
import TmpLot from './Lot'
import TmpBuilding from './Building'
import TmpMapItem from './MapItem'
import TmpMap from './MapItem'

export const contentful = tmpContentful
export const utils = tmpUtils
export const Zone = TmpZone
export const Lot = TmpLot
export const Building = TmpBuilding
export const MapItem = TmpMapItem
export const Map = TmpMap

export default {
  contentful,
  utils,
  Map,
  MapItem,
  Zone,
  Lot,
  Building
}
