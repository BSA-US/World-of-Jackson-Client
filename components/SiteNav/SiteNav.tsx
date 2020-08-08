import * as React from "react";
import UITheme from "styled-components";

const SiteNavBar = UITheme.nav`
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #000;
    padding: 12px;
    color: #fff;
`;

const SiteNavMenuButton = UITheme.button`
    position: relative;
    height: 40px;
    width: 40px;
    border-top: 8px solid #c00;
    border-bottom: 8px solid #095809;
        &:after {
        content: '';
        position: absolute;
        border-top: 8px solid #e7cf46;
        width: 100%;
        top: calc(50% - 4px);
    }
`;

const SiteNavItemList = UITheme.ul`
    display: flex;
    flex-direction: row;
    align-items:center;
    z-index: -1;
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
    background-color: #000;
`;

export const SiteNav = (props: any) => {
  const { children } = props;

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const SiteNavLinks = children?.map((child: React.ReactElement) => {
    console.log(child, child.type);
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
