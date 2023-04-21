import * as React from "react";
import BackTop from "./BackTop";
import Footer from "./Footer";
import Navbar from "@/components/layout/Navbar";

export default function LayoutWithoutFooter({children}) {
    return (
        <div data-theme={"light"}>
            <Navbar/>
            <main>{children}</main>
            <BackTop/>
        </div>);
}
