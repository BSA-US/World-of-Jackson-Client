import React from 'react'
import type { FunctionComponent } from 'react'
import UITheme from 'styled-components';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


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
                <NavButton>
                    <PlayCircleFilledIcon onClick={onClick} fontSize="inherit" style={{ transform: "rotate(-180deg)" }}/>
                </NavButton>
            )
        }
}

export default TourNavButton

