import { ContentfulObject } from '~/db/classes'
import { IZoneFields } from '~/types/db/contentful'

export default new ContentfulObject<IZoneFields>({
  options: {
    content_type: 'zone'
  }
})
