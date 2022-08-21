import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { CodeWarsData } from "../components/code-wars";
import { Form } from "../components/form";
import { GithubAccountData, GithubSubscribe } from "../components/github-id";
import PopupMenu from "../components/popup";
import Slider from "../components/slider";
import { isUndefined } from "../util/isNullUndefiend";
import { buttons, storeOneArr } from "../util/staticSiteData";

interface MobileProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    githubEvents: GithubSubscribe | null;
    codeWarsData: CodeWarsData | null;
    codeWarsChallengeData: CodeWarsData | null;
}

const Mobile: NextPage<MobileProps> = ({ githubAccountData }) => {

    const [innerWidthProp, setInnerWidthProp] = useState<number>();
    const [activeDiv, setActiveDiv] = useState(0);
    const [scrollXPos, setScrollXPos] = useState(0);
    const [brighteness, setBrighteness] = useState(0);
    const MAIN = useRef<HTMLDivElement>(null);

    const updateWidth = () => setInnerWidthProp(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        if (window.innerWidth > 800) { window.location.href = '/main' }
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [innerWidthProp, setInnerWidthProp])

    const handleScroll = () => {
        setScrollXPos(MAIN.current.scrollLeft)
        if (activeDiv === 1) {
            console.log('active = 1')
            if (scrollXPos >= 100) {
                MAIN.current.scrollTo(MAIN.current.clientWidth, 0)
                setActiveDiv(2);
            }
        }
        else if (activeDiv === 2) {
            console.log('active = 2')
            if (MAIN.current.scrollLeft > MAIN.current.clientWidth * 2 + 100) {
                MAIN.current.scrollTo(MAIN.current.clientWidth * 2, 0)
                setActiveDiv(3);
            }
        }
        return MAIN.current.removeEventListener('scroll', handleScroll);
    }

    useEffect(() => {
        console.log("YOU MAY NEED TO USE RESPONSIVE DEVTOOLS TOUCH SIMULATION TO VIEW THIS APPS MOBILE FEATURES")
    }, [])


    useEffect(() => {
        MAIN.current.addEventListener('scroll', handleScroll);
    })

    return (
        <>
            <Head>
                <title></title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div ref={MAIN} className='app-container'>
                <div className='hero'>
                    <div className='main'>
                        <div className='github-id'>
                            <span className='main-span' >
                                <div className='emblem-container'>
                                    <Image alt='' src={`/logos/node.svg`} height={100} width={110} />
                                </div>
                                {/* ^ emblem button */}

                                <span className='id-span' id='id-span-id'>
                                    <h1>[jw]{githubAccountData !== null ? githubAccountData.login : 'Joseph Walker'}</h1>
                                    <Slider length={'80%'} />
                                </span>
                                {/* ^ contains text/slider elements, loading refers to github data fetching - see top of page */}
                            </span>
                            <MainMenu />
                        </div>
                    </div>
                    <div className='store-wrapper'>
                        <Store />
                    </div>
                    <div className='settings-wrapper'>
                        <Settings onSliderChange={(e: number) => setBrighteness(e)} />
                    </div>
                </div>
            </div>
            <div className='cyborg-image-wrapper'><Image alt='background' src='/images/cyborg-mobile.jpeg' width={900} height={2000} objectFit='cover' /></div>
            <div className='overlay'></div>
            <style jsx >
                {`

                .overlay {
                    position: absolute;
                    top: 0;
                    height: 100vh;
                    width: 100vw;
                    z-index: 0;
                    background-color: rgba(255,255,255,0.${brighteness});
                }

                .hero {
                    display: flex;
                    flex-direction: row;
                }

                .app-container {
                    display: absolute;
                    height: 100vh !important;
                    width: 100vw !important;
                    overflow-X: scroll;
                    scroll-behaivour: smooth;
                }

                .id-span{
                    color: white;
                    font-size: 3vh;
                }

                .store-wrapper{
                    width: 100vw;
                    position: relative;
                    top: 0;
                    left: 10vw;
                    z-index: 2;
                }
                .settings-wrapper{
                    position: relative;
                    top: 0;
                    left: 10vw;
                    z-index: 2;
                }

                .cyborg-image-wrapper {
                    height: 100vh;
                    width: 100vw;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 0;
                }

                .github-id{
                    position: relative;
                    z-index: 1;
                    height: 50vh;
                    width: 90vw;
                    left: 5vw;
                    top: 3vh;
                }
                
                .main {
                    position: absolute;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    height: 100vh;
                    left: 0;
                    width: 100vw !important;
                    background-color: white;
                }

                .bg-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    background-size: cover;
                    z-index: 0;
                    overflow: clip;
                    overflow-scrolling:touch;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    -webkit-overflow-scrolling:touch;
                }
                `}
            </style>
            <style jsx global>{`
            html,body{
                background-color: rgba(30,30,30);
                height: 100vh !important;
            }
            `}</style>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const githubEvent = await fetch('https://api.github.com/users/riectivnoodes/events');
    const github = await fetch('https://api.github.com/users/riectivnoodes');
    const githubSubs = await fetch('https://api.github.com/users/riectivnoodes/subscriptions');
    const codeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes');
    const completedCodeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes/code-challenges/completed?page=0')

    let githubAccountData = await github.json();
    let githubSubscribe = await githubSubs.json();
    let githubEvents = await githubEvent.json();
    let codeWarsData = await codeWars.json();
    let codeWarsChallengeData = await completedCodeWars.json();

    if (isUndefined(githubAccountData.message) || isUndefined(githubEvents.message)) { githubAccountData = null; githubSubscribe = null; githubEvents = null }

    return { props: { githubAccountData, githubEvents, githubSubscribe, codeWarsData, codeWarsChallengeData } }

}

export default Mobile

export const MainMenu: FC = () => {

    const [menuBool, setMenuBool] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<boolean>(false)

    return (
        <>
            <div className={`menu-title-container`}>
            </div>
            <div className={`menu-button-container`}>
                {buttons.map((data) => {
                    return (
                        <button key={data.name} id='menu-button' style={{ backgroundColor: `${data.name === 'GITHUB' ? 'orange' : ''}`, }}>
                            {/** 'helper' div here to target image height and animations as next Image doesnt allow image styling directly */}
                            <h2>{data.name}</h2>
                        </button>
                    )
                })}

                <button id='menu-button' className={`menu-button-false feedback`} onClick={e => {
                    setMenuBool(!menuBool)
                }}><h2>Feedback</h2></button>

                {menuBool && <PopupMenu>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <header className='emblem-header'>
                            <nav>
                            </nav>
                            <button className='emblem-button' onClick={e => { setMenuBool(!menuBool); setConfirmation(false) }}>X</button>
                        </header>
                        <h1>Contact Me</h1>
                        {!confirmation && <Form type={['firstname', 'lastname', 'email', 'hidden', 'message']} target={'send-email'} onResponse={e => { console.log(confirmation); setConfirmation(true) }} ></Form>}
                        {confirmation && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                            <h2>Thank you for contacting me, I&rsquo;ll be in touch asap</h2>
                            <button onClick={e => { setMenuBool(!menuBool); setConfirmation(false) }}>Return to app</button>
                        </div>}
                    </div>
                </PopupMenu>}

            </div>
            <style jsx >
                {`


                .feedback {
                    background-color: rgb(30,30,30) !important;
                }

                .emblem-button{
                    width: 10rem;
                    height: 3rem;
                    background-color: rgba(0,0,0,0.5);
                    border: none;
                    margin: 0;
                }

                .emblem-header{
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                    z-index: 10;
                }

                span{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 50%;
                }
                .metadata{
                    background-color: rgba(250,100,100, 0.8);
                    border-radius: 5px;
                    width: 10rem;
                    color: dark !important;
                }

                .metadata h3{
                    color: black;
                }

                .animation-helper {
                    display: flex;
                    position: relative;
                    height: 30vh;
                    top: 0;
                    background-position: center;
                    align-items: flex-end;
                }

                .overlay:hover{
                    color:white;
                }

                .text-overlay{
                    position: absolute !important;
                    z-index: 3 !important;
                    bottom: -10vh !important;
                }

                button{
                    height: 10vh;
                    background-color: rgba(255,255,255,0.3);
                    margin: 0.3rem;
                }
                h3{
                    color: rgba(200,200,200,0.5);
                    margin-top: 0.1rem;
                    margin-bottom: 0.3rem;
                }
                h2{
                    margin: 0rem;
                }


                .menu-button-container{
                    width: 100%;
                    height: 100%;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 0 5rem 3rem rgba(0,0,0,0.6);
                    background-color: rgba(0,0,0,0.5);
                }


                .menu-title-container{
                    height: 5rem;
                    width: 100%;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    
                }

                @keyframes expand {
                    from {height: 5rem;}
                    to {height: 31vh;}
                }

                @keyframes fadein {
                    from {opacity: 0%;}
                    to {opacity: 100%;}
                }

                @keyframes button-hover {
                    from {box-shadow: inset 0rem 0rem 0rem 0rem black}
                    to {box-shadow: inset 0rem 5rem 6rem 0.01rem black}
                }

                `}
            </style>
        </>
    )
}

export const Store: FC = (): JSX.Element => {

    const [active, setActive] = useState('KLEANSE')
    const KLEANSE = useRef<HTMLDivElement>(null);
    const PORTFOLIO = useRef<HTMLDivElement>(null);
    const RETRALINK = useRef<HTMLDivElement>(null);
    const CONTAINER = useRef<HTMLDivElement>(null);

    const scroller = () => {
        const scrollPos = CONTAINER.current.scrollTop;
        if (scrollPos < window.innerHeight + 100 && scrollPos > window.innerHeight) {
            return setActive('KLEANSE')
        }
        if (scrollPos < window.innerHeight * 2 + 100 && scrollPos > window.innerHeight * 2) {
            return setActive('PORTFOLIO')
        }
        if (scrollPos < window.innerHeight * 3 + 100 && scrollPos > window.innerHeight * 3) {
            return setActive('RETRALINK')
        }
        // if (PORTFOLIO.current.offsetTop >= CONTAINER.current.scrollTop && KLEANSE.current.offsetTop <= CONTAINER.current.scrollTop) { console.log(PORTFOLIO.current.offsetTop) }
        // if (RETRALINK.current.offsetTop >= CONTAINER.current.scrollTop) { console.log(RETRALINK.current.offsetTop) }
    }

    useEffect(() => {
        CONTAINER.current.addEventListener('scroll', scroller)
        return CONTAINER.current.removeEventListener('scroll', scroller)
    })

    return (
        <>

            <div className='title'>{active}</div>
            <div ref={CONTAINER} className='store'>
                <div className='store-wrapper'>
                    <div ref={KLEANSE} className='module-one module'>
                        <Image alt='' src={storeOneArr[0].sourceMain} width={450} height={300} />
                        <Image alt='' src={storeOneArr[0].sourceBottom} width={450} height={300} />
                        <Image alt='' src={storeOneArr[0].sourceTop} width={450} height={300} />
                    </div>
                    <div ref={PORTFOLIO} className='module-two module'>
                        <Image alt='' src={storeOneArr[1].sourceMain} width={450} height={300} />
                        <Image alt='' src={storeOneArr[1].sourceBottom} width={450} height={300} />
                        <Image alt='' src={storeOneArr[1].sourceTop} width={450} height={300} />
                    </div>
                    <div ref={RETRALINK} className='module-three module'>
                        <Image alt='' src={storeOneArr[2].sourceMain} width={450} height={300} />
                        <Image alt='' src={storeOneArr[2].sourceBottom} width={450} height={300} />
                        <Image alt='' src={storeOneArr[2].sourceTop} width={450} height={300} />
                    </div>
                </div>
                <div>
                    <button>View App</button>
                </div>

            </div>

            <style jsx>
                {`

                    .title {
                        height: 3rem;
                        width: 100vw;
                        position: relative;
                        background-color: orange;
                        z-index: 20;
                    }

                    .module {
                        position: relative;
                        width: 95%;
                        padding-bottom: 3rem;
                    }

                    .store-wrapper{
                        position: relative;
                        padding-top: 3rem;
                        height: 100vh;
                        top: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .store{
                        padding: 1rem;
                        top: 0rem;
                        height: 100vh;
                        width: 100vw;
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        overflow: scroll;

                    }
                `}
            </style>
        </>
    )
}

interface SettingsProps {
    onSliderChange: (arg0: number) => void;
}

export const Settings: FC<SettingsProps> = ({ onSliderChange }): JSX.Element => {

    const [active, setActive] = useState(0);

    const handleCallback = useCallback((e: number) => {
        onSliderChange(e)
    }, [onSliderChange])

    return (
        <>
            <div className='settings'>
                <div className='settings-container'>
                    <button className='up' onClick={e => { if (active >= 1) { setActive(active - 1) } handleCallback(active) }}>UUP</button>
                    <div className='level' id={`${active <= 0}`} onClick={e => { setActive(0); handleCallback(5) }} />
                    <div className='level' id={`${active <= 1}`} onClick={e => { setActive(1); handleCallback(4) }} />
                    <div className='level' id={`${active <= 2}`} onClick={e => { setActive(2); handleCallback(3) }} />
                    <div className='level' id={`${active <= 3}`} onClick={e => { setActive(3), handleCallback(2) }} />
                    <div className='level' id={`${active <= 4}`} onClick={e => { setActive(4), handleCallback(1) }} />
                    <div className='level' id={`${active <= 5}`} onClick={e => { setActive(5), handleCallback(0) }} />
                    <button className='down' onClick={e => { if (active < 5) { setActive(active + 1) } handleCallback(active) }}>DOWN</button>
                </div>
            </div>
            <style jsx>
                {`

                #true {
                    background-color: rgba(255,255,255,0.3);
                }

                button {
                    height: 3rem;
                    background-color: orange;
                }

                .level{
                    height: 4rem;
                    width: 100%;
                    background-color: rgba(50,50,50,1)
                }                    


                .settings-container{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 70%;
                    width: 70%;
                }
                .settings{
                    top: 9.5vh;
                    height: 90vh;
                    width: 100vw;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes fadeinsettings {
                    from {
                        background-color: rgba(0,0,0,0);
                        box-shadow: 0 0 10rem 10rem rgba(0,0,0,0);
                    }
                    to {  
                        background-color: rgba(0,0,0,0.3);
                        box-shadow: 0 0 10rem 3rem rgba(0,0,0,0.8);
                }`}
            </style>
        </>
    )
}