import Image from "next/image";
import React, { FC, MouseEvent, ReactDOM, useCallback, useEffect, useState } from "react";
import { emblems } from "../util/staticSiteData";

export interface EmblemMenuProps {
    bool: any;
    onCloseMenu: (e: MouseEvent) => void;
    onEmblemChange: (value: string) => void;
}

const EmblemMenu: FC<EmblemMenuProps> = ({ bool, onCloseMenu, onEmblemChange }) => {

    const [emblemType, setEmblemType] = useState<number>(0);
    const [queryEmblem, setQueryEmblem] = useState<string>('')
    const [mousePositionX, setMousePositionX] = useState(0);
    const [mousePositionY, setMousePositionY] = useState(0);

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            setMousePositionX(e.clientX);
            setMousePositionY(e.clientY)
        })
    }, [mousePositionY, setMousePositionY, mousePositionX, setMousePositionX, queryEmblem, setQueryEmblem])

    const closeMenu = useCallback((e: MouseEvent) => {
        onCloseMenu(e);
    }, [])

    const changeEmblem = useCallback((value: string) => {
        onEmblemChange(value);
    }, [])

    return (
        <>
            {bool &&
                <>
                    <header className='emblem-header'>
                        <nav>
                            <span className={`category-${emblemType === 0}`} onClick={e => setEmblemType(0)}><h4>Frontend</h4></span>
                            <span className={`category-${emblemType === 1}`} onClick={e => setEmblemType(1)}><h4>Backend</h4></span>
                            <span className={`category-${emblemType === 2}`} onClick={e => setEmblemType(2)}><h4>Other</h4></span>
                        </nav>
                        <button onClick={closeMenu}>X</button>
                    </header>
                    <div className='frontend-container'>
                        {emblems.map(({ source, description, type }) => {
                            return (
                                <>
                                    {emblemType === type && <button className='emblem-button' title='clicking this changes your emblem' onClick={e => { changeEmblem(source); closeMenu(e) }}>
                                        <Image src={source} alt={description} height={100} width={100} onMouseEnter={e => setQueryEmblem(description)} onMouseLeave={e => setQueryEmblem('')} />
                                    </button>}
                                </>
                            )
                        })}
                        {queryEmblem !== '' && <div className='inspect-emblem' style={{ left: mousePositionX - 200, top: mousePositionY - 200 }}><h2>{queryEmblem}</h2></div>}
                    </div>
                </>
            }   <style jsx>
                {`
                
                .inspect-emblem{
                    color: white;
                    display: flex;
                    align-items: center;
                    width: 10rem;
                    position: absolute;
                    height: 2.5rem;
                    bottom: 0px;
                    background-color: rgba(255,255,255,0.4);
                    z-index: 500;
                }

                .emblem-button{
                    margin: 0.7rem;
                    background-color: rgba(0,0,0,0);
                    border: none;
                }
                nav{
                    display: flex;
                    flex-direction: row;
                    height: inherit;
                    width: 30rem;
                    margin-left: 1rem; 
                    cursor: pointer;
                }
                .emblem-header{
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    height: 3rem;
                    width: 100%;
                    justify-content: space-between;
                    z-index: 10;
                }

                .category-false{
                    width: 8rem;
                    height: 100%;
                    color: black;
                    display: flex;
                    jusitfy-content: center;
                    align-items: center;
                    background-image: linear-gradient(rgba(255, 160, 40, 0.6),rgba(230, 130, 50, 0));
                    margin: 0 0 0 0.5rem;
                    border-top: solid white 0.1rem;
                }

                .category-true{
                    width: 8rem;
                    height: 100%;
                    color: black;
                    display: flex;
                    jusitfy-content: center;
                    align-items: center;
                    background-image: linear-gradient(rgba(0, 10, 0, 0.6),rgba(0, 0, 50, 0));
                    margin: 0 0 0 0.5rem;
                    border-top: solid white 0.1rem;
                }

                .category h4 {
                    width: 100%;
                    border-left: 3px solid rgba(0,0,0,0.5) ;
                    border-top: 3px solid rgba(0,0,0,0.5) ; 
                }

                .emblem-header button {
                    width: 10rem;
                    color: white;
                    background-color: rgba(0,0,0, 0.3);
                    border: none;
                    cursor: pointer;
                }

                @keyframes fade {
                    from {opacity: 0}
                    to {opactity: 0}
                }
                `}
            </style>
        </>
    );
};

export default EmblemMenu;