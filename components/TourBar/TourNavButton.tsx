import React from 'react'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components'; 

/// ARGGG none of these work. https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
// Allow arbitrary props to be bassed to UITheme.
// @ts-ignore
import { CSSProp } from "styled-components"
import {} from 'styled-components/cssprop'
// @ts-ignore
import * as types from 'styled-components/cssprop'

const NavButton = UITheme.button`
    display: block;
    //color: yellow;
    background-color: black;
    border-radius: 50%;
    margin: 16px auto 16px auto;
    //text-align: center;
    //width: 100%;
    width: 28px;
    height: 28px;
    transition: box-shadow 0.2s ease-in-out, color 0.5s ease-in-out;
    &:hover {
        box-shadow: inset 0 0 1.5em 1.5em white;
    }
    background-image: ${props => props.direction > 0 ? 'left' : 'right'};
`

const TourNavButton: FunctionComponent<{direction: Number, onClick: () => void}> =
    ({direction, onClick }) => {
        return (
            <NavButton onClick={onClick} direction={direction}>
                { direction > 0 ? 'Next' : 'Previous' }
            </NavButton>
        )
}

export default TourNavButton

