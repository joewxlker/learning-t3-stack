import React, { FC } from "react";
import { NavLinks } from "./header";

const Footer: FC = () => {
    return (
        <div className=''>
            <NavLinks title='github' href='/'></NavLinks> 
        </div>
    );
}

export default Footer;