import Image from "next/image";
import React, { Dispatch, FC, FunctionComponent, SetStateAction, useCallback, useState} from "react";

export interface NavLinkProps extends HeaderProps {
    title: string;
    innerWidthProp: number;
    setActiveLink: Dispatch<SetStateAction<string>>;
    activeLink: string;
    theme: string;
}

export interface HeaderProps{
    innerWidthProp: number;
    onLinkClick: (text: number) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ onLinkClick, innerWidthProp }): JSX.Element => {

    const [isActive, setActive] = useState<string>('PLAY');

    return (
        <div className='header-container'>
            <NavLinks
                title={'PLAY'}
                innerWidthProp={0}
                onLinkClick={onLinkClick}
                setActiveLink={setActive}
                activeLink={isActive}
                theme={''} />
            <NavLinks
                title={'WEAPONS'}
                innerWidthProp={innerWidthProp}
                onLinkClick={onLinkClick}
                setActiveLink={setActive}
                activeLink={isActive}
                theme={''}/>
            <NavLinks
                title={'STORE'}
                innerWidthProp={(innerWidthProp) * 2}
                onLinkClick={onLinkClick}
                setActiveLink={setActive}
                activeLink={isActive}
                theme={'shop'}/>
                        <NavLinks
                title={'SETTINGS'}
                innerWidthProp={(innerWidthProp) * 3}
                onLinkClick={onLinkClick}
                setActiveLink={setActive}
                activeLink={isActive}
                theme={''}/>
            <style jsx>{`
        .header-container{
            position: fixed;
            height: 5rem;
            width: 100vw;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: flex-end;
            background-image: linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.2)) ;
            z-index: 2;
        }
        `}</style>
        </div>
    );
}
export default Header;

export const NavLinks: FC<NavLinkProps> = ({innerWidthProp, title, onLinkClick, setActiveLink, activeLink, theme}): JSX.Element => {

    const handleClick = useCallback(() => {
        onLinkClick(innerWidthProp);
        setActiveLink(title);
    }, [onLinkClick])
    
    return (
        <>
            {activeLink === title && theme === '' && <span className='link-span' onClick={handleClick}><a className='active' ><h4>{title}</h4></a><div id='expand'><Image src='/ui-elements/spinner-orange.svg' width={20} height={20}/></div></span>}
            {activeLink !== title && theme === '' && <span className='' onClick={handleClick}><a className='' ><h4>{title}</h4></a><div id='expand'><Image src='/ui-elements/spinner-black.svg' width={20} height={20}/></div></span>}
            {activeLink === title && theme !== '' && <span className={`${theme}-active`} onClick={handleClick}><a className='active' ><h4>{title}</h4></a><div id='expand'><Image src='/ui-elements/spinner-blue.svg' width={20} height={20}/></div></span>}
            {activeLink !== title && theme !== '' && <span className={theme} onClick={handleClick}><a className='' ><h4>{title}</h4></a><div id='expand'><Image src='/ui-elements/spinner-blue.svg' width={20} height={20}/></div></span>}
            <style jsx>{`
        span{
            cursor: pointer;
            border-bottom: solid rgba(255,255,255,0.5) 1px;
        }
        span.shop:hover a{
            color: black;
        }
        span.shop:hover {
            background-color: orange;
        }
        span.shop {
            opacity: 80%;
            background-color: orange;
            animation: shopfade 0.5s reverse;
        }
        span.shop-active {
            opacity: 100%;
            background-color: orange;
            box-shadow: inset 0 1rem 2rem 0.1rem rgba(255,255,255,0.2);
            animation: shopfade 0.5s;
        }


        #expand{
            position: relative;
            transform: translateY(-5px);
        }
        span.link-span{
            background-image: linear-gradient( rgba(100,100,100, 0), rgba(200,100,10, 0.3));
            animation: fadein 0.5s ease-in;
        }
        span{
            background-image: linear-gradient(rgba(100,100,100, 0), rgba(10,10,10, 0.3));
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items:center;
            height: 3.5rem;
            width: 20rem;
            background-color: rgba(0,0,0, 0.0)
        }
        .active{
            color: orange;
        }
        a{
            display: block;
            text-decoration-line: none;
            color: rgba(255,255,255,0.5);
            font-size: large;
            padding: 0px 0.3rem;
        }
        span:hover a{
            color: orange;
        }

        @keyframes fadein{
            from {
                opacity: 0%;
            }
            to {
                opacity: 100%;
            }
        }

        @keyframes shopfade {
            from {opacity: 80%;}
            to {opacity: 100%;}
        }

        `}</style>
        </>
    )
}