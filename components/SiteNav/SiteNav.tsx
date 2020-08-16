import * as React from "react";
import UITheme from "styled-components";
import { MobileScreenSize } from "../constants";

const SiteNavBar = UITheme.nav`
    position: absolute;
    top: 16px;
    left: 16px;

    @media screen and (max-width: ${MobileScreenSize}) { 
      position: relative;
      top: 0;
      left: 0;
    }


    border-radius: 32px;
    border: 1px solid #000;
    width: auto;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 12px;
    color: #0f1007;
`;

const SiteNavBarTitle = UITheme.h1`
  font-size: 25px;
`;

const SiteNavMenuButton = UITheme.button`
    position: relative;
    height: 40px;
    width: 40px;
    border: 6px solid #fff;
    background-color: #0f1007;
    border-radius: 50%;
`;

const SiteNavItemList = UITheme.ul`
    display: flex;
    flex-direction: row;
    align-items:center;
    z-index: -1;
    margin-left: 16px;
    @media screen and (max-width: ${MobileScreenSize}px) { 
      display: none;
    }
`;

const StyledSiteNavItem = UITheme.li`
    margin-right: 12px;
`;

const SiteMenu = UITheme.aside<{ isOpen: boolean }>`
    position: fixed;
    z-index: -1;
    height: 100%;
    width: 100%;
    max-width: 400px;
    top: 0;
    right: 0;
    transform: translateX(${(props) => (props.isOpen ? "0" : "100vh")});
    transition: transform 0.4s ease;
    padding: 24px;
    background-color: #fff;
    border: 1px solid #000;
    @media screen and (max-width: ${MobileScreenSize}px) { 
      padding-top: 100px;
    }

`;

export const SiteNav = (props: any) => {
  const { children } = props;

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const SiteNavLinks = children?.map((child: React.ReactElement) => {
    const childType =
      typeof child.type === "string" ? child.type : child.type.name;
    return childType === "SiteNavItem" ? child : null;
  });

  const SiteMenuItems = children?.map((child: React.ReactElement) => {
    const childType =
      typeof child.type === "string" ? child.type : child.type.name;
    return childType === "SiteMenuItem" ? child : null;
  });

  return (
    <SiteNavBar>
      {/* Maybe some day we want a list of nav links here */}
      <SiteNavMenuButton onClick={() => setMenuIsOpen(!menuIsOpen)} />
      <SiteNavBarTitle onClick={() => setMenuIsOpen(!menuIsOpen)}>
        World of Jackson
      </SiteNavBarTitle>
      <SiteNavItemList>{SiteNavLinks}</SiteNavItemList>
      <SiteMenu isOpen={menuIsOpen}>
        <ul>{SiteMenuItems}</ul>
      </SiteMenu>
    </SiteNavBar>
  );
};

export const SiteNavItem = (props: any) => {
  const { children } = props;
  return <StyledSiteNavItem>{children}</StyledSiteNavItem>;
};

export const SiteMenuItem = (props: any) => {
  const { children } = props;
  return <li>{children}</li>;
};
