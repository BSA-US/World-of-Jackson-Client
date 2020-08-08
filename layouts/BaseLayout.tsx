import { FunctionComponent as IFunctionComponent } from "react";
import Head from "next/head";
import { SiteNav, SiteNavItem, SiteMenuItem } from "../components/SiteNav/";
import "~/styles/_global.styl";
import "~/styles/layouts/base.styl";

const BaseLayout: IFunctionComponent = ({ children }) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://unpkg.com/destyle.css@1.0.11/destyle.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <SiteNav>
      <SiteNavItem>
        <a href="#">Link 1</a>
      </SiteNavItem>
      <SiteNavItem>
        <a href="#">Link 2</a>
      </SiteNavItem>
      <SiteNavItem>
        <a href="#">Link 3</a>
      </SiteNavItem>
      <SiteMenuItem>
        <a href="#">Menu Item 1</a>
      </SiteMenuItem>
      <SiteMenuItem>
        <a href="#">Menu Item 1</a>
      </SiteMenuItem>
      <SiteMenuItem>
        <a href="#">Menu Item 1</a>
      </SiteMenuItem>
    </SiteNav>
    {children}
  </>
);

export default BaseLayout;
