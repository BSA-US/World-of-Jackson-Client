import React from 'react'
import type { FunctionComponent } from 'react'

import { ITourNode } from '../TourBar/TourBar';

import UITheme from 'styled-components'; 
var sanitizeHtml: any = require('sanitize-html');

const InfoArea = UITheme.div`
    background-color: #0f1007;
    color: #ddd;
    padding: 16px;

    position: fixed;
    font-size: 0.8em;
    line-height: 1em;
    
    width: 400px;
    height: 300px;
    left: 50%;
    top: 80px;
    margin: 0 -200px 0 0;
`


const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> =
  ({ selectedTourNode }) => {
      let description = selectedTourNode ? sanitizeHtml(selectedTourNode.description) : "";

      return (
        <InfoArea dangerouslySetInnerHTML={{ __html: description }}>
        </InfoArea>
      )
  }

export default TourModal
