import * as React from "react";
import BackTop from "./BackTop";
import Footer from "./Footer";

export default function LayoutWithoutHeader({children}) {
    return (
        <div data-theme={"light"}>
            <main>{children}</main>
            <BackTop/>
            <Footer/>
        </div>);
}
