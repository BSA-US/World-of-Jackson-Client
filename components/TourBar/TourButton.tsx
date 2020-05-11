import React from 'react'
import { ITourNode } from './index'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components'; 

const Button = UITheme.button`
display: block;
color: yellow;
background-color: black;
`
const TourButton: FunctionComponent<{ tourNode: ITourNode, handleTourClick: (tourNode: ITourNode) => void
    selectedTourNode: string | null 
}> =
    ({ tourNode, handleTourClick, selectedTourNode }) => {
        console.log(selectedTourNode)
        return (
            <div key={ tourNode.label }>
                <Button
                onClick={() => handleTourClick(tourNode)}
                style={selectedTourNode===tourNode.label ? { color: 'red' } : {}}
                >
                move to {tourNode.label}
                </Button>
            </div>
        )

}

export default TourButton

