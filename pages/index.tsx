import type { FunctionComponent } from 'react'
import type {
  IMapboxCallbackParams,
  MapboxCallback
} from '~/types/components/Map'
import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { BaseLayout } from '~/layouts'
import cn from '~/styles/pages/index.styl'
import TourBar from '~/components/TourBar/TourBar'
import { ITourNode } from '~/components/TourBar/TourBar'

const DynamicMap = dynamic(() => import('~/components/Map'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export class LngLat {
  lng: number
  lat: number

  constructor(lng: number, lat: number) {
    this.lng = lng
    this.lat = lat
  }
}

const tour: ITourNode[] = [
  {
    label: "start",
    description: "As of April 12th, a new coalition-based statement has been drafted and will be deployed through a new website that is aimed at bringing wider forces together for united actions, but our formation is proceeding with caution and the understanding that (to reiterate): organized efforts here will not be successful without quick involvement from various forces.",
    location: new LngLat(-90.2094766, 32.3039644),
    buildingIds: ["way/651495815"]
  },
  {
    label: "middle",
    description: "As bad as this crisis is on its own terms, it is made considerably worse by the misleadership from the White House, Congress, and many state and local governments. President Trump not only failed to heed the advice of the state's intelligence services regarding the potential threat of the coronavirus, but he downplayed its severity for months as well, and has refused to mobilize the vast resources at the disposal of the US government to address the crisis",
    location: new LngLat(-90.2091766, 32.3039644),
    buildingIds: ["way/651495823"]
  },
  {
    label: "end",
    description: "Disaster capitalism and white supremacy are running amok. The Trump alliance of the neo-fascist right, combined with sectors of finance capital, the fossil fuel industry, and the religious right are exploiting this crisis to accelerate climate change, reshape society, and redefine the geopolitical order.",
    location: new LngLat(-90.2088766, 32.3039644),
    buildingIds: ["way/651495821", "way/651495819", "way/651495826"]
  }
]

const Index: FunctionComponent = () => {
  const [selectedTourNode, setSelectedTourNode] = useState<ITourNode | null>(tour[0])
  const [infoText, setInfoText] = useState<string | null>(null)
  const callbacks: Array<MapboxCallback> = []
  const addCallback = (callback: MapboxCallback) => callbacks.push(callback)

  const flyTo =({
    location,
    buildingProperty,
    buildingIds = []
  }: IMapboxCallbackParams): void => {
    if (!!buildingProperty) {
      console.log("building clicked", buildingProperty)
      setInfoText(buildingProperty.info ? buildingProperty.info : null)
      return
    }
    setInfoText(null)
    callbacks.forEach(callback => callback({ location, buildingIds }))
  }

  const handleTourClick = (node: ITourNode) => {
    const { location, buildingIds } = node
    setSelectedTourNode(node)
    flyTo({ location, buildingIds, buildingProperty: null })
  }

  const InfoText: FunctionComponent = () =>
    <div style={{
      position: 'absolute',
      right: '100px',
      bottom: '100px',
      backgroundColor: 'white'
    }}>
      { infoText || '' }
    </div>

  var tourBarWidth = "200px";
  return (
  <BaseLayout>
    <Head>
      {/* head is set per-page */}
    </Head>
    <main className={cn.index}>
      <div style={{ position: "absolute", left: 0, top: 0, width: tourBarWidth, height: "100%" }}>
        <TourBar tour={ tour } handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode } />
      </div>
      <div style={{ position: "absolute", left: tourBarWidth, top: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        <DynamicMap
          callbackRegistration={addCallback}
          callback={flyTo}
          selectedTourNode={selectedTourNode}
        />
      </div>
      <InfoText />
    </main>
  </BaseLayout>
  )
}

export default Index
