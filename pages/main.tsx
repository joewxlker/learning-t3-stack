import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { StringifyOptions } from 'querystring';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import CodeWars, { CodeWarsData } from '../components/code-wars';
import EmblemMenu from '../components/emblems';
import { GithubAccountData, GithubSubscribe, IdCard } from '../components/github-id';
import Layout from '../components/layout'
import { StoreModuleOne, StoreModuleTwo } from '../components/store-modules';
import { useHandleSetBool } from '../hooks/setBooleanValues';
import { useIncrementData } from '../hooks/setCounter';

export interface MainProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    codeWarsData: CodeWarsData | null;
}

export const isNull = (value: any | null) => { if (value === null) { return false } return true }
export const isUndefined = (value: any | null) => {if(value === undefined) {return false} return true}
export const getStaticProps: GetStaticProps = async () => {

    const github = await fetch('https://api.github.com/users/riectivnoodes');
    const githubSubs = await fetch('https://api.github.com/users/riectivnoodes/subscriptions');
    let githubAccountData: GithubAccountData = await github.json();
    let githubSubscribe: GithubSubscribe = await githubSubs.json();
    if (isUndefined(githubAccountData.message)) { githubAccountData = null;githubSubscribe = null;}
    const codeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes');
    let codeWarsData: CodeWarsData | null = await codeWars.json();
    return { props: {githubAccountData, githubSubscribe, codeWarsData} } 
}

const Main: NextPage<MainProps> = ({githubAccountData, githubSubscribe, codeWarsData}) => {

    const [innerWidthProp, setInnerWidthProp] = useState<number>();
    const [posBrighteness, setPosBrightness] = useState<number>(0);
    const [negBrighteness, setNegBrightness] = useState<number>(0);
    const [bool, setBool] = useHandleSetBool();
    const [activeEmblem, setActiveEmblem] = useState<string>('/images/propaganda.png');

    const updateWidth = () => setInnerWidthProp(window.innerWidth)
            useEffect(() => {
                window.addEventListener('resize', updateWidth)
           updateWidth()
           return () => window.removeEventListener('resize', updateWidth)  
            }, [innerWidthProp, setInnerWidthProp])
    //This useEffect updates the inner width value
    //the inner width value is passed to the child components

    const handleLinkClick = (props: number) => {
        window.scrollTo(props, 0)
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
                    {bool['openEmblemMenu'] && <EmblemMenu onEmblemChange={value => { console.log(activeEmblem); setActiveEmblem(value)}} bool={bool['openEmblemMenu']} onCloseMenu={ e => setBool('openEmblemMenu')} />}
                    <span className='video-container'>
                    <video className='video' loop autoPlay={true} muted src="mp4/soldierbkg.mp4"
                        style={{
                            height: '100vh',
                            width: '110vw',
                            objectFit: 'fill',
                            display: 'absolute',
                            position: 'absolute',
                            top: 0, zIndex: -1,
                            transform:'translateX(-100px)',

                    }} >
                    Your browser does not support the video tag.
                        </video>
                        </span>
                    <div className='user-data-container'>
                        {/** Components go here */}
                        <IdCard
                            githubAccountData={githubAccountData}
                            githubSubscribe={githubSubscribe}
                            onOpenEmblemMenu={(e) => { return setBool(e)}}
                            activeEmblem={activeEmblem} />
                        <CodeWars data={codeWarsData} />
                    </div>
                    <div className='main-menu-container'>
                        <MainMenu/>
                    </div>
                    
                    <div className='overlay' style={{ backgroundColor: `rgba(0,0,0, 0.${negBrighteness})` }}>
                    <div className='overlay' style={{ backgroundColor: `rgba(255,255,255, 0.${posBrighteness})` }}></div>
                        <Weapons />
                        <Store />
                        <Settings />
                        </div>
                    </>
            </Layout>
            
            <style jsx>
                {`
                
                .video-container{
                    position: fixed;
                    z-index: -2;
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
                    top: 10vh;
                    height: 80vh;
                    width: 45vw;
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
        }

        h1{
            color: rgba(255,255,255,0.8);
            text-shadow: 1px 1px 4rem white;
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

    const buttons = [{
        subName: 'Fight for a chance of survival',
        name: 'THE GULAG',
    },{
        subName: 'Fight for a chance of survival',
        name: 'BATTLE ROYAL',
    },{
        subName: 'Fight for a chance of survival',
        name: 'ZOMBIES',
    }]
    return (
        <>
            <div className='menu-title-container'>
            </div>
            <div className='menu-button-container'>
                {buttons.map((data) => {
                    return (
                        <button className='menu-button'><h3>{data.subName}</h3><h2>{data.name}</h2></button>
                )})}
            </div>
            <style jsx >
                {`

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
                .menu-button{
                    width: 90%;
                    height: 5rem;
                    background-color: rgba(200,200,200, 0.1);
                    border: 2px solid  rgba(200,200,200, 0.3);
                    color: white;
                }
                .menu-button:hover{
                    filter: blur(0.1px);
                    -webkit-filter: blur(0.1px);
                    background-color: rgba(200,200,200, 0.3);
                    border: 2px solid  rgba(200,160,70, 0.7);
                    color: orange;
                    box-shadow: 0rem 0rem 1rem 0.01rem rgba(200,160,70, 0.7);
                }
                .menu-button-container{
                    width: 90%;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }
                .menu-title-container{
                    height: 5rem;
                    width: 90%;
                    color: white;
                    display: flex;
                    flex-direction: column;
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
            '/images/react-2.svg',
            '/images/Node.svg',
            '/images/expressjs-icon.svg',
            '/images/mongodb.svg',
            '/images/SendGrid.svg',
            '/images/stripe-ar21.svg'
        ]
    },{
        sourceMain: '/mp4/retralink.gif',
        sourceBottom: '/mp4/retralink.gif',
        sourceMid: '/mp4/retralink.gif',
        sourceTop: '/mp4/retralink.gif',
        title: '',
        description: ``,
        href: '',
        madeWith: [
        '/images/react-2.svg',
        '/images/Node.svg',
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
                        <StoreModuleTwo images={['/images/redfoxinuss.png','/mp4/retralink.gif','/images/beautyshop-one.png']}/>
                    </div>

                </div>
            </div>
            <style jsx>
                {`
        .store-container{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 3rem;
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
    return ( 
        <>
            <div className='settings'>
                <div className='settings-container'>

                </div>
            </div>
            <style jsx>
                {`

                .settings-container{
                    height: 86%;
                    width: 97%;
                }
                .settings{
                    top: 6vh;
                    height: 90vh;
                    width: 100vw;
                    position: absolute;
                    transform: translateX(300vw);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }`}
            </style>
            </>
    )
}

