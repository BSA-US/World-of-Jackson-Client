import React from 'react'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { MobileScreenSize } from '../constants';

const NavButton = UITheme.button`
    display: inline-block;
    background-color: black;
    color: white;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 32px;
    transition: all 0.2s ease-in-out, color 0.5s ease-in-out;
    &:hover {
        background-color: white;
        color: black;
    }
    white-space: nowrap;
    overflow: hidden;
    @media screen and (max-width: ${MobileScreenSize}px) {
        transform: rotate(90deg)
    }
`

/// example of extending a style:
/// const BackNavButton = UITheme(NavButton)``

const TourNavButton: FunctionComponent<{isForward: boolean, onClick: () => void}> =
    ({isForward, onClick }) => {
        if (isForward) {
            return (
                <NavButton aria-label="next">
                    <ArrowRightIcon onClick={onClick} fontSize="inherit" />
                </NavButton>
            )
        } else {
            return (
                <NavButton aria-label="previous">
                    <ArrowLeftIcon onClick={onClick} fontSize="inherit"/>
                </NavButton>
            )
        }
}

export default TourNavButton
