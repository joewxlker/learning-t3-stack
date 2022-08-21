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
    onNextPrev: (lesser: number, greater: number, target: string, operator: boolean) => void;
}

export const StoreModuleOne: FC<StoreImagePropsOne> = ({ onNextPrev, sourceMain, sourceTop, sourceBottom, sourceMid, href, madeWith }): JSX.Element => {

    const [active, setActive] = useState(sourceMain);
    const [hover, setHover] = useState<boolean>()

    useEffect(() => {
        setActive(sourceMain)
    }, [sourceMain])


    const handleClick = useCallback((next: boolean) => {
        next ? onNextPrev(null, 2, 'shopSlider', true) : onNextPrev(2, 0, 'shopSlider', false)
    }, [onNextPrev])

    return (
        <>

            <div key={sourceMain} className='store-item'>
                <span className='slide-selector-container'>
                    <button id='prev' className='slide-selector' onClick={(e) => { handleClick(false) }}></button>
                </span>

                <div className='main-image-overlay'>
                    <div className='hover-image' onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)} onClick={e => window.open(href)} />
                </div>
                {hover && <span className='links-container' onMouseEnter={e => setHover(true)} onClick={e => window.open(href)}><h1>VIEW CODE</h1></span>}
                <div className='images-container' >
                    <div id={`blur-${hover}`} className='image-wrapper'>
                        <Image className='image' alt='' src={active} width={1200} height={630} />
                        <div className='built-with-wrapper'>
                            <div className="built-with">

                                {madeWith.map((source) => {
                                    return (
                                        <Image alt='' key={source} src={source} width={70} height={70} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <span onMouseLeave={e => setActive(sourceMain)}>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceTop)}>
                            <Image className='image' alt='' src={sourceTop} width={300} height={200} />
                        </div>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceMid)}>
                            <Image className='image' alt='' src={sourceMid} width={300} height={200} />
                        </div>
                        <div className='image-wrapper' onMouseEnter={e => setActive(sourceBottom)}>
                            <Image className='image' alt='' src={sourceBottom} width={300} height={200} />
                        </div>
                    </span>
                </div>
                <span className="slide-selector-container">
                    <button id='next' className='slide-selector' onClick={(e) => { handleClick(true) }}></button>
                </span>
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
                .slide-selector{
                    height: 100%;
                    width: 8rem;
                    background-color: rgba(0,0,0,0);
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    opacity: 30%;
                }
                .slide-selector:hover{
                    opacity: 100%;
                    cursor: pointer;
                    transform: rotate(180deg);
                    animation: rotate180 0.5s;
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
                            animation: fadein 1s;
                        }

                        @keyframes rotate180 {
                            from { transform: rotate(0deg)}
                            to { transform: rotate(180deg)}
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
                {data.map(({ image, href }) => {
                    return (
                        <span key={image}>
                            {hover && active === image &&
                                <button disabled={href === ''} className={`links-wrapper`} onClick={e => window.open(href)}>
                                    <div className={`links-container`} onMouseEnter={e => { setHover(true); setActive(image) }}>
                                        <h2>View Project</h2>
                                    </div>
                                </button>}

                            <button
                                title='This app has not yet been deployed'
                                disabled={href === ''}
                                id={active === image ? `blur-${hover}` : ''}
                                className='image-wrapper'
                                onClick={e => window.open(href)}
                                onMouseEnter={e => { setHover(true); setActive(image) }}
                                onMouseLeave={e => setHover(false)}>

                                <Image
                                    alt=''
                                    src={image}
                                    width={470}
                                    height={300} />
                            </button>
                        </span >
                    );
                })}
            </div>

            <style jsx>

                {`

                #blur-true{
                    position: relative;
                    transform: translateY(-6.5rem);
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
                    width: 20vw;
                    left: 2.3rem;
                    height: 10vh;
                    top: 100px;
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
                    margin: auto;
                    display: flex;
                    flex-direction:row;
                    justify-content: center;
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