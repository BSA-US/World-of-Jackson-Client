import 'styled-components';

declare module 'styled-components' {
    export interface UITheme {
      borderRadius: string
      colors: {
        main: string
        secondary: string
      }
    }
  }