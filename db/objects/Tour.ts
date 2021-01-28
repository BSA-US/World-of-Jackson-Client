import { ContentfulObject } from '~/db/classes'
import { ITourFields } from '~/types/db/contentful'

export default new ContentfulObject<ITourFields>({
  options: {
    content_type: 'tour'
  }
})
