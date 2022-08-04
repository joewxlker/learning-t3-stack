import Image from "next/image"
import { FC, useCallback, useEffect, useState } from "react";

interface StoreImagePropsOne {
    sourceTop: string;
    sourceMid: string;
    sourceBottom: string;
    sourceMain: string;
    title: string;
    description: string; 
    href: string;
    madeWith: Array<string>;
    onNextPrev: (greater: number, target: string, operator: boolean) => void;
}

export const StoreModuleOne: FC<StoreImagePropsOne> = ({onNextPrev, sourceMain, sourceTop, sourceBottom, sourceMid, title, description, href, madeWith }): JSX.Element => {
    
    const [active, setActive] = useState(sourceMain);
    const [hover, setHover] = useState<boolean>()


    const handleClick = useCallback((next :boolean) => {
        next ? onNextPrev(1, 'shopSlider', true) : onNextPrev(0,'shopslider',false)
    },[onNextPrev] )
    
    return (
        <>
            
            <div className='store-item'>
            <span className='slide-selector-container'>
                    <button id='prev' className='slide-selector' onClick={(e) => { handleClick(false) }}></button>
                    </span>

                <div className='main-image-overlay'>
                    <div className='hover-image' onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}/>
                </div>
                {hover && <span className='links-container' onMouseEnter={e => setHover(true)}><h1>VIEW CODE</h1></span>}
                <div className='images-container' >
                    <div id={`blur-${hover}`} className='image-wrapper'>
                        
                        <Image className='image' src={active} width={1200} height={630} />
                        <div className='built-with-wrapper'>
                            <div className="built-with">
                            
                        {madeWith.map((source) => { return (
                            <Image key={source} src={source} width={70} height={70} />
                            )})}
                            </div>
                            </div>
                        </div>
                        
                    <span onMouseLeave={e => setActive(sourceMain)}>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceTop)}>
                            <Image className='image' src={sourceTop} width={300} height={200} />
                        </div>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceMid)}>
                            <Image className='image' src={sourceMid} width={300} height={200} />
                        </div>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceBottom)}>
                        <Image className='image' src={sourceBottom} width={300} height={200} />
                        </div>
                    </span>
                    
                    <span className="slide-selector-container">
                        <button id='next' className='slide-selector' onClick={(e) => { handleClick(true) }}></button>
                    </span>
        </div>
            </div>

            <style jsx>

                {`

                .links-container{
                    box-shadow: 0.5rem 0.5rem 0.8rem 0.2rem rgba(0,0,0,0.5);
                    position: absolute;
                    z-index: 6;
                    left: 30vw;
                    width: 20vw;
                    height: 10vh;
                    top: 40vh;
                    background-color: orange;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .slide-selector-container{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items: center;
                }
                #prev{
                    transform: scaleX(-100%);
                }
                .slide-selector{
                    height: 100%;
                    width: 8rem;
                    background-color: rgba(0,0,0,0);
                    background-image: url('/ui-elements/arrow-one.svg');
                    background-repeat: no-repeat;
                    border: none;
                    opacity: 30%;
                }
                .slide-selector:hover{
                    opacity: 100%;
                    cursor: pointer;
                }

                #blur-true{
                    filter: blur(3px)
                }

                .hover-image{
                    height: 33.5vw;
                    width: 61.6vw;
                }
                .main-image-overlay{
                    position: relative;
                    height: 0px;
                    width: 0px;
                    z-index: 5;
                }
                .image-wrapper{
                    margin: 0.3rem;
                    box-shadow: 0.5rem 0.5rem 0.8rem 0.2rem rgba(0,0,0,0.5);
                }
                .info-container h2{
                    color: white;
                    text-align: center;
                }

                .info-container p{
                    color: white;
                    font-weight: 600;
                    text-align: center;
                    padding: 1rem;
                }
                .show-code h3{
                    color: rgba(20,20,40,1);
                }
                .show-code:hover h3{
                    color: orange;
                }
                button.show-code:hover{
                    background-color: rgba(0,0,0, 0.2);
                    border: 2px solid  rgba(200,160,70, 0.7);
                    color: orange !important;
                }
                        .info-container{
                            color: white;
                            height: 60vh;
                            width: 18%;
                            display:flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        
                        .images-container{
                            width: 100%;
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                        }
                        .built-with {
                            display: flex !important;
                            flex-direction: row;
                            background-color:rgba(30,30,30, 1);
                            width: 100%;
                            padding: 0.3rem;
                            height: 4rem;
                            transform: translateY(-4rem);
                        }

                        .built-with-wrapper{
                            height: 0px;
                        }
                        .images-container span {
                            display: flex;
                            flex-direction: column;
                        }
                        .store-item{
                            width: 100%;
                            display: flex;
                            flex-direction: row;
                            margin-bottom: 4rem;
                        }
                        `}
            </style>
        </>
    )
}

interface StoreImageObjTwo {
    image: string;
    href: string;
}
interface StoreImagePropsTwo {
    data: Array<StoreImageObjTwo>;
}

export const StoreModuleTwo: FC<StoreImagePropsTwo> = ({ data }): JSX.Element => {
    
    const [active, setActive] = useState('');
    const [hover, setHover] = useState<boolean>()

    return (
        <>
            <div className='store-item' id='main'>
                {data.map(({image, href}) => {
                    return (
                        <span key={image}>
                            {hover && active === image &&
                                <div className={`links-wrapper`} onClick={e => window.open(href)}>
                                    <div className={`links-container`} onMouseEnter={e => { setHover(true); setActive(image) }}>
                                        <h2>View Project</h2>
                                    </div>
                                </div>}

                            <div
                                id={active === image ? `blur-${hover}` : ''}
                                className='image-wrapper'
                                onClick={e => window.open(href)}
                                onMouseEnter={e => { setHover(true); setActive(image) }}
                                onMouseLeave={e => setHover(false)}>
                                
                                <Image
                                    src={image}
                                    width={470}
                                    height={300} />
                            </div>
                        </span >
                    );
                })}
            </div>

            <style jsx>

                {`

                #blur-true{
                    position: relative;
                    transform: translateY(-6rem);
                    filter: blur(3px);
                }

                .links-wrapper{
                    width: 0px;
                    cursor:pointer;
                }

                .links-container{
                    cursor:pointer;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 23vw;
                    height: 10vh;
                    top: 100px;
                    left: 30px;
                    background: orange;
                    z-index: 10;
                    box-shadow: 0.7rem 0.5rem 01rem 0.2rem rgba(0,0,0, 0.5);
                }
                .image-wrapper{
                    cursor:pointer;
                    position: relative;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width: fit-content;
                    margin: 1rem;
                    box-shadow: 0.5rem 0.5rem 0.8rem 0.2rem rgba(0,0,0,0.5);
                }
                .store-item{
                    width: 85%;
                    margin-bottom: 7rem;
                    display: flex;
                    flex-direction:row;
                }
                        `}
            </style>
        </>
    )
}

interface StoreImagePropsThree {
    
}

export const StoreModuleThree: FC<StoreImagePropsThree> = (): JSX.Element => {
    
    const [active, setActive] = useState('');
    const [hover, setHover] = useState<boolean>()
    
    return (
        <>
            <div className='store-item'>
              
            </div>

            <style jsx>

                {`
                        `}
            </style>
        </>
    )
}