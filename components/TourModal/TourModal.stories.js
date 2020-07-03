import React from "react";
import TourModal from "./TourModal";

export default {
  component: TourModal,
  title: "Map Components",
};

export const tourModal = () => (
  <>
    <h3>TourModal</h3>
    <p style={{ width: "40%" }}>
      The TourModal component contains information about a stop on the tour.
    </p>
    <TourModal
      selectedTourNode={{
        label: "end",
        description: {
          nodeType: "document",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value: "this is a tour ",
                  marks: [],
                  data: {},
                },
                {
                  nodeType: "text",
                  value: "node",
                  marks: [{ type: "underline" }],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                { nodeType: "text", value: "first ", marks: [], data: {} },
                {
                  nodeType: "text",
                  value: "stop",
                  marks: [{ type: "bold" }],
                  data: {},
                },
                {
                  nodeType: "text",
                  value: " in the tour",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "blockquote",
              content: [
                {
                  nodeType: "paragraph",
                  content: [
                    {
                      nodeType: "text",
                      value: "this is a quote",
                      marks: [],
                      data: {},
                    },
                  ],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                { nodeType: "text", value: "", marks: [], data: {} },
                {
                  nodeType: "hyperlink",
                  content: [
                    {
                      nodeType: "text",
                      value: "Cooperation Jackson",
                      marks: [],
                      data: {},
                    },
                  ],
                  data: { uri: "https://cooperationjackson.org/" },
                },
                { nodeType: "text", value: "", marks: [], data: {} },
              ],
              data: {},
            },
            {
              nodeType: "embedded-asset-block",
              content: [],
              data: {
                target: {
                  sys: {
                    space: {
                      sys: {
                        type: "Link",
                        linkType: "Space",
                        id: "7zzvnrgo4q2e",
                      },
                    },
                    id: "36r9vTMJCjkQ1OnaW1MgQm",
                    type: "Asset",
                    createdAt: "2020-06-16T21:43:48.693Z",
                    updatedAt: "2020-06-16T21:43:48.693Z",
                    environment: {
                      sys: { id: "dev", type: "Link", linkType: "Environment" },
                    },
                    revision: 1,
                    locale: "en-US",
                  },
                  fields: {
                    title: "Test Image",
                    file: {
                      url:
                        "//images.ctfassets.net/7zzvnrgo4q2e/36r9vTMJCjkQ1OnaW1MgQm/2fe20a921a6377f8574351535f86b086/Ex__cution_de_Marie_Antoinette_le_16_octobre_1793.jpg",
                      details: {
                        size: 378848,
                        image: { width: 1200, height: 512 },
                      },
                      fileName:
                        "Exécution_de_Marie_Antoinette_le_16_octobre_1793.jpg",
                      contentType: "image/jpeg",
                    },
                  },
                },
              },
            },
            {
              nodeType: "paragraph",
              content: [{ nodeType: "text", value: "", marks: [], data: {} }],
              data: {},
            },
          ],
        },
        buildingIds: ["way/651495821", "way/651495819", "way/651495826"],
      }}
    />
  </>
);
