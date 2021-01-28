import { ContentfulObject } from '~/db/classes'
import { ILotFields } from '~/types/db/contentful'

export default new ContentfulObject<ILotFields>({
  options: {
    content_type: 'lot'
  }
})
