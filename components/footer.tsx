import Link from "next/link";
import React, { FC } from "react";

const Footer: FC = () => {
    return (
        <div className='main'>
            <Link title='github' href='/' ><a><h3>github</h3></a></Link> 
            <Link title='linkedin' href='/' ><a><h3>linkedin</h3></a></Link> 
            <Link  title='Resume' href='/' ><a><h3>Resume</h3></a></Link> 

            <style jsx>
                {`

                .main{
                    position: fixed;
                    width: 100vw;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    background-color: rgba(40,40,45, 1);
                    z-index: 2;
                    bottom: 0;
                    height: 4rem;
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