import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { isUndefined } from "../util/isNullUndefiend";
import { ChallengeData, CodeWarsData } from "./code-wars";
import { GithubAccountData, GithubSubscribe } from "./github-id";
import Slider from "./slider";

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
            acheivements: [],
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
                                        <div className='flex-row'><Image alt={data.title} src={data.url} width={40} height={40} /><h3 id='dark'>{data.title}</h3> <h1 id='dark'>{data.completion}</h1></div>
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
                                    <div key={image} style={{ padding: '1%' }}><Image alt={image} src={image} width={60} height={60} /></div>
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
                    font-size: 2vh;
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
                    border-radius: 7px;
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
                    background-size: 100% 100%;
                    background-position: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 40%;
                    width: 25%;
                    min-width: 20rem;
                    margin-right: 2%;
                    background-color: rgba(30,30,30, 0.9);
                    overflow: hidden;
                }
                .module-one{
                    background-image: url(/ui-elements/spinner-black.svg),
                    linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
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
                    linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
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
                    <span className='logo'><Image src='/ui-elements/spinner-black.svg' height={60} width={60} /></span>
                    {data[0] !== null && <button onClick={e => { setActive(0) }}><span id='github' className={`flex-row  ${active === 0}`}></span></button>}
                    <button onClick={e => { setActive(1) }}><span id='codewars' className={`flex-row  ${active === 1}`}></span></button>
                    <button onClick={e => { setActive(2); }}><span id='sololearn' className={`flex-row  ${active === 2}`}></span></button>
                </div>
                <div style={{ padding: '2.5vh 2.5vw ' }}>
                    <div className='main'>
                        <StatModules data={data} active={active} />
                    </div>
                </div>
            </div>
            <style jsx>
                {`



                .logo {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20%;
                    margin-top: 20%;
                }

                #sololearn{
                    background-image: url('/ui-elements/sololearn-grey.svg');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 40px 40px;
                }

                #github{
                    background-image: url('/ui-elements/github-grey.svg');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 40px 40px;
                }

                #codewars{
                    background-image: url('/ui-elements/codewars-grey.svg');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 40px 40px;
                }

                button span {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                button{
                    height: 3rem;
                    width: 100%;
                    color:white;
                    margin-top: 20%;
                }

                .true {
                    border-left: 3px solid rgba(255,155,55);
                }

                .main {
                    width: 90vw;
                    height: 90vh;
                    flex-direction: column;
                }

                .sidebar {
                    display: flex;
                    position: relative;
                    flex-direction: column;
                    min-width: 5rem;
                    width: 5vw;
                    background-color : rgba(30,30,30,1);
                    box-shadow: 0rem 0rem 1rem 0.01rem rgba(0,0,0, 0.2);
                    margin-top: -0rem;
                    border-right: 2px solid rgba(0,0,0,0.5);
                }
                .Stats{
                    display:flex;
                    flex-direction: row;
                    top: 5rem;
                    height: 91.8vh;
                    width: 100vw;
                    position: relative;
                    transform: translateX(100vw);
                }
                
                @keyframes animatelogo {
                    from { transform: rotate(0deg)}
                    to{ transform: rotate(360deg)}
                }
                `}
            </style>
        </>
    )
}

