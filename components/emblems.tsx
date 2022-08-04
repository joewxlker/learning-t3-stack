import Image from "next/image";
import React, { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { Bool } from "../hooks/setBooleanValues";

export interface EmblemMenuProps {
    bool: Bool;
    onCloseMenu: (e: any) => void;
    onEmblemChange: (value: string) => void;
}

const EmblemMenu: FC<EmblemMenuProps> = ({ bool, onCloseMenu, onEmblemChange }) => {

    const [emblemType, setEmblemType] = useState<number>(0);
    const [queryEmblem, setQueryEmblem] = useState<string>('')
    const [mousePositionX, setMousePositionX] = useState(0);
    const [mousePositionY, setMousePositionY] = useState(0);
    
    const source = [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
        '/logos/mongo.svg',
        '/images/SendGrid.svg',
        '/logos/stripe.svg',
        '/logos/bootstrap.svg',
        '/images/Solidity-Logo.wine.svg',
        '/logos/css.svg',
        '/logos/html.svg',
        '/logos/adobei.svg',
        '/logos/adobep.svg',
        '/logos/aftere.svg',
        '/logos/eth.svg',
        '/logos/heroku.svg',
        '/logos/typescript.svg',
        '/logos/javascript.svg',
        '/logos/npm.svg',
        '/logos/nextjs.svg',

    ]

    const emblems = [
        { source: source[0], description: 'REACT', type: 0 },
        { source: source[1], description: 'NODEJS', type: 1 },
        { source: source[2], description: 'EXPRESS', type: 1 },
        { source: source[3], description: 'MONGODB', type: 1 },
        { source: source[4], description: 'SENDGRID', type: 2 },
        { source: source[5], description: 'STRIPE', type: 2 },
        { source: source[6], description: 'BOOTSTRAP', type: 0 },
        { source: source[7], description: 'SOLIDITY', type: 2 },
        { source: source[8], description: 'CSS3', type: 0 },
        { source: source[9], description: 'HTML5', type: 0 },
        { source: source[10], description: 'ILLUSTRATOR', type: 2 },
        { source: source[11], description: 'PHOTOSHOP', type: 2 },
        { source: source[12], description: 'AFTEREFFECTS', type: 2 },
        { source: source[13], description: 'ETHEREUM', type: 2 },
        { source: source[14], description: 'HEROKU', type: 1 },
        { source: source[15], description: 'TYPESCRIPT', type: 1 },
        { source: source[16], description: 'JAVASCRIPT', type: 0 },
        { source: source[17], description: 'NPM', type: 2 },
        { source: source[18], description: 'NEXT', type: 0 },
    ]

    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            setMousePositionX(e.clientX);
            setMousePositionY(e.clientY)})
    },[mousePositionY, setMousePositionY,mousePositionX, setMousePositionX,queryEmblem, setQueryEmblem])

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
                    <div className='main'>
                        <header className='emblem-header'>
                            <nav>
                                <span className={`category-${emblemType===0}`} onClick={e => setEmblemType(0)}><h4>Frontend</h4></span>
                                <span className={`category-${emblemType===1}`} onClick={e => setEmblemType(1)}><h4>Backend</h4></span>
                                <span className={`category-${emblemType===2}`} onClick={e => setEmblemType(2)}><h4>Other</h4></span>
                            </nav>
                            <button onClick={closeMenu}>X</button>
                        </header>
                         <div className='frontend-container'>
                        {emblems.map(({source, description, type}) => {
                                return (
                                <>
                                   {emblemType === type && <button className='emblem-button'title='clicking this changes your emblem' onClick={e => { changeEmblem(source); closeMenu(e)}}>
                                        <Image src={source} height={100} width={100} onMouseEnter={e => setQueryEmblem(description)} onMouseLeave={e => setQueryEmblem('')}/>
                                    </button>}
                                    </>
                                )
                        })}
                        {queryEmblem !== '' && <div className='inspect-emblem' style={{left: mousePositionX-200, top: mousePositionY-200}}><h2>{queryEmblem}</h2></div>}
                        </div>
                </div>
                
                    <div className='overlay'></div>
                </>
            }    <style jsx>
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
                    display: flex;
                    flex-direction: row;
                    height: 3rem;
                    width: 100%;
                    justify-content: space-between;
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
                .overlay{
                    top: 0;
                    left: 0;
                    display: flex;
                    position: absolute;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.8);
                    z-index: 6;
                    animation: fade 1s;
                }
                .main{
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    width: 80vw;
                    height: 70vh;
                    top: 15vh;
                    left: 10vw;
                    background-color: rgba(30,32,38,1);
                    z-index: 7;
                }

                @keyframes fade {
                    from {opacity: 0}
                    to {opactity: 0}
                }
                `}
            </style>
        </>
    );
}

export default EmblemMenu;