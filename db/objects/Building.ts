import { ContentfulObject } from '~/db/classes'
import { IBuildingFields } from '~/types/db/contentful'

export default new ContentfulObject<IBuildingFields>({
  options: {
    content_type: 'building'
  }
})
