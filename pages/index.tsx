import type { FunctionComponent } from 'react'
import type {
  IOnBuildingClickedParams,
  OnBuildingClicked
} from '~/types/components/Map'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { BaseLayout } from '~/layouts'
import cn from '~/styles/pages/index.styl'
import TourBar from '~/components/TourBar/TourBar'
import TourModal from '~/components/TourModal/TourModal'
import { ITourNode } from '~/components/TourBar/TourBar'
import { objects } from '~/db'

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

const Index: FunctionComponent = () => {
  const [selectedTourIndex, setSelectedTourIndex] = useState<number | null>(null)

  let flyToListeners: Array<OnBuildingClicked> = []
  const addFlyToListener = (onBuildingClicked: OnBuildingClicked) => {
    // TODO(odbol): figure out a better way to set state on the map
    flyToListeners = [];
    flyToListeners.push(onBuildingClicked);
  };

  const tour: ITourNode[] = objects.Tour.all.length == 0 ? [] :
    objects.Tour.all[0].fields.tourNodes.map((nodeObj: any) : ITourNode => {
      const node: any = nodeObj.fields
      let buildingIds: (string | number)[] = []
      if (node.buildings) {
        buildingIds = node.buildings.map((link: any) => {
          const found = objects.Building.all.find((building: any) => {
            return building.sys.id === link.sys.id
          })
          if (found) {
            return found.fields.name
          }
          return null
        })
      }
      return {
        label: node.name,
        description: node.description,
        location: new LngLat(node.zoomPoint.lon, node.zoomPoint.lat),
        buildingIds
      }
    })
  useEffect(() => {
    Promise.all([objects.Tour.fetchPromise, objects.TourNode.fetchPromise]).then(() => {
      setSelectedTourIndex(0)
    })
  }, []);

  const selectTour = (tourNode: ITourNode) => {
    const { location, buildingIds } = tourNode;
    const nodeIndex = tour.findIndex(node => node.label == tourNode.label);
    setSelectedTourIndex(nodeIndex >= 0 ? nodeIndex : null) /// can never deselect tour node
    //setSelectedTourIndex((nodeIndex >= 0) && (nodeIndex !== selectedTourIndex) ? nodeIndex : null) /// can deselect tour node by clicking it while active
    flyTo({ location, buildingIds, buildingProperty: null });
  }

  const onBuildingClicked =({
    buildingProperty
  }: IOnBuildingClickedParams): void => {
    if (!!buildingProperty) {
      console.log("building clicked", buildingProperty)

      const clickedBuildingId = buildingProperty['id'];
      if (clickedBuildingId) {
        const clickedTour = tour.find(tourNode => tourNode.buildingIds.includes(clickedBuildingId));
        if (clickedTour) {
          selectTour(clickedTour);
        }
      }
    }
  }

  const flyTo =({
    location,
    buildingIds = []
  }: IOnBuildingClickedParams): void => {
    flyToListeners.forEach(onBuildingClicked => onBuildingClicked({ location, buildingIds }));
  }

  const selectedTourNode : ITourNode | null = (selectedTourIndex !== null) && tour.length > selectedTourIndex ? tour[selectedTourIndex] : null

  return (
  <BaseLayout>
    <Head>
      {/* head is set per-page */}
    </Head>
    <main className={cn.index}>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: '100vh', overflow: "hidden" }}>
        <DynamicMap
          flyToRegistration={addFlyToListener}
          onBuildingClicked={onBuildingClicked}
          selectedTourNode={selectedTourNode}
        />
      </div>

      <TourModal selectedTourNode={ selectedTourNode } />

      <TourBar tour={ tour } handleTourClick={ selectTour } selectedTourNode={ selectedTourNode } />
    </main>
  </BaseLayout>
  )
}

export default Index
