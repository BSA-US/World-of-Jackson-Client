import React from 'react'
import type { FunctionComponent } from 'react'
import TourButton from './TourButton';
// import styled from 'styled-components';

class LngLat {
  lng: number
  lat: number

  constructor(lng: number, lat: number) {
    this.lng = lng
    this.lat = lat
  }
}



export interface ITourNode {
  label: string,
  description: string,
  location: LngLat
  buildingIds: (string | number)[]
}

const tour: ITourNode[] = [
  {
    label: "start", // -90.2093766, lat: 32.3039644
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

const TourBar: FunctionComponent<{ handleTourClick: (tourNode: ITourNode) => void, selectedTourNode: string | null }> =
  ({ handleTourClick, selectedTourNode }) => {
      return (
          <div>
              {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}
          </div>
      )
  }

export default TourBar
