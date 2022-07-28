import React, { FC } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
    children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({children}):JSX.Element  => {
    return (
        <>
        <Header/>
        <div className=''>
            {children}
            </div>
        <Footer/>
        </>
     );
}

export default Layout;