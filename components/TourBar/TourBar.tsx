import React from 'react'
import type { FunctionComponent } from 'react'
import TourButton from './TourButton';

import UITheme from 'styled-components'; 
import { LngLat } from '~/pages';

const SideBar = UITheme.div`
    background-color: rgb(200, 200, 200);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    padding: 8px;
`

// TODO(odbol): move this to a db/models directory?
export interface ITourNode {
  label: string,
  description: string,
  location: LngLat
  buildingIds: (string | number)[]
}

const TourBar: FunctionComponent<{ tour: ITourNode[], handleTourClick: (tourNode: ITourNode) => void, selectedTourNode: ITourNode | null }> =
  ({ tour, handleTourClick, selectedTourNode }) => {
      return (
          <SideBar>
            {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}
          </SideBar>
      )
  }

export default TourBar
