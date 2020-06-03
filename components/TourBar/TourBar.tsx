import React from 'react'
import type { FunctionComponent } from 'react'
import TourButton from './TourButton';
import TourNavButton from './TourNavButton';

import UITheme from 'styled-components'; 
import { LngLat } from '~/pages';

// import MenuIcon from '@material-ui/icons/Menu';
// import InfoIcon from '@material-ui/icons/Info';
// import CancelIcon from '@material-ui/icons/Cancel';

const NavBar = UITheme.div`
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    //display: block;
    //margin: auto;
    height: 80px;
    bottom: 0;
    justify-content: space-between;
    //padding: 12px;
    //padding: 12px auto 12px auto;
    //width: 50%;
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
          <NavBar>
            <TourNavButton isForward={false} onClick={onPrevClicked} />
            {/* <MenuIcon />
            <InfoIcon />
            <CancelIcon /> */}
            
            {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}

            <TourNavButton isForward={true}  onClick={onNextClicked} />
          </NavBar>
      )
  }

export default TourBar
