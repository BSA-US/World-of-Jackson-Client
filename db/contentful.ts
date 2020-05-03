import * as contentful from 'contentful'

const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT
const contentfulContentDeliveryApiToken =
  process.env.CONTENTFUL_CONTENT_DELIVERY_API_TOKEN

export default contentful.createClient({
  space: contentfulSpaceId || '7zzvnrgo4q2e',
  environment: contentfulEnvironment || 'dev',
  accessToken:
    contentfulContentDeliveryApiToken
    || 'YxKrxYCp3AdRcB4wRjFS_tIT49DyByCqyogZ-K-kJmE'
})
