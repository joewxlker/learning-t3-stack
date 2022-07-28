import React, { FC } from "react";
import { LinkProps, NavLinks } from "./header";

const Footer: FC = () => {
    const handleClick = (props:string) => {
        window.location.href = props
    }
    return (
        <div className='main'>
            <NavLinks title='github' href='/' onLinkClick={handleClick}></NavLinks> 
            <NavLinks title='resume' href='/' onLinkClick={handleClick}></NavLinks> 
            <NavLinks title='linkedin' href='/' onLinkClick={handleClick}></NavLinks> 

            <style jsx>
                {`

                .main{
                    position: fixed;
                    width: 100vw;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    background-color: rgba(100,100,100, .2);
                    z-index: 2;
                    bottom: 0;
                }
                .main:hover{
                    opacity: 80%;
                }
                `}
            </style>
        </div>
    );
}

export default Footer;