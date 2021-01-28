import {
  Zone,
  Lot,
  Building,
  TourNode,
  Tour

} from '~/db/objects'

export const all = [
  ...Zone.all,
  ...Lot.all,
  ...Building.all,
  ...TourNode.all,
  ...Tour.all
]

export default {
  all
}
