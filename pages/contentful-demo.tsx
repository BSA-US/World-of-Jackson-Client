import {
  FunctionComponent as IFunctionComponent,
  useState
} from 'react'
import Head from 'next/head'
import { BaseLayout } from '~/layouts'
import cn from '~/styles/pages/contentful-demo.styl'
import { objects } from '~/db'

/*interface IContentfulDemoProps {
  mapItems: Array<any>
}*/

const ContentfulDemo: IFunctionComponent/*<IContentfulDemoProps>*/ = (/*{
  mapItems
}*/) => {
  const tabs = Object.keys(objects)
  const [tab, setTab] = useState(tabs[0])

  return <BaseLayout>
    <Head>
      // head is set per-page
    </Head>
    <main className={cn['contentful-demo']}>
      <nav><ul>
        {tabs.map(t =>
          <li key={t}><a
            className={tab===t ? cn.active : ''}
            onClick={() => { console.log(t), setTab(t) }}
          >{t}</a></li>
        )}
      </ul></nav>
      {tabs.map(t =>
        <article className={tab!==t ? cn.hide : ''} key={t}>
          {objects[t].all.map((x: any) =>
            <pre
              className={cn.pre}
              key={x.sys.id}
            >
              {JSON.stringify(x, null, '\t')}
            </pre>
          )}
        </article>
      )}
    </main>
  </BaseLayout>
}

/* export async function getServerSideProps() {
  return {
    props: {
      mapItems: await objects.MapItem.all()
    }
  }
} */

export default ContentfulDemo
