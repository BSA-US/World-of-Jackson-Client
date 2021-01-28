import React from "react";
import type { FunctionComponent } from "react";
import UITheme from "styled-components";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

/// example of extending a style:
/// const BackNavButton = UITheme(NavButton)``

console.log(
  "Warning of 'Expected server HTML to contain a matching <svg> in <button>' below is caused by this next.js bug:",
  "https://github.com/vercel/next.js/issues/5347"
);

const TourNavButton: FunctionComponent<{
  isForward: boolean;
  onClick: () => void;
}> = ({ isForward, onClick }) => {
  const NavButton = UITheme.button`
    display: inline-block;
    background-color: white;
    color: black;
    border-radius: ${(props) =>
      props["aria-label"] == "next" ? "0 50% 50% 0" : "50% 0 0 50%"};
    border-${(props) =>
      props["aria-label"] == "next" ? "left" : "right"}: 1px solid #000;
    width: 40px;
    height: 40px;
    font-size: 40px;
    transition: all 0.2s ease-in-out, color 0.5s ease-in-out;
    &:hover {
        background-color: white;
        color: black;
    }
    white-space: nowrap;
    overflow: hidden;

`;

  return (
    <NavButton aria-label={isForward ? "next" : "previous"}>
      {isForward ? (
        <ArrowRightIcon onClick={onClick} fontSize="inherit" />
      ) : (
        <ArrowLeftIcon onClick={onClick} fontSize="inherit" />
      )}
    </NavButton>
  );
};

export default TourNavButton;
