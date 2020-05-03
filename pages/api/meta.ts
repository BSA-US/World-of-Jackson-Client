import { endpoint } from './_utils'
import type { ZeitRequest, ZeitResponse } from './_types'

const data = {
  endpoints: [
    {
      name: 'Meta',
      method: 'GET',
      path: '/meta'
    }
  ]
}

export default (req: ZeitRequest, res: ZeitResponse): Promise<void> =>
  endpoint({
    req,
    res,
    fn: (): object => ({ data })
  })
