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
  location: LngLat
  buildingIds: (string | number)[]
}

const tour: ITourNode[] = [
  {
    label: "start", // -90.2093766, lat: 32.3039644
    location: new LngLat(-90.2094766, 32.3039644),
    buildingIds: ["way/651495815"]
  },
  {
    label: "middle",
    location: new LngLat(-90.2091766, 32.3039644),
    buildingIds: ["way/651495823"]
  },
  {
    label: "end",
    location: new LngLat(-90.2088766, 32.3039644),
    buildingIds: ["way/651495821", "way/651495819", "way/651495826"]
  }
]

// const handleTourClick =({ label, location, buildingIds }: ITourNode) => {
//     setSelectedTourNode(label)
//     flyTo({ location, buildingIds, buildingProperty: null })
//   }



const TourBar: FunctionComponent<{ handleTourClick: (tourNode: ITourNode) => void, selectedTourNode: string | null }> =
    ({ handleTourClick, selectedTourNode }) => {

// const index = () => {
        return (
            <div>
                {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}
                {/* <TourButton/>
                <TourButton/>
                <TourButton/>
                <TourButton/>
                <TourButton/> */}
            </div>
        )
    }

export default TourBar
