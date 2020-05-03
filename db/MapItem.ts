import {
  Zone,
  Lot,
  Building
} from '~/db'

export const all = async (): Promise<Array<any>> => [
  ...(await Zone.all()),
  ...(await Lot.all()),
  ...(await Building.all())
]

export default {
  all
}
