import type { FunctionComponent } from 'react'
import Head from 'next/head'
import { BaseLayout } from '~/layouts'
import cn from '~/styles/pages/contentful-demo.styl'
import { MapItem } from '~/db'

interface IContentfulDemoProps {
  mapItems: Array<any>
}

const ContentfulDemo: FunctionComponent<IContentfulDemoProps> = ({
  mapItems
}) => {
  return <BaseLayout>
    <Head>
      // head is set per-page
    </Head>
    <main className={cn['contentful-demo']}>
      {mapItems.map(({ id, name }) => <p key={id}>{name}</p>)}
    </main>
  </BaseLayout>
}

export async function getServerSideProps() {
  return {
    props: {
      mapItems: await MapItem.all()
    }
  }
}

export default ContentfulDemo
