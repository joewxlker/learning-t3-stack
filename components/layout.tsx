import React, {FC} from "react";
import Header from "./header";

interface LayoutProps {
    children: JSX.Element;
    innerWidthProp: number;
    onLinkClick: (text:number, title: string) => void;
}

const Layout: FC<LayoutProps> = ({ children, onLinkClick, innerWidthProp }): JSX.Element => {

    return (
        <>
            <Header onLinkClick={onLinkClick} innerWidthProp={innerWidthProp} />
            <div className=''>
                {children}
            </div>
        </>
    );
}

export default Layout;