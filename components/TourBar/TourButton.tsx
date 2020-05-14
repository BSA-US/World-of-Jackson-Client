import React from 'react'
import { ITourNode } from './TourBar'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components'; 

const TourNodeButton = UITheme.button`
    display: block;
    color: yellow;
    background-color: black;
    text-align: center;
    width: 100%;
`
const TourDescription = UITheme.div`
    font-size: 0.7em;
    line-height: 1em;
    color: purple;
    margin: 5px;
    overflow: hidden;
    transition-property: max-height;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
`

const TourButton: FunctionComponent<{ tourNode: ITourNode, handleTourClick: (tourNode: ITourNode) => void
    selectedTourNode: string | null 
}> =
    ({ tourNode, handleTourClick, selectedTourNode }) => {
        const isSelected = selectedTourNode === tourNode.label
        return (
            <div key={ tourNode.label }>
                <TourNodeButton
                    onClick={() => handleTourClick(tourNode)}
                    style={isSelected ? { color: 'red' } : {}}
                >
                    {tourNode.label}
                </TourNodeButton>
                <TourDescription style={isSelected ? { maxHeight: '200px' } : { maxHeight: 0 }}>
                    {tourNode.description}
                </TourDescription>
            </div>
        )
}

export default TourButton

