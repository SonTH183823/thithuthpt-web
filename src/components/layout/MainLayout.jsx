import React, {useEffect, useState} from "react";
import BackTop from "@/components/layout/BackTop";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({children}) {
    // const user = useSelector((state) => state.auth.profile);
    return (
        <div data-theme={"light"}>
            <Navbar/>
            <main>{children}</main>
            <BackTop/>
        </div>
    );
}
