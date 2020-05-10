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
import TourBar from '~/components/TourBar'
import { ITourNode } from '~/components/TourBar'

const DynamicMap = dynamic(() => import('~/components/Map'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

/*
TODO:
Skeleton:
basic tour timeline
    click on tour to flyto location/area

    location: {
        building
        building
        building
    }

    click on building to goto tour
    render popup with info on site
      header at top of map
    tour node has modal/text area fixed on screen
      highlight series of builings in tour node

For later:
extract coordinates from building a transition city landscape

*/

const Index: FunctionComponent = () => {
  const [selectedTourNode, setSelectedTourNode] = useState<string | null>(null)
  const [infoText, setInfoText] = useState<string | null>(null)
  const callbacks: Array<MapboxCallback> = []
  const addCallback = (cb: MapboxCallback) => callbacks.push(cb)

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
      callbacks.forEach(cb => cb({ location, buildingIds }))
    }

  const handleTourClick =({ label, location, buildingIds }: ITourNode) => {
    setSelectedTourNode(label)
    flyTo({ location, buildingIds, buildingProperty: null })
  }

  /* interface ideas:
    have a list of locations with coordinates and allow users to input its latitude and longitude in context
  */

  /*
  const TourNode: FunctionComponent<{ tourNode: ITourNode }> = ({ tourNode }) =>
    <div key={ tourNode.label }>
      <button
        onClick={() => handleTourClick(tourNode)}
        style={selectedTourNode===tourNode.label ? { color: 'red' } : {}}
      >
        fly to {tourNode.label}
      </button>
    </div>
    */

  const InfoText: FunctionComponent = () =>
    <div style={{
      position: 'absolute',
      right: '100px',
      bottom: '100px',
      backgroundColor: 'white'
    }}>
      { infoText || '' }
    </div>

  return <BaseLayout>
    <Head>
      // head is set per-page
    </Head>
    <main className={cn.index}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
        <DynamicMap
          callbackRegistration={addCallback}
          callback={flyTo}
        />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <TourBar handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode } />
        {/* {tour.map((node) => <TourNode tourNode={node} key={node.label}/>)} */}
      </div>
      <InfoText />
    </main>
  </BaseLayout>
}

export default Index
