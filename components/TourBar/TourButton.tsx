import React from 'react'
import { ITourNode } from './index'
import type { FunctionComponent } from 'react'

const TourButton: FunctionComponent<{ tourNode: ITourNode, handleTourClick: (tourNode: ITourNode) => void, selectedTourNode: string | null }> =
    ({ tourNode, handleTourClick, selectedTourNode }) => {
        return (
            <div key={ tourNode.label }>
                <button
                onClick={() => handleTourClick(tourNode)}
                style={selectedTourNode===tourNode.label ? { color: 'red' } : {}}
                >
                move to {tourNode.label}
                </button>
            </div>
        )

}

export default TourButton

