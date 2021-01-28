import { ContentfulObject } from '~/db/classes'
import {
  IProject,
  IProjectFields
} from '~/types/db/contentful'
export interface IProjectFieldsBackrelated extends IProjectFields {
  parents?: Array<IProject>
}

export default new ContentfulObject<IProjectFields>({
  options: {
    content_type: 'project'
  },
  backRelations: [
    {
      field: 'parentProjects',
      foreignField: 'projects'
    }
  ]
})
