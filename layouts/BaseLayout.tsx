import type { FunctionComponent } from 'react'
import Head from 'next/head'
import '~/styles/_global.styl'
import '~/styles/layouts/base.styl'

const BaseLayout: FunctionComponent = ({ children }) => <>
  <Head>
    <link
      rel='stylesheet'
      type='text/css'
      href='https://unpkg.com/destyle.css@1.0.11/destyle.css'
    />
  </Head>
  { children }
</>

export default BaseLayout
