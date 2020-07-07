import React from "react";

const globalStyles = <div />;

export default {
  component: globalStyles,
  title: "Global Styling",
};

export const typography = () => (
  <div>
    <h3>Typography</h3>
    <p>
      This page both demonstrates and describes typographical conventions for
      World of Jackson. It is currently in a rudimentary stage.
    </p>
    <p>
      This is a paragraph. It is using the standard body styling. We also use
      'knockout' white text on black backgrounds. See the TourModal for an
      example of this.
    </p>
    <h1>Headings</h1>
    <h2>Headings</h2>

    <h3>Headings</h3>
    <h4>Headings</h4>
    <h5>Headings</h5>
    <h6>Headings</h6>
    <p>And lists!</p>
    <h4>To Do:</h4>
    <ul>
      <li>Finalize typography styles with designers</li>
      <li>Build shared components as necessary</li>
    </ul>
  </div>
);
