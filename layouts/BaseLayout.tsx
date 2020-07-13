import { FunctionComponent as IFunctionComponent } from "react";
import Head from "next/head";
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
    {children}
  </>
);

export default BaseLayout;
