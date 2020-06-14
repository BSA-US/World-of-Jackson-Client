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
// import { ITourNodeFields } from '~/types/db/contentful'

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

/*
const tour: ITourNode[] = [
  {
    label: "start",
    description: 'As of April 12th, a <b>new coalition-based</b> statement <script>alert("dsfsdfd")</script>has been <i>drafted</i> and will be <a href="https://cooperationjackson.org/">deployed</a> through a new website that is aimed at bringing wider forces together for united actions, but our formation is proceeding with caution and the understanding that (to reiterate): organized efforts here will not be successful without quick involvement from various forces.',
    location: new LngLat(-90.2094766, 32.3039644),
    buildingIds: ["building_a"]
  },
  {
    label: "middle",
    description: "As bad as this crisis is on its own terms, it is made considerably worse by the misleadership from the White House, Congress, and many state and local governments. President Trump not only failed to heed the advice of the state's intelligence services regarding the potential threat of the coronavirus, but he downplayed its severity for months as well, and has refused to mobilize the vast resources at the disposal of the US government to address the crisis",
    location: new LngLat(-90.2091766, 32.3039644),
    buildingIds: ["building_b"]
  },
  {
    label: "end",
    description: "Disaster capitalism and white supremacy are running amok. The Trump alliance of the neo-fascist right, combined with sectors of finance capital, the fossil fuel industry, and the religious right are exploiting this crisis to accelerate climate change, reshape society, and redefine the geopolitical order.",
    location: new LngLat(-90.2088766, 32.3039644),
    buildingIds: ["building_b", "building_c"]
  }
]*/

const Index: FunctionComponent = () => {
  const [selectedTourIndex, setSelectedTourIndex] = useState<number | null>(null)
  let flyToListeners: Array<OnBuildingClicked> = []
  const addFlyToListener = (onBuildingClicked: OnBuildingClicked) => {
    // TODO(odbol): figure out a better way to set state on the map
    flyToListeners = [];
    flyToListeners.push(onBuildingClicked);
  };

  // console.log(objects.Tour.all)
  const tour: ITourNode[] = objects.Tour.all.length == 0 ? [] :
    objects.Tour.all[0].fields.tourNodes.map((nodeObj: any) : ITourNode => {
      //const { node } = nodeObj
      const node: any = nodeObj.fields
      console.log("node", node)
      return {
        label: node.name,
        description: node.description,
        location: new LngLat(node.zoomPoint.lon, node.zoomPoint.lat),
        buildingIds: []
      }
    })
  // console.log("tour", tour)
  useEffect(() => {
    Promise.all([objects.Tour.fetchPromise, objects.TourNode.fetchPromise]).then(() => {
      // console.log("sdfsfdf", objects.Tour.all, objects.TourNode.all)
      // setHash(hash + 1);
      setSelectedTourIndex(0)
    })
  }, []);

  const selectTour = (tourNode: ITourNode) => {
    const { location, buildingIds } = tourNode;
    // setSelectedTourNode(tour);
    // tour.
    const nodeIndex = tour.findIndex(node => node.label == tourNode.label);
    setSelectedTourIndex(nodeIndex >= 0 ? nodeIndex : null)
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
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        <DynamicMap
          flyToRegistration={addFlyToListener}
          onBuildingClicked={onBuildingClicked}
          selectedTourNode={selectedTourNode}
        />
      </div>

      { selectedTourNode &&
        <TourModal selectedTourNode={ selectedTourNode } />
      }

      <TourBar tour={ tour } handleTourClick={ selectTour } selectedTourNode={ selectedTourNode } />
    </main>
  </BaseLayout>
  )
}

export default Index
