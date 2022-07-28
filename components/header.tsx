import Image from "next/image";
import Link from "next/link";
import { ScriptProps } from "next/script";
import React, { FC, FunctionComponent, useCallback} from "react";

export interface NavLinkProps extends LinkProps {
    title: string;
    href: string;
}

export interface LinkProps{
    onLinkClick: (text: string) => void;
}

const Header: FunctionComponent<LinkProps> = ({ onLinkClick }): JSX.Element => {
    return (
        <div className='header-container'>
            <NavLinks title={'SOLDIER'} href={'/main'} onLinkClick={onLinkClick}  />
            <NavLinks title={'WEAPONS'} href={'/projects'} onLinkClick={onLinkClick} />
            <NavLinks title={'LOOT'} href={'/blog/blog'} onLinkClick={onLinkClick} />
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

    const handleClick = useCallback(() => {
        props.onLinkClick(props.href);
    },[props.onLinkClick])
    return (
        <>
            <a onClick={handleClick}><h4>{props.title}</h4></a>
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