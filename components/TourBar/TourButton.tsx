import React from "react";
import { ITourNode } from "./TourBar";
import type { FunctionComponent } from "react";
import UITheme from "styled-components";

const TourNodeButton = UITheme.button`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    transition: box-shadow 0.2s ease-in-out, color 0.5s ease-in-out;
    &:after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        left: calc(50% - 4px);
        top: calc(50% - 4px);
        background-color: #000;
    }
    &.selected:after {
        background-color: red;
        width: 8px;
        height: 8px;
    }
    &:hover {
        box-shadow: inset 0 0 1.5em 1.5em white;
    }
`;
/*
const TourDescription = UITheme.div`
    font-size: 0.7em;
    line-height: 1em;
    color: purple;
    margin: 5px;
    overflow: hidden;
    transition-property: max-height;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;
`*/

const TourButton: FunctionComponent<{
  tourNode: ITourNode;
  handleTourClick: (tourNode: ITourNode) => void;
  selectedTourNode: ITourNode | null;
}> = ({ tourNode, handleTourClick, selectedTourNode }) => {
  const isSelected =
    selectedTourNode && selectedTourNode.label === tourNode.label;
  return (
    <TourNodeButton
      key={tourNode.label}
      onClick={() => handleTourClick(tourNode)}
      className={isSelected ? "selected" : ""}
    />
  );
};

export default TourButton;
