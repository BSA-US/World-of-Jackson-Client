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
        description:
          "Disaster capitalism and white supremacy are running amok. The Trump alliance of the neo-fascist right, combined with sectors of finance capital, the fossil fuel industry, and the religious right are exploiting this crisis to accelerate climate change, reshape society, and redefine the geopolitical order.",
        location: null,
        buildingIds: ["way/651495821", "way/651495819", "way/651495826"],
      }}
    />
  </>
);
