interface IContentfulEntry {
  sys: {
    id?: string
  }
  fields: any
}

export const prettifyEntry =
  ({ sys: { id }, fields }: IContentfulEntry): object =>
    ({ id, ...fields })

export default {
  prettifyEntry
}
