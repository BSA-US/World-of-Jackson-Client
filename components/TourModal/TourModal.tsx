import React from "react";
import type { FunctionComponent } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ITourNode } from "../TourBar/TourBar";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

import UITheme from "styled-components";
import mediaQueries from "../../media-queries/mediaQueries";
const media = mediaQueries;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const modalBottomClearance: number = 200
const modalWidthRadius: string = '15%'
const modalWidthRadiusMobile: string = '75px'
const modalSidePadding: string = '10%'
const modalSidePaddingMobile: string = '16px'
const modalBorderRadius: number = 32
const imageMaxHeight: string = "300px"
const InfoArea = UITheme.div`
    background-color: #0f1007;
    color: #ddd;
    padding: ${modalBorderRadius}px ${modalSidePadding};

    ${media.desktop} {
      // put desktop specific stuff in here
    }
    ${media.tablet} {
    }
    ${media.smallPhone} {
    }

    position: absolute;
    font-size: 0.8em;
    line-height: 1em;
    //overflow: overlay;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    height: 100%;
    left: ${modalWidthRadius};
    right: ${modalWidthRadius};
    ${media.phone} {
      left: ${modalWidthRadiusMobile};
      right: 0;
      padding-left: ${modalSidePaddingMobile};
      padding-right: ${modalSidePaddingMobile};
    }

    bottom: ${modalBottomClearance}px;
    padding-top: ${modalBottomClearance + modalBorderRadius}px;
    border-radius: ${modalBorderRadius}px;

    transition: bottom 0.5s ease-in-out;

    p {
      text-align: justify;
    }
`

const EmbeddedImage = UITheme.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const PullControl = UITheme.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  border-bottom-right-radius: ${modalBorderRadius}px;
  border-bottom-left-radius: ${modalBorderRadius}px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgb(0,120,0);
  }
`

const Header1 = UITheme.h1`
  text-align: center;
  font-size: 64px;
  line-height: 64px;
`

const Header2 = UITheme.h2`
  text-align: center;
  font-size: 36px;
  line-height: 36px;
  margin-bottom: 3%;
`

const ModalText = UITheme.div`
  overflow: auto;
`

const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> =
  ({ selectedTourNode }) => {

    const [infoModalActive, setInfoModalActive] = useState<boolean>(true)

    const mediaData: any = { headers: [], images: [] }
    const options: any = {
      renderNode: {
        [BLOCKS.HEADING_1]: (input: any) => {
          mediaData.headers.push(<Header1 key={ mediaData.headers.length }>{input.content[0].value}</Header1>)
          return null
        },
        [BLOCKS.HEADING_2]: (input: any) => {
          mediaData.headers.push(<Header2 key={ mediaData.headers.length }>{input.content[0].value}</Header2>)
          return null
        },
        [BLOCKS.EMBEDDED_ASSET]: (input: any) => {
          const fields: any = input.data.target.fields
          /// alternative rendering:
          //return <img src={ fields.file.url} height={fields.file.details.image.height} width={fields.file.details.image.width} alt={fields.description} />;
          mediaData.images.push(<EmbeddedImage key={ fields.file.url } src={ fields.file.url } alt={ fields.description } />)
          return null
        }
      },
    };
    let description = selectedTourNode ? documentToReactComponents(selectedTourNode.description, options) : null;
    const style = selectedTourNode && infoModalActive ? {} : { bottom:  `calc(100% - ${modalBorderRadius}px)` }

    const handlers = useSwipeable({
      onSwipedUp: () => {
        setInfoModalActive(false)
      }
      ,onSwipedDown: () => {
        setInfoModalActive(true)
      }
    })
    return (
      <InfoArea {...handlers} style={style}>
        <div>
          { mediaData.headers }
        </div>
        <div style={{ maxHeight: imageMaxHeight }}>
          { mediaData.images }
        </div>
        <ModalText>
          { description }
        </ModalText>
        <PullControl onClick={ ()=> setInfoModalActive(!infoModalActive) }>
          { infoModalActive ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
        </PullControl>
      </InfoArea>
    )
  }

export default TourModal
