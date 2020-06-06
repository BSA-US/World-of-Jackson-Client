import React from 'react'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { MobileScreenSize } from '../constants';

const NavButton = UITheme.button`

    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 32px;
    transition: all 0.2s ease-in-out, color 0.5s ease-in-out;
    &:hover {
        color: #696969;
    }

    white-space: nowrap;
    overflow: hidden;

    @media screen and (max-width: ${MobileScreenSize}px) {
        transform: rotate(90deg)
    }
`

const BackNavButton = UITheme(NavButton)`

    @media screen and (min-width: ${MobileScreenSize}px) {
        transform: rotate(-180deg)
    }
    @media screen and (max-width: ${MobileScreenSize}px) {
        transform: rotate(-90deg)
    }
`

const TourNavButton: FunctionComponent<{isForward: boolean, onClick: () => void}> =
    ({isForward, onClick }) => {
        if (isForward) {
            return (
                <NavButton>
                    <PlayCircleFilledIcon onClick={onClick} fontSize="inherit"/>
                </NavButton>
            )
        } else {
            return (
                <BackNavButton>
                    <PlayCircleFilledIcon onClick={onClick} fontSize="inherit"/>
                </BackNavButton>
            )
        }
}

export default TourNavButton

