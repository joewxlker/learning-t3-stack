import { ScriptProps } from "next/script";
import React, { ButtonHTMLAttributes, FC, HtmlHTMLAttributes } from "react";
import Footer from "./footer";
import Header, { LinkProps, NavLinkProps } from "./header";

interface LayoutProps{
    children: JSX.Element;
    onLinkClick: (text: string) => void; 
}

const Layout: FC<LayoutProps> = ({ children, onLinkClick }): JSX.Element => {

    return (
        <>
            <Header onLinkClick={onLinkClick} />
        <div className=''>
            {children}
            </div>
        <Footer/>
        </>
     );
}

export default Layout;