import React from 'react'
import type { FunctionComponent } from 'react'
import TourButton from './TourButton';
import TourNavButton from './TourNavButton';

import UITheme from 'styled-components'; 
import { LngLat } from '~/pages';

const SideBar = UITheme.div`
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
    const selectedNodeIdx = tour.findIndex(node => node === selectedTourNode);
    const onPrevClicked = () => handleTourClick(tour[selectedNodeIdx > 0 ? selectedNodeIdx - 1 : tour.length - 1]);
    const onNextClicked = () => handleTourClick(tour[(selectedNodeIdx + 1) % tour.length]);

      return (
          <SideBar>
            <TourNavButton direction={-1} onClick={onPrevClicked} />
            
            {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}

            <TourNavButton direction={1}  onClick={onNextClicked} />
          </SideBar>
      )
  }

export default TourBar
