export const {
  CONTENTFUL_SPACE_ID: contentfulSpaceId,
  CONTENTFUL_ENVIRONMENT: contentfulEnvironment,
  CONTENTFUL_DELIVERY_API_TOKEN: contentfulContentDeliveryApiToken
} = process.env

export const contentful = {
  spaceId: contentfulSpaceId,
  environment: contentfulEnvironment,
  tokens: {
    contentDeliveryApi: contentfulContentDeliveryApiToken
  }
}

export default {
  contentful
}
