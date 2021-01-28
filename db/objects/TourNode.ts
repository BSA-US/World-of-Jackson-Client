import { ContentfulObject } from '~/db/classes'
import { ITourNodeFields } from '~/types/db/contentful'

export default new ContentfulObject<ITourNodeFields>({
  options: {
    content_type: 'tourNode'
  }
})
