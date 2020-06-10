import React from "react";
import type { FunctionComponent } from "react";

import { ITourNode } from "../TourBar/TourBar";

import UITheme from "styled-components";
var sanitizeHtml: any = require("sanitize-html");

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;
/* methods are on media and can use them instead of raw queries */
const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
};

const InfoArea = UITheme.div`
${media.desktop} {
  background-color: #0f1007;
  color: #ddd;
  padding: 16px;

  position: fixed;
  font-size: 0.8em;
  line-height: 1em;

  width: 400px;
  height: auto;
  left: 65%;
  top: 80px;
  margin: 0 -200px 0 0;
  }
  ${media.tablet} {
    left: 60%;
    width: 35%;
  }
  ${media.phone} {
    left: 6em;
    font-size: .9em;
    width: 65%;
 }

`;

const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> = ({
  selectedTourNode,
}) => {
  let description = selectedTourNode
    ? sanitizeHtml(selectedTourNode.description)
    : "";

  return (
    <InfoArea dangerouslySetInnerHTML={{ __html: description }}></InfoArea>
  );
};

export default TourModal;
