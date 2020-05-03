/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.styl' {
  const content: {[className: string]: string};
  export default content;
}

declare module '@deck.gl/core'
declare module '@deck.gl/react'
declare module '@deck.gl/layers'

declare var __CLIENT__: boolean
