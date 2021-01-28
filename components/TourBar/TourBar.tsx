import React from "react";
import type { FunctionComponent } from "react";
import TourButton from "./TourButton";
import TourNavButton from "./TourNavButton";
import UITheme from "styled-components";
import { LngLat } from "~/pages";
import { Document } from "@contentful/rich-text-types";

const NavBar = UITheme.nav`

  flex-direction: row;
  margin: 0 auto;
  bottom: 16px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 32px;
  border: 1px solid #000;
  background: #fff;
  z-index: 10;
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
