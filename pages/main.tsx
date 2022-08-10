import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import CodeWars, { CodeWarsData } from '../components/code-wars';
import EmblemMenu from '../components/emblems';
import { Form } from '../components/form';
import { GithubAccountData, GithubSubscribe, IdCard } from '../components/github-id';
import Layout from '../components/layout'
import PopupMenu from '../components/popup';
import { StoreModuleOne, StoreModuleTwo } from '../components/store-modules';
import { useHandleSetBool } from '../hooks/setBooleanValues';
import { useIncrementData } from '../hooks/setCounter';
import { sendgrid } from '../server/api\'s/all';

export interface MainProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    codeWarsData: CodeWarsData | null;
}

export const isNull = (value: any | null) => { if (value === null) { return false } return true }
export const isUndefined = (value: any | null) => { if (value === undefined) { return false } return true }

export const getServerSideProps: GetServerSideProps = async () => {

    const github = await fetch('https://api.github.com/users/riectivnoodes');
    const githubSubs = await fetch('https://api.github.com/users/riectivnoodes/subscriptions');
    let githubAccountData: GithubAccountData = await github.json();
    let githubSubscribe: GithubSubscribe = await githubSubs.json();
    if (isUndefined(githubAccountData.message)) { githubAccountData = null; githubSubscribe = null; }
    const codeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes');
    let codeWarsData: CodeWarsData | null = await codeWars.json();
    return { props: { githubAccountData, githubSubscribe, codeWarsData } }
}

const Main: NextPage<MainProps> = ({ githubAccountData, githubSubscribe, codeWarsData }) => {

    const [innerWidthProp, setInnerWidthProp] = useState<number>();
    const [posBrighteness, setPosBrightness] = useState<number>(0);
    const [negBrighteness, setNegBrightness] = useState<number>(0);
    const [windowPosition, setWindowPosition] = useState<string>();
    const [bgAnimation, setBgAnimation] = useState<boolean>(false);
    const [bgPosition, setBgPosition] = useState<number>();
    const [bool, setBool] = useHandleSetBool();
    const [activeEmblem, setActiveEmblem] = useState<string>('/logos/react.svg');
    const background = useRef<HTMLDivElement>();

    const updateWidth = () => setInnerWidthProp(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        if (window.innerWidth < 800) { window.location.href = '/mobile' }
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [innerWidthProp, setInnerWidthProp])
    //This useEffect updates the inner width value
    //the inner width value is passed to the child components

    const handleLinkClick = (props: number, title: string) => {
        window.scrollTo(props, 0);
        if (props > bgPosition) setBgAnimation(true)
        else setBgAnimation(false);
        setBgPosition(props)
        setWindowPosition(title);

        //this is the call back function used in the child component
        //this scrolls the page to the value defined in the child component
    }

    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Layout onLinkClick={handleLinkClick} innerWidthProp={innerWidthProp}>
                <>
                    {bool['openEmblemMenu'] && <PopupMenu><EmblemMenu onEmblemChange={value => { setActiveEmblem(value) }} bool={bool['openEmblemMenu']} onCloseMenu={e => setBool('openEmblemMenu')} /></PopupMenu>}

                    <div className='user-data-container'>
                        {/** Components go here */}
                        <IdCard
                            githubAccountData={githubAccountData}
                            githubSubscribe={githubSubscribe}
                            onOpenEmblemMenu={(e) => { return setBool(e) }}
                            activeEmblem={activeEmblem} />
                        <CodeWars data={codeWarsData} />
                    </div>
                    <div className='main-menu-container'>
                        <MainMenu />
                    </div>

                    <div className='overlay' style={{ backgroundColor: `rgba(0,0,0, 0.${negBrighteness})` }}>
                        <div className='overlay' style={{ backgroundColor: `rgba(255,255,255, 0.${posBrighteness})` }}></div>
                        <Weapons />
                        <Store />
                        <Settings />
                    </div>
                </>
            </Layout>
            <div id={windowPosition} className={`video-container  ${bgAnimation} ${windowPosition}`} ref={background}></div>
            <style jsx>
                {`


                .user-data-container{
                    box-shadow: 0 0 4rem 3rem rgba(0,0,0,0.7);
                    background-color: rgba(0,0,0,0.65);
                }

                #PLAY{
                    animation: translatePlayLeft 0.5s ease-in-out;
                }
                @keyframes translatePlayLeft { 
                    from{transform: translateX(-100px);} 
                    to{transform: translateX(0px);}
                }
                .WEAPONS{transform: translateX(-100px);}
                div#WEAPONS.true {animation: translateWeapons 0.5s ease-in-out;}
                div#WEAPONS.false  { animation: translateWeaponsRight 0.5s ease-in-out ;}
                @keyframes translateWeapons{ 
                    from{transform: translateX(-0px);} 
                    to{transform: translateX(-100px);}
                }
                @keyframes translateWeaponsRight{
                    from{transform: translateX(-200px);} 
                    to{transform: translateX(-100px);}
                }

                .STORE{transform: translateX(-200px);}
                div#STORE.true{animation: translateStore 0.5s ease-in-out;}
                div#STORE.false{animation: translateStoreRight 0.5s ease-in-out;}
                @keyframes translateStore{ 
                    from{transform: translateX(-100px);} 
                    to{transform: translateX(-200px);}
                }
                @keyframes translateStoreRight{ 
                    from{transform: translateX(-300px);} 
                    to{transform: translateX(-200px);}
                }

                .SETTINGS{transform: translateX(-300px);}
                #SETTINGS{ animation: translateSettings 0.5s;}
                @keyframes translateSettings{ 
                    from{transform: translateX(-200px);} 
                    to{transform: translateX(-300px);}
                }

                .video-container{
                    position: fixed;
                    display: flex;
                    justify-content: flex-end;
                    z-index: -2;
                    height: 100vh;
                    width: 120vw;
                    background-size: 120vw 100vh ;
                    background-image: url('/images/cyborg.jpeg');
                    overflow: scroll;
                }
                .overlay{
                    display: absolute;
                    position: absolute;
                    height: 100vh;
                    width: 400vw;
                    z-index: -1;
                }
                #hide-alert{
                    animation: hidealert 0s 2s;
                }
                .main-menu-container{
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    left: 2vw;
                    top: 7vh;
                }
                .alert-rate-limit{
                    display: flex;
                    position: absolute;
                    left: 48vw;
                    top: 50vh;
                    height: 100px;
                    width: 500px;
                    background: rgba(100,100,100, 0.5);
                    color: white;
                }
                @keyframes hidealert{
                    to {
                        visibility: hidden;
                    }
                }
                @keyframes slowrender{
                    from {
                        opacity: 0%;
                    }
                    to {
                        opacity: 100%;
                    }
                }
                @keyframes slidebgleft {
                    from {
                        transform: translateX(-200px)
                    }
                    to {
                        transform: translateX(0px)
                    }
                }
                `}
            </style>
            <style jsx global>{`
            
            button {
                cursor: pointer;
            }
            
        html,
        body {
            overflow: hidden;
            scroll-behavior: smooth;
            background-color: rgba(16,16,20);
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }

        p{
            padding: 0%;
            margin: 0.2rem;
            color: rgba(80,80,80,1);
            font-weight: 600;
            font-size: 22px;
        }

        h1{
            color: rgba(255,255,255,0.8);
            margin: 0;
        }

        h3{
            color: white;
            margin: 0.2rem;
        }
        h4{
            color: white;
            margin: 0.2rem;
        }
        @keyframes fade {
            from {opactiy: 0%}
            to {opacity: 100%}
        }

      `}</style>
        </>
    )

}
export default Main;

export const MainMenu: FC = () => {

    const [active, setActive] = useState<string>();
    const [animateHeight, setHeight] = useState<number>(100);
    const [menuBool, setMenuBool] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<boolean>(false)

    useEffect(() => {
        setActive(buttons[0].name)
    }, [])

    useEffect(() => {
        if (animateHeight >= 300) return;
        const interval = setInterval(() => {
            setHeight(animateHeight + 17);
        }, 1)
        return () => clearInterval(interval)
    }, [animateHeight, setHeight])

    const buttons = [{
        subName: '',
        name: 'GITHUB',
        href: 'https://github.com/riectivnoodes',
        source: '/images/github-dashboard.png',
        metadata: '',
        icon: '/logos/github.svg'
    }, {
        subName: '',
        name: 'LINKEDIN',
        href: 'https://www.linkedin.com/in/joe-walker-89312a22a/',
        source: '/images/linkedin-dashboard.png',
        metadata: '',
        icon: '/logos/linkedin.svg'
    }, {
        subName: '',
        name: 'RESUME',
        source: '/images/resume-dashboard.png',
        href: '',
        metadata: '',
        icon: '/logos/download.svg'
    }]
    return (
        <>
            <div className={`menu-title-container`}>
            </div>
            <div className={`menu-button-container`}>
                {buttons.map((data) => {
                    return (
                        <button key={data.name} id='menu-button' className={`menu-button-${active === data.name}`} onClick={e => {
                            if (active === data.name) return;
                            setActive(data.name); setHeight(0)
                        }}>
                            {data.name !== active && <span><Image src={data.icon} width={50} height={50} /><h2>{data.name}</h2></span>}
                            {/** If the left side is true, the element on the right side renders */}
                            {data.name === active && <div className='text-overlay'>{data.name}</div>}
                            {data.name === active && <div className='metadata'>
                                <h3>{data.metadata}</h3>
                            </div>}
                            <div className='overlay-wrapper'>
                                {/** wrapper div here to set height 0px*/}
                                {data.name === active && <div className='overlay' onClick={e => window.open(data.href)}>
                                    {/** nested overlay div positioned relativeley, 
                                     * the wrapper allows this to have any size while 
                                     * still positioned relatively and wihtout 
                                     * effecting the flow of the page */}
                                    <span><Image src={data.icon} width={50} height={50} /><h2>{data.name}</h2></span>
                                </div>}
                            </div>
                            <div className='animation-helper'>
                                {/** 'helper' div here to target image height and animations as next Image doesnt allow image styling directly */}
                                {data.name === active && data.name === buttons[0].name && <Image src={data.source} width={800} height={animateHeight} />}
                                {/** Using state variables, useEffect and setInterval here to increment the 'animateHeight' variable from 0 - 300. 
                                 */}
                                {data.name === active && data.name === buttons[1].name && <Image src={data.source} width={800} height={animateHeight} />}
                                {data.name === active && data.name === buttons[2].name && <Image src={data.source} width={800} height={animateHeight} />}
                            </div>
                        </button>
                    )
                })}
                <button id='menu-button' className={`menu-button-false`} onClick={e => {
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
                        {!confirmation && <Form type={['firstname', 'lastname', 'email', 'hidden', 'message']} target={'sendgrid.send-email'} onResponse={e => { console.log(confirmation); setConfirmation(true) }} ></Form>}
                        {confirmation && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                            <h2>Thank you for contacting me, I'll be in touch asap</h2>
                            <button onClick={e => { setMenuBool(!menuBool); setConfirmation(false) }}>Return to app</button>
                        </div>}

                    </div>
                </PopupMenu>}
            </div>
            <style jsx >
                {`

                .emblem-button{
                    background-color: rgba(0,0,0,0.4);
                    height: 100%;
                    width: 10rem;
                    margin: 0;
                    border: none;
                    color:white;
                    fonxt-size: 30px;
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

                span{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
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
                    height: 30vh;
                    top: 0;
                    object-fit: cover;
                                }

                .overlay-wrapper{
                    top: 11rem;
                    position: relative;
                    height: 0px;
                }
                .overlay{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    animation: button-hover 1s;
                    position: relative;
                    background-image:linear-gradient(to right, rgba(0,0,0,0), black);
                    box-shadow: inset 0rem 5rem 6rem 0.01rem black;
                    color: rgb(50,50,50);
                    z-index: 5;
                    height: 5.5rem;
                    width: 100%;
                    border-bottom: solid 10px orange;
                    cursor: pointer;
                    animation: fadein 1s;
                }

                .text-overlay{
                    position: absolute !important;
                    z-index: 3 !important;
                    bottom: -10vh !important;
                }

                button{
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
                .menu-button-true{
                    width: 100%;
                    background-color: rgba(200,200,200, 0.1);
                    border: 2px solid  rgba(200,200,200, 0.3);
                    color: white;
                    animation: expand 0.5s;
                    cursor:pointer;
                    
                }

                .menu-button-false{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 5rem;
                    background-color: rgba(200,200,200, 0.1);
                    border: 2px solid  rgba(200,200,200, 0.3);
                    color: white;
                    background-size: 900px 80px;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                #menu-button:hover{
                    background-color: rgba(200,200,200, 0.3);
                    border: 2px solid  rgba(200,160,70, 0.7);
                    box-shadow: 0rem 0rem 1rem 0.01rem rgba(200,160,70, 0.7);
                    cursor: pointer;
                }

                #menu-button:hover .overlay-wrapper .overlay{
                    color: white;
                }

                .menu-button-container{
                    width: 27vw;
                    color: white;
                    height: 70vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 0 5rem 3rem rgba(0,0,0,0.5);
                    background-color: rgba(0,0,0,0.4);
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

export const Weapons: FC = ({ }): JSX.Element => {
    return (
        <>
            <div className='weapons'>
            </div>
            <style jsx>
                {`
                .weapons{
                    top: 10vh;
                    height: 90vh;
                    width: 100vw;
                    position: relative;
                    transform: translateX(100vw);
                }`}
            </style>
        </>
    )
}

interface StoreOneObj {
    sourceMain: string;
    sourceBottom: string;
    sourceMid: string;
    sourceTop: string;
    title: string;
    description: string;
    href: string;
    madeWith: Array<string>;
}

export const Store: FC = (): JSX.Element => {

    const storeOneArr: Array<StoreOneObj> = [{
        sourceMain: '/images/beautyshop-main.png',
        sourceBottom: '/images/beautyshop-one.png',
        sourceMid: '/images/beautyshop-two.png',
        sourceTop: '/images/beautyshop-three.png',
        title: '',
        description: ``,
        href: '',
        madeWith: [
            '/logos/react.svg',
            '/logos/node.svg',
            '/images/expressjs-icon.svg',
            '/logos/mongo.svg',
            '/images/SendGrid.svg',
            '/logos/stripe.svg'
        ]
    }, {
        sourceMain: '/mp4/retralink.gif',
        sourceBottom: '/mp4/retralink.gif',
        sourceMid: '/mp4/retralink.gif',
        sourceTop: '/mp4/retralink.gif',
        title: '',
        description: ``,
        href: '',
        madeWith: [
            '/logos/react.svg',
            '/logos/node.svg',
            '/images/expressjs-icon.svg',
            '/images/Solidity-Logo.wine.svg',
        ]
    }]

    const [count, setCounter, setIncrement] = useIncrementData();
    useEffect(() => {
        const interval = setInterval(() => {
            setIncrement(1, 'shopSlider', true)
        }, 8000)
        return () => clearInterval(interval)
    }, [setIncrement])

    return (
        <>
            <div className='store'>
                <div className='store-wrapper'>
                    <div className='store-container'>
                        <StoreModuleOne
                            sourceMain={storeOneArr[count['shopSlider']].sourceMain}
                            sourceBottom={storeOneArr[count['shopSlider']].sourceBottom}
                            sourceMid={storeOneArr[count['shopSlider']].sourceMid}
                            sourceTop={storeOneArr[count['shopSlider']].sourceTop}
                            title={storeOneArr[count['shopSlider']].title}
                            description={storeOneArr[count['shopSlider']].description}
                            href={storeOneArr[count['shopSlider']].href}
                            madeWith={storeOneArr[count['shopSlider']].madeWith}
                            onNextPrev={setIncrement} />
                        <StoreModuleTwo data={[{ image: '/images/redfoxinuss.png', href: 'redfoxinu.com', },
                        { image: '/mp4/retralink.gif', href: 'retralink.com' },
                        { image: '/images/beautyshop-one.png', href: '' }]} />
                    </div>
                    {/* <div className='cyborg-image-wrapper'><Image src='/images/cyborg-crouch.png' width={400} height={600} /></div> */}
                </div>

            </div>

            <style jsx>
                {`

            .cyborg-image-wrapper{
                position: absolute;
                top: 70vh;
                right: -3vw;
                z-index:6;
                background-image: linear-gradient(rgba(0,0,0, 0), rgba(40,40,40, 0.8), rgba(0,0,0, 0));
            }

        .store-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .store-wrapper{
            height: 80vh;
            width: 97%;
        }
        .store{
            top: 5rem;
            height: 92vh;
            width: 100vw;
            position: absolute;
            transform: translateX(200vw);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: scroll;

        }`}
            </style>
        </>
    )
}

export const Settings: FC = ({ }): JSX.Element => {

    const elementData = [{
        title: 'graphics',
        listItems: ['brighteness', 'color', 'quality']
    }, {
        title: 'sound',
        listItems: ['sound-effects', 'music', 'mute']
    }, {
        title: 'controls',
        listItems: ['scroll-left', 'scroll-right', 'contact-me']
    }]

    return (
        <>
            <div className='settings'>
                <div className='main-container'>
                    {elementData.map((data) => {
                        return (
                            <div style={{ width: `${100 / elementData.length}%` }}>
                                <h1>{data.title}</h1>
                                <ul>
                                    {data.listItems.map((listData) => {
                                        return (
                                            <li><p>{listData}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>
                {`

                .main-container{
                    display: flex;
                    flex-direction: row;
                    height: 95%;
                    width: 95%;
                    padding: 5rem 7rem;
                    background-color: rgba(0,0,0,0.3);
                    box-shadow: 0 0 10rem 3rem rgba(0,0,0,0.8);
                    animation: fadeinsettings 1s linear;
                    background-image: url('/ui-elements/settings-bkg.svg');
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: 3px solid rgba(255,255,255,0.3);
                }
                .settings-container{
                    height: 90%;
                    width: 70%;
                }
                .settings{
                    top: 9.5vh;
                    height: 90vh;
                    width: 100vw;
                    position: absolute;
                    transform: translateX(300vw);
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

