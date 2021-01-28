import React from "react";
import TourBar from "./TourBar";
import { LngLat } from "~/pages";

export default {
  component: TourBar,
  title: "Map Components",
};

const tour = [
  {
    label: "start",
    description:
      'As of April 12th, a <b>new coalition-based</b> statement <script>alert("dsfsdfd")</script>has been <i>drafted</i> and will be <a href="https://cooperationjackson.org/">deployed</a> through a new website that is aimed at bringing wider forces together for united actions, but our formation is proceeding with caution and the understanding that (to reiterate): organized efforts here will not be successful without quick involvement from various forces.',
    location: new LngLat(-90.2094766, 32.3039644),
    buildingIds: ["way/651495815"],
  },
  {
    label: "middle",
    description:
      "As bad as this crisis is on its own terms, it is made considerably worse by the misleadership from the White House, Congress, and many state and local governments. President Trump not only failed to heed the advice of the state's intelligence services regarding the potential threat of the coronavirus, but he downplayed its severity for months as well, and has refused to mobilize the vast resources at the disposal of the US government to address the crisis",
    location: new LngLat(-90.2091766, 32.3039644),
    buildingIds: ["way/651495823"],
  },
  {
    label: "end",
    description:
      "Disaster capitalism and white supremacy are running amok. The Trump alliance of the neo-fascist right, combined with sectors of finance capital, the fossil fuel industry, and the religious right are exploiting this crisis to accelerate climate change, reshape society, and redefine the geopolitical order.",
    location: new LngLat(-90.2088766, 32.3039644),
    buildingIds: ["way/651495821", "way/651495819", "way/651495826"],
  },
];

export const tourBar = () => (
  <>
    <h2>TourBar</h2>
    <p>
      The TourBar component spans the bottom of the Map and allows users to
      navigate by clicking on next and previous arrows (TourNavButton
      components). Users can also click on the carousel dots (TourNavButton
      components) to navigate to particular items in the tour.{" "}
    </p>
    <div
      style={{
        position: "relative",
        height: "100px",
        maxWidth: "50%",
        margin: " 0 auto",
      }}
    >
      <TourBar
        tour={tour}
        handleTourClick={(tourNode) => {
          window.alert(tourNode.label);
        }}
      />
    </div>
  </>
);
