import React from "react";
import type { FunctionComponent } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ITourNode } from "../TourBar/TourBar";

import UITheme from "styled-components";
// var sanitizeHtml: any = require('sanitize-html');

const InfoArea = UITheme.div`
    background-color: #0f1007;
    color: #ddd;
    padding: 16px;

    position: fixed;
    font-size: 0.8em;
    line-height: 1em;
    
    width: 400px;
    height: 300px;
    left: 50%;
    top: 80px;
    margin: 0 -200px 0 0;
`;

const EmbeddedImage = UITheme.img`
  width: 100%;
`;

const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> = ({
  selectedTourNode,
}) => {
  const options: any = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (input: any) => {
        const fields: any = input.data.target.fields;
        /// alternative rendering:
        //return <img src={ fields.file.url} height={fields.file.details.image.height} width={fields.file.details.image.width} alt={fields.description} />;
        return <EmbeddedImage src={fields.file.url} alt={fields.description} />;
      },
    },
  };

  console.log(JSON.stringify(selectedTourNode?.description));

  let description = selectedTourNode
    ? documentToReactComponents(selectedTourNode.description, options)
    : null;
  return (
    <InfoArea>
      <h3>{selectedTourNode?.label}</h3>
      <p>{description}</p>
    </InfoArea>
  );
};

export default TourModal;
