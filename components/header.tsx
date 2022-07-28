import Image from "next/image";
import Link from "next/link";
import React, { FC, FunctionComponent} from "react";

interface NavLinkProps {
    title: string;
    href: string;
}

const Header: FunctionComponent = ({ }): JSX.Element => {
    return (
        <div className='header-container'>
            <NavLinks title={'SOLDIER'} href={'/main'} />
            <NavLinks title={'WEAPONS'} href={'/projects'} />
            <NavLinks title={'LOOT'} href={'/blog/blog'} />
            <style jsx>{`
        .header-container{
            position: fixed;
            width: 100vw;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            background-color: rgba(100,100,100, .2);
            z-index: 2;
        }
        `}</style>
        </div>
    );
}
export default Header;

export const NavLinks: FC<NavLinkProps> = (props): JSX.Element => {
    return (
        <>
            <Link href={props.href}><a><h4>{props.title}</h4></a></Link>
            <style jsx>{`
        a{
            display: block;
            text-decoration-line: none;
            color: white;
            font-size: large;
            padding: 0px 0.3rem;
        }
        a:hover{
            color: orange;
        }
        `}</style>
        </>
    )
}