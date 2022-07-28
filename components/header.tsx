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
            <Image src={''} height={0} width={0} alt='' />
            <NavLinks title={'Home'} href={'/'} />
            <NavLinks title={'About'} href={'/about/about'} />
            <NavLinks title={'Blog'} href={'/blog/blog'} />
            
        </div>
    );
}
export default Header;

export const NavLinks: FC<NavLinkProps> = (props): JSX.Element => {
    return (
        <Link href={props.href}><a><h4>{props.title}</h4></a></Link>
    )
}