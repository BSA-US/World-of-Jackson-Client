import React from "react";
import type { FunctionComponent } from "react";
import TourButton from "./TourButton";
import TourNavButton from "./TourNavButton";
import UITheme from "styled-components";
import { LngLat } from "~/pages";
import { Document } from "@contentful/rich-text-types";
import mediaQueries from "../../media-queries/mediaQueries";

const NavBar = UITheme.div`
    position: absolute;

    ${mediaQueries.notPhone} {
      flex-direction: row;
      left: 8px;
      right: 8px;
      height: 80px;
      bottom: 16px;
    }
    ${mediaQueries.phone} {
      flex-direction: column;
      left: 0px;
      width: 80px;
      top: 8px;
      bottom: 32px;
    }

    display: flex;
    justify-content: space-between;
    // justify-content: center;
    align-items: center;
   

`;

// TODO(odbol): move this to a db/models directory?
export interface ITourNode {
  label: string;
  description: Document;
  location: LngLat;
  buildingIds: (string | number)[];
}

const TourBar: FunctionComponent<{
  tour: ITourNode[];
  handleTourClick: (tourNode: ITourNode) => void;
  selectedTourNode: ITourNode | null;
}> = ({ tour, handleTourClick, selectedTourNode }) => {
  const selectedNodeIdx = tour.findIndex((node) => node === selectedTourNode);
  const onPrevClicked = () =>
    handleTourClick(
      tour[selectedNodeIdx > 0 ? selectedNodeIdx - 1 : tour.length - 1]
    );
  const onNextClicked = () =>
    handleTourClick(tour[(selectedNodeIdx + 1) % tour.length]);

  return (
    <NavBar>
      <TourNavButton isForward={false} onClick={onPrevClicked} />
      {tour.map((node) => (
        <TourButton
          tourNode={node}
          key={node.label}
          handleTourClick={handleTourClick}
          selectedTourNode={selectedTourNode}
        />
      ))}
      <TourNavButton isForward={true} onClick={onNextClicked} />
    </NavBar>
  );
};

export default TourBar;
