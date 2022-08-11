import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import React, { FC, useCallback, useEffect, useState } from 'react';
import CodeWars, { ChallengeData, CodeWarsData } from '../components/code-wars';
import EmblemMenu from '../components/emblems';
import { Form } from '../components/form';
import { GithubAccountData, GithubEvents, GithubSubscribe, IdCard } from '../components/github-id';
import Layout from '../components/layout'
import PopupMenu from '../components/popup';
import Slider from '../components/slider';
import { StoreModuleOne, StoreModuleTwo } from '../components/store-modules';
import { useHandleSetBool } from '../hooks/setBooleanValues';
import { useIncrementData } from '../hooks/setCounter';
import { isUndefined } from '../util/isNullUndefiend';
import { buttons, storeOneArr } from '../util/staticSiteData';


interface MainProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    githubEvents: GithubSubscribe | null;
    codeWarsData: CodeWarsData | null;
    codeWarsChallengeData: CodeWarsData | null;

}

export const getStaticProps: GetStaticProps = async () => {

    const githubEvent = await fetch('https://api.github.com/users/riectivnoodes/events');
    const github = await fetch('https://api.github.com/users/riectivnoodes');
    const githubSubs = await fetch('https://api.github.com/users/riectivnoodes/subscriptions');
    let githubAccountData = await github.json();
    let githubSubscribe = await githubSubs.json();
    let githubEvents = await githubEvent.json();
    if (isUndefined(githubAccountData.message) || isUndefined(githubEvents.message)) { githubAccountData = null; githubSubscribe = null; githubEvents = null }
    const codeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes');
    const completedCodeWars = await fetch('https://www.codewars.com/api/v1/users/riectivnoodes/code-challenges/completed?page=0')
    let codeWarsData = await codeWars.json();
    let codeWarsChallengeData = await completedCodeWars.json();
    return { props: { githubAccountData, githubEvents, githubSubscribe, codeWarsData, codeWarsChallengeData } }
}

//TODO fix typings for sololearn  

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

                            </div>
                            <div className='animation-helper' style={{ backgroundImage: `url(${data.source})` }}>
                                {/** 'helper' div here to target image height and animations as next Image doesnt allow image styling directly */}
                                {data.name === active && <div className='overlay' onClick={e => window.open(data.href)}>
                                    {/** nested overlay div positioned relativeley, 
                                     * the wrapper allows this to have any size while 
                                     * still positioned relatively and wihtout 
                                     * effecting the flow of the page */}
                                    <span><Image src={data.icon} width={50} height={50} /><h2>{data.name}</h2></span>
                                </div>}
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
                    filter: blur(3px;);
                    align-items: flex-end;
                }

                .overlay-wrapper{
                    top: 11rem;
                    position: relative;
                    height: 0px;
                }
                .overlay{
                    bottom: 0px;
                    height: 11vh;
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
                    width: 100%;
                    border-bottom: solid 10px orange;
                    cursor: pointer;
                    animation: fadein 1s;
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
                    height: 10vh;
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

interface StatsArray extends GithubSubscribe, CodeWarsData, GithubAccountData { }

interface StatModulesProps {
    data: Array<StatsArray> | null
    active: number;
}

export const StatModules: FC<StatModulesProps> = ({ data, active }): JSX.Element => {

    useEffect(() => {
        const github = {
            title: 'GITHUB',
            avatar: data[0] ? data[0].avatar_url : '/ui-elements/spinner-blue.svg',
            username: data[0] ? data[0].username : '',
            id: data[0] ? data[0].id : '',
            acheivements: ['/ui-elements/spinner-blue.svg', '/ui-elements/spinner-blue.svg', '/ui-elements/spinner-blue.svg'],
            images: ['hidden'],
            challenges: [],
            badge: '',
            events: data[1]
        }

        const codewars = {
            title: 'CODEWARS',
            avatar: 'https://avatars.githubusercontent.com/u/99849204?s=100',
            username: data[2].login,
            id: data[2].id,
            acheivements: [],
            images: ['hidden'],
            challenges: [data[3].data[0]],
            badge: 'https://www.codewars.com/users/riectivnoodes/badges/micro',
            events: [],
        }

        const sololearn = {
            title: 'SOLO LEARN',
            avatar: 'https://api.sololearn.com/Uploads/Avatars/18445970.jpg',
            username: '',
            id: '18445970',
            acheivements: ['https://api.sololearn.com/Uploads/Achievements/59.png',
                'https://api.sololearn.com/Uploads/Achievements/114.png',
                'https://api.sololearn.com/Uploads/Achievements/123.png',
                'https://api.sololearn.com/Uploads/Achievements/130.png',
                'https://api.sololearn.com/Uploads/Achievements/60.png'],
            images: [{ url: 'https://sololearnuploads.azureedge.net/uploads/courses/1014.png', title: 'HTML', completion: '30%' },
            { url: 'https://sololearnuploads.azureedge.net/uploads/courses/1141.png', title: 'Web-fundamentals', completion: '20%' },
            { url: 'https://sololearnuploads.azureedge.net/uploads/courses//1024.png', title: 'Java-Script', completion: '98%' },
            ],
            challenges: [],
            badge: '',
            events: [],
        }

        setStatData([github, codewars, sololearn])
        if (data[0] === null) return setStatData([null, codewars, sololearn])
    }, [])

    const [big, setBig] = useState<number | undefined>();
    const [medium, setMedium] = useState<number | undefined>();
    const [small, setSmall] = useState<number | undefined>();
    const [statData, setStatData] = useState<any>([])
    const [hover, setHover] = useState('');

    useEffect(() => {
        if (isUndefined(statData[0]) || isUndefined(data[0])) return
        const events = Object.values(statData[0].events).map(x => { return x });
        const commits = events.map((x: any) => x.payload.size);
        setBig(commits.filter(x => x > 10).length)
        setMedium(commits.filter(x => x > 5).length)
        setSmall(commits.filter(x => x > 1).length);
    })

    if (statData[0] === undefined) return
    return (
        <>
            <div className='wrapper' key={statData[active].title}>
                <h1 id='dark'>{statData[active].title}</h1>
                <div className='module-container'>
                    <div className='avatar'>
                        <div style={{ clipPath: ' circle(70px at center)', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <Image src={statData[active].avatar} width={140} height={140} />
                        </div>
                        {active === 1 && <Image src={statData[active].badge} width={40} height={40} />}
                        <div className='flex-column'>
                            <h1 id='dark'>{statData[active].title}</h1>
                            <h1 id='dark'>{statData[active].username}</h1>
                            <h1 id='dark'>{statData[active].id}</h1>
                        </div>
                    </div>
                    <div className='module-one' id={`${statData[active].images[0]}`}>
                        <div id='dark' className='flex-column'>
                            <h1>COURSES</h1>
                            {statData[active] !== null && <>{statData[active].images.map((data: any) => {
                                return (
                                    <div className='' key={data} style={{ width: '80%' }}>
                                        <div className='flex-row'><Image src={data.url} width={40} height={40} /><h3 id='dark'>{data.title}</h3> <h1 id='dark'>{data.completion}</h1></div>
                                        <Slider length={data.completion} />
                                    </div>
                                )
                            })}</>}
                        </div>
                    </div>
                    <div className='module-two'>
                        <h1 >ACHIEVEMENTS</h1>
                        <div className='flex-row' style={{ flexWrap: 'wrap' }}>
                            {statData[active] !== null && <>{statData[active].acheivements.map((image: string) => {
                                return (
                                    <div key={image} style={{ padding: '1%' }}><Image src={image} width={60} height={60} /></div>
                                )
                            })}</>}
                        </div>
                    </div>
                    {active !== 2 && <div className='module-three'>
                        <> {active === 2 && <>{statData[active].challenges.map((data: ChallengeData) => {
                            return (
                                <div key={data.id} className='flex-column'>
                                    <h1 id='dark'>Last completed challenge</h1>
                                    <h2>{data.name}</h2>
                                    <h2>{data.completedLanguages}</h2>
                                    <h2>{data.completedAt}</h2>
                                </div>
                            )
                        })}</>}
                        </>
                        {statData[active] !== null && active === 0 && <div className='flex-row' style={{ width: '100%' }}>
                            <h1>RECENT COMMITS</h1>
                            {/* @ts-ignore */}
                            {statData[active].events.map((data: GithubEvents) => {
                                return (
                                    <div key={data.id}>
                                        <div
                                            id={`${hover === data.id}`}
                                            style={{ height: `${data.payload.size * 5}px`, width: '10px', backgroundColor: 'rgba(255,255,255,0.9)', paddingBottom: '10px' }}
                                            onMouseEnter={e => { setHover(data.id) }}
                                            onMouseLeave={e => { setHover('') }}
                                        >
                                        </div>
                                        {data.payload.size < 1 &&
                                            <span style={{ height: `1px`, width: '0.5rem', backgroundColor: 'red' }}>
                                            </span>}
                                        {hover === data.id &&
                                            <div className='github-data-overlay'>
                                                <h1>{data.created_at}</h1>
                                                <h1>{data.repo.id}</h1>
                                                <h1>{data.repo.name}</h1>
                                                <h1>{data.repo.url}</h1>
                                            </div>}
                                    </div>
                                )
                            })}
                        </div>}

                    </div>}
                    {active === 0 && <div className='module-four' >
                        <div className='pie'>60%</div>
                    </div>}
                </div>
            </div>
            <style jsx>
                {`

                #dark {
                    color: rgba(255,255,255,0.7) !important;
                }

                h1{
                    font-weight: 600;
                    font-size: 1vw;
                    width: max-content;
                    z-index: 2;
                }

                .wrapper{
                    height: 100%;
                    animation: fadein 1.5s;
                    margin-top: 2rem;
                }


                .pie{
                    height: 100%;
                    background:
                    conic-gradient(
                        rgba(0,0,0,0.7) 0,
                        rgba(0,0,0,0.7) 20%,
                        rgba(0,0,0,0.3) 0,
                        rgba(0,0,0,0.6) 30%,
                        rgba(255,255,255,0.4) 0,
                        rgba(255,255,255,0.1) 10%,
                        rgba(255,255,255,0.7) 0,
                        rgba(255,255,255,0.4) 100%,
                        #59a14f 0,
                        #59a14f 0%,
                        #edc949 0,
                        #edc949 0%);
                        clip-path: circle(100px at center);
                }
                div {
                    // border-radius: 15px;
                    
                }
                #true{
                    background-color: white !important;
                }

                .github-data-overlay{
                    position: absolute;
                    display: flex;
                    bottom: 7rem;
                }

                #hidden {
                    display: none;
                }

                .flex-row{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                    align-items: baseline;
                    width: 100%;
                    margin: 3% 0%;
                }
                .flex-column{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                .module-container {
                    height: 95%;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .avatar{
                    background-image: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.2)),
                    url(/ui-elements/spinner-blue.svg);
                    background-size: 100% 100%;
                    background-position: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 40%;
                    width: 25%;
                    min-width: 20rem;
                    margin-right: 2%;
                    background-color: rgba(200,200,200, 0.1);
                    // border: 2px solid  rgba(200,200,200, 0.5);
                    box-shadow: 0rem 0rem 2rem 0.01rem rgba(0,0,0, 0.8);
                    overflow: hidden;
                }
                .module-one{
                    background-image: url(/ui-elements/spinner-black.svg),
                    linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
                    background-size: 140% 200%;
                    background-position: center;
                    padding: 1%;
                    display: flex;
                    margin-right: 2%;
                    min-width: 20rem;
                    height: 40%;
                    margin-bottom: 2%;
                    width: 40%;
                background-color: rgba(200,200,200, 0.1);
                border: 2px solid  rgba(200,200,200, 0.5);
                box-shadow: 0rem 0rem 1rem 0.01rem rgba(0,0,0, 0.2);
                }
                .module-two{
                    background-image: url(/ui-elements/settings-bkg.svg),
                    linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.1));
                    background-size: 140% 200%;
                    background-position: center;
                    border-radius: 0;
                    padding: 3%;
                    width: 60%;
                    min-width: 20rem;
                    height: 40%;
                    background-color: rgba(0,0,0, 0.3);
                    padding: 4rem;
                overflow:hidden;
                clip-path: polygon(
                  0 10%,
                  5% 0,
                  100% 0,
                  100% 10%,
                  100% 90%,
                  95% 100%,
                  100% 100%,
                  0% 100%,
                  0% 100%
                )
                }
                .module-three{
                    background-image: url(/ui-elements/spinner-black.svg),
                    linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0));
                    background-size: 140% 200%;
                    background-position: center;
                    width: 50%;
                    min-width: 20rem;
                    height: 30%;
                    margin-top: 0%;
                    margin-bottom: 2%;
                background-color: rgba(200,200,200, 0.1);
                border: 2px solid  rgba(200,200,200, 0.5);
                box-shadow: 0rem 0rem 1rem 0.01rem rgba(0,0,0, 0.2);
                }

                .module-four{
                    width: 28%;
                    min-width: 20rem;
                    height: 30%;
                    margin-top: 0%;
                    margin-left: 2%;
                    margin-bottom: 2%;
                background-color: rgba(200,200,200, 0.1);
                border: 2px solid  rgba(200,200,200, 0.5);
                box-shadow: 0rem 0rem 1rem 0.01rem rgba(0,0,0, 0.2);
                }

                `}
            </style>
        </>
    )
}


interface StatsProps {
    data: Array<StatsArray>
}

export const Stats: FC<StatsProps> = ({ data }): JSX.Element => {

    const [active, setActive] = useState<number>(0)

    useEffect(() => {
        if (data[0] !== null) return
        setActive(1)
    }, [])

    return (
        <>
            <div className='Stats'>
                <div className='sidebar'>
                    {data[0] !== null && <button onClick={e => { setActive(0) }}><span className='flex-row'><Image src='/logos/github.svg' width={40} height={40} />GITHUB</span></button>}
                    <button onClick={e => { setActive(1) }}><span className='flex-row'><Image src='/logos/codewars.svg' width={40} height={40} />CODEWARS</span></button>
                    <button onClick={e => { setActive(2); }}><span className='flex-row'><Image src='/logos/sololearn.svg' width={40} height={40} />SOLOLEARN</span></button>
                </div>
                <div style={{ padding: '2.5vh 2.5vw ' }}>
                    <div className='main'>
                        <StatModules data={data} active={active} />
                    </div>
                </div>
            </div>
            <style jsx>
                {`

                button span {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 80%;

                }

                button{
                    height: 3rem;
                    width: 100%;
                    background-color: rgba(0,0,0,0.3);
                    color:white;
                    border-bottom: 2px solid rgba(255,255,255,0.4); 
                    margin: 1%;
                }

                button:hover {
                    background-image: linear-gradient(rgba(0,0,0,0), orange);
                }

                .main {
                    width: 80vw;
                    height: 87vh;
                    flex-direction: column;
                }
                .sidebar {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                    width: 15vw;
                    background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.2) );
                    box-shadow: 0rem 0rem 1rem 0.01rem rgba(0,0,0, 0.2);
                    margin: 0rem;
                    border-right: 2px solid rgba(255,255,255,0.5);
                }
                .Stats{
                    display:flex;
                    flex-direction: row;
                    top: 8.2vh;
                    height: 91.8vh;
                    margin: 0px;
                    width: 100vw;
                    position: relative;
                    transform: translateX(100vw);
                }`}
            </style>
        </>
    )
}


export const Store: FC = (): JSX.Element => {

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

interface SettingsProps {
    onSliderChange: (arg0: string, arg1: string) => void;
}

export const Settings: FC<SettingsProps> = ({ onSliderChange }): JSX.Element => {

    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [width, setWidth] = useState<number>();
    const [xpos, setXpos] = useState({ 'brightness': 220, 'sound': 1 });

    useEffect(() => {
        setWidth(window.innerWidth)
    })

    const elementData = [{
        title: 'graphics',
        slider: [{ title: 'Brightness', sliderPos: `${xpos['brightness']}px`, type: 'brightness', amount: width * 0.1 }],
        boxes: [{ text: '', }]
    }, {
        title: 'sound',
        slider: [{ title: 'Audio', sliderPos: `${xpos['sound']}px`, type: 'sound', amount: width * 0.5 }],
        boxes: [{ text: '', }]
    },]

    const setSlidersCallback = useCallback((type: string) => {
        onSliderChange(type, `${xpos[type]}`)
    }, [xpos, setXpos, onSliderChange])

    return (
        <>
            <div className='settings'>
                <div className='main-container'>
                    {elementData.map((data) => {
                        // renders list containers into columns
                        return (
                            <div style={{ width: `${width / 4}%` }}>
                                {/* width refers to inner screen width */}
                                <h1>{data.title}</h1>
                                <ul>
                                    {data.slider !== undefined && data.slider.map((listData) => {
                                        // renders listed sliders if defined
                                        return (
                                            <li className='list-item'>
                                                <h3>{listData.title}</h3>
                                                <Slider length={listData.sliderPos} />
                                                {/* slider component, renders plain slider without button to control length */}
                                                <button
                                                    draggable={true}
                                                    className='slider-button'
                                                    style={{ transform: `translate(${listData.sliderPos}, -2.38vh)`, padding: '0.5rem' }}
                                                    // css translation allows the button to move as the mouse X position updates
                                                    onMouseDown={(e) => { setMouseDown(true) }}
                                                    onMouseMove={(e) => {
                                                        if (!mouseDown) return
                                                        if (e.clientX - listData.amount + 180! > 600) return // returns when button reaches end of slide
                                                        if (e.clientX - 100 < 100) return // returns when button reaches start of slide
                                                        setXpos((prev) => {
                                                            setSlidersCallback(listData.type)
                                                            // callback passes slider position values to parent
                                                            return { ...prev, [`${listData.type}`]: e.clientX - listData.amount }
                                                            // e.clientX -listData.amount should provide correct parameters for this to work on all resolutions using screen width
                                                            //TODO solve the equation for slider start point, clientX : sliderPos ratio, and screen width proportions
                                                        })
                                                    }}
                                                    onMouseUp={e => setMouseDown(false)}
                                                />
                                                {/*  renders the slider which is used to control the length of slider and position of button */}
                                            </li>
                                        )
                                    })}
                                    {data.boxes.map((listData) => {
                                        // renders checkboxes  
                                        return (
                                            <li className='list-item'>
                                                {listData.text}
                                            </li>
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
                .list-item{
                    width: 25vw;
                }

                .slider-button{
                    transform: translateY(-2.4vh);
                    display: absolute;
                    background-color: orange;
                    border: none;
                    height: 0.6rem;
                    width: 3.3rem;
                    box-shadow: 0.5rem 0.5rem 0.5rem 0.1rem rgba(0 , 0, 0, 0.2);
                }

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

