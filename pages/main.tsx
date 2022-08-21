import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CodeWars, { CodeWarsData } from '../components/code-wars';
import EmblemMenu from '../components/emblems';
import { GithubAccountData, GithubSubscribe, IdCard } from '../components/github-id';
import Layout from '../components/layout'
import { MainMenu } from '../components/main-menu';
import PopupMenu from '../components/popup';
import { Settings } from '../components/settings';
import { Stats } from '../components/stat-modules';
import { Store } from '../components/store';
import { useHandleSetBool } from '../hooks/setBooleanValues';
import { isUndefined } from '../util/isNullUndefiend';


interface MainProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    githubEvents: GithubSubscribe | null;
    codeWarsData: CodeWarsData | null;
    codeWarsChallengeData: CodeWarsData | null;
}

const Main: NextPage<MainProps> = ({ githubAccountData, githubSubscribe, codeWarsData, codeWarsChallengeData, githubEvents, }) => {

    const [innerWidthProp, setInnerWidthProp] = useState<number>();
    const [posBrighteness, setPosBrightness] = useState<number>(0);
    const [negBrighteness, setNegBrightness] = useState<number>(0);
    const [windowPosition, setWindowPosition] = useState<string>();
    const [bgAnimation, setBgAnimation] = useState<boolean>(false);
    const [bgPosition, setBgPosition] = useState<number>();
    const [bool, setBool] = useHandleSetBool();
    const [activeEmblem, setActiveEmblem] = useState<string>('/logos/react.svg');

    const updateWidth = () => setInnerWidthProp(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        if (window.innerWidth < 800) { window.location.href = '/mobile' }
        updateWidth()
        return () => window.removeEventListener('resize', updateWidth)
    }, [innerWidthProp, setInnerWidthProp])
    // This useEffect updates the inner width value
    // the inner width value is passed to the child components

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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Layout onLinkClick={handleLinkClick} innerWidthProp={innerWidthProp}>
                <>
                    {bool['openEmblemMenu'] && <PopupMenu><EmblemMenu onEmblemChange={value => { setActiveEmblem(value) }} bool={bool['openEmblemMenu']} onCloseMenu={e => setBool('openEmblemMenu')} /></PopupMenu>}

                    <div className='user-data-container'>
                        {/** Components go here */}
                        <IdCard
                            githubAccountData={githubAccountData}
                            githubSubscribe={githubSubscribe}
                            onOpenEmblemMenu={(target) => { return setBool(target) }}
                            activeEmblem={activeEmblem} />
                        <CodeWars data={codeWarsData} />
                    </div>
                    <div className='main-menu-container'>
                        <MainMenu />
                    </div>

                    <div className='overlay'>
                        <div className='overlay' style={{ backgroundColor: `rgba(0,0,0, 1)`, opacity: `${negBrighteness / 8}` }} />
                        <div className='overlay' style={{ backgroundColor: `rgba(255,255,255, 1)`, opacity: `${posBrighteness / 8}` }}></div>
                        <Stats data={[githubAccountData, githubEvents, codeWarsData, codeWarsChallengeData]} />
                        <Store />
                        <Settings onSliderChange={(arg0, arg1) => {
                            if (arg0 == 'brightness' && (parseInt(arg1) / 40) - 5 < 0) return setNegBrightness((((parseInt(arg1) / 40) - 5)) * ((parseInt(arg1) / 40) - 5));
                            else if (arg0 == 'brightness') return setPosBrightness((((parseInt(arg1) / 40) - 5)))
                        }} />
                    </div>
                </>
            </Layout>
            <div id={windowPosition} className={`video-container  ${bgAnimation} ${windowPosition}`}></div>
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
                .STATS{transform: translateX(-100px);}
                div#STATS.true {animation: translateWeapons 0.5s ease-in-out;}
                div#STATS.false  { animation: translateWeaponsRight 0.5s ease-in-out ;}
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
                    height: 120vh;
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


