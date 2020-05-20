import React from 'react'
import type { FunctionComponent } from 'react'
import TourButton from './TourButton';

import UITheme from 'styled-components'; 
import { LngLat } from '~/pages';
var sanitizeHtml: any = require('sanitize-html');

const SideBar = UITheme.div`
    background-color: rgb(200, 200, 200);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
`
const InfoArea = UITheme.div`
    background-color: rgb(240, 240, 240);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 0.8em;
    line-height: 1em;
`

export interface ITourNode {
  label: string,
  description: string,
  location: LngLat
  buildingIds: (string | number)[]
}

const TourBar: FunctionComponent<{ tour: ITourNode[], handleTourClick: (tourNode: ITourNode) => void, selectedTourNode: ITourNode | null }> =
  ({ tour, handleTourClick, selectedTourNode }) => {
      const sidebarWidth = '20px'

      let description = selectedTourNode ? sanitizeHtml(selectedTourNode.description) : "";

      return (
          <div>
              <SideBar style={{ width: sidebarWidth }}>
                {tour.map((node) => <TourButton tourNode={node} key={node.label} handleTourClick={ handleTourClick } selectedTourNode={ selectedTourNode }/>)}
              </SideBar>
              <InfoArea style={{ left: sidebarWidth }} dangerouslySetInnerHTML={{ __html: description }}>
              </InfoArea>
          </div>
      )
  }

export default TourBar
