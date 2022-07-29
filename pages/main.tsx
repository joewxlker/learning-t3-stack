import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import Layout from '../components/layout'
import { useSetCount } from '../hooks/setCounter';

export interface GithubAccountData {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    html_url: string;
    public_repos: number;
    repos_url: string;
    message: string;
}

export interface GithubSubscribe {
    owner: GithubAccountData;
    repos_url: string;
}

interface Props {
    githubAccountData: GithubAccountData;
    githubSubscribe: GithubSubscribe;
}

export const getServerSideProps: GetServerSideProps = async () => {
    const fetchOne = await fetch('https://api.github.com/users/riectivnoodes');
    const fetchTwo = await fetch('https://api.github.com/users/riectivnoodes/subscriptions');
    let githubAccountData: GithubAccountData | null = await fetchOne.json();
    let githubSubscribe: GithubSubscribe | null = await fetchTwo.json();
    if (githubAccountData.message === "API rate limit exceeded for 58.173.11.163. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {
        githubAccountData = null;
        githubSubscribe = null;
    }
    return { props: {githubAccountData, githubSubscribe} } 
  }

const Main: NextPage<Props> = ({githubAccountData, githubSubscribe}) => {

    const background = useRef(null)
    const handleLinkClick = async (props) => {
        // window.location.href = props;
    }
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Layout onLinkClick={handleLinkClick}>
                <>
                    <video ref={background} className='video' loop autoPlay={true} muted src="mp4/soldierbkg.mp4"
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
                    <div className='container'>
                        {/** Components go here */}
                        <IdCard githubAccountData={githubAccountData} githubSubscribe={githubSubscribe} />
                    </div>
                    </>
                </Layout>
            <style jsx>
                {`
                #hide-alert{
                    animation: hidealert 0s 2s;
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
                    // animation: slowrender 1s 2s;
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

      `}</style>
        </>
    )
                
}
export default Main;

interface Bool {
    githubData: boolean;
}

export const IdCard: FC<Props> = ({ githubAccountData, githubSubscribe }): JSX.Element => {
    
    const [count, setCount] = useSetCount();
    const [bool, setBool] = useState<Bool>({ githubData: true });
    
    useEffect(() => {
        if (githubAccountData === null) return
        setBool({ ...bool, ['githubData']: false })
        setCount('cycleRepo', 1)
    }, [])
    
    setInterval(() => {
        iterateData();
    }, 10000)

    const closeAlert = () => {
        setBool({...bool, ['githubData']: false})
    }
    const iterateData = () => {
        if (githubAccountData === null) return
        const handlePValueData = () => {
            if (count['iteratePValues'] < 2) return setCount('iteratePValues', count['iteratePValues'] + 1)
            else return setCount('iteratePValues', 0 )
        }
        const handleRepoData = async () => {
            await getCommitData();
            if (count['cycleRepo'] < githubAccountData.public_repos - 1) return setCount('cycleRepo', count['cycleRepo'] + 1);
            else return setCount('cycleRepo', 0 )
        }
        handlePValueData();
        handleRepoData();
    };

    const getCommitData = async () => {
        if (githubSubscribe === null) return
        const res = await fetch(`https://api.github.com/repos/riectivnoodes/${githubSubscribe[count['cycleRepo']].name}/commits`);
        const data = await res.json();
        setCount('repos', data.length);
    }

    const idPText = [
        `Current repos ${githubAccountData? githubAccountData.public_repos: null} ...`,
        `Working on node ${githubAccountData? githubAccountData.node_id : null} ...`,
        `One more visit to ${githubAccountData? githubAccountData.html_url: null} ...`]

    return (
        <>
            <div className='main'>
                <span className='main-span'>
                <Image src='/images/propaganda.png' height={120} width={160} />
                <span className='id-span'>
                    <h3>[jw]{githubAccountData !== null ? githubAccountData.login: 'Joseph Walker' }</h3>
                        <div className='slider-container'>
                            <div className='slider-wrapper'>
                                <div className="slider" />
                                </div>
                    </div>
                    <span className='todo'>
                        <svg height="20" width="20">
                            <circle cx="10" cy="14" r="5" stroke="rgba(100,100,100, 0)" strokeWidth="3" fill="rgba(244,200,0, 0.4)" />
                            Sorry, your browser does not support inline SVG.
                        </svg>
                        <p title='Clicking this will take you to github'>{idPText[count['iteratePValues']]}</p></span>
                    {githubAccountData === null && <p>no data to show</p>}
                    {/* <p>{githubAccountData !== null ? `Repo: ${githubSubscribe[count['cycleRepo']].name} Current commits:${count['repos']}` : ''}</p> */}
                    </span>
                    </span>
                {bool['githubData'] === true && <div className='alert-rate-limit'>
                            <span className='hide-alert' ><h4>you have been rate limited by github. Data from github will not show</h4><button onClick={closeAlert} className='alert-button'>X</button></span>
                </div>}
                <div className='blur-id'/>
            </div>
            <style jsx>{`

            .blur-id{
                filter: blur(20px);
                -webkit-filter: blur(20px);
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                position: absolute;
                height: 6rem;
                width: 30rem;
                top: 0rem;
                right: 0rem;
            }
            .hide-alert{
                animation: reveal 0.5s;
                border: none;
            }
            .alert-rate-limit{
                animation: slidefromright 0.5s ease-in 0.5s;
                border: none;
            }
            .main-span{
                background-color: rgba(100,100,100,0.1);
                display: flex;
                flex-direction: row
                animation: slidefromright 0.5s ease-in;
            }
            .todo{
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0%:
                margin: 0%;
            }

            p{
                padding: 0%;
                margin: 0.2rem;
            }
            .todo:hover{
                display: flex;
                flex-direction: row;
                align-items: center;
                color: white;
                cursor: pointer;
            }
            h3{
                color: white;
                margin: 0.2rem;
            }
            h4{
                color: white;
                margin: 0.2rem;
            }
            .slider-container{
                width: 90%;
                height: 1rem;
                background-image: linear-gradient(rgba(200,200,200,0.3), rgba(200,200,200,0.05));
                box-shadow: inset 0.1rem 0.1rem white;
                padding: 0.1rem 0.15rem ;
            }

            .slider-wrapper{
                animation: reveal 0.5s;
                border: none;
                height: 0.7rem;
            }
            .slider{
                position: relative;
                width: 90%;
                height: inherit;
                background-color: orange;
                box-shadow: inset 0 0.3rem 0.8rem 0.05rem red;
                animation: expand 1s 0.5s;
                border: none;
            }

            .id-span{
                color: rgba(230,230,230, 0.4);
                display: flex;
                flex-direction: column;
                padding: 0 1rem;
                width: 100%;
                background-color: rgba(100,100,100,0.1);
                animation: slidefromright 0.5s;
            }
        .main{
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            position: absolute;
            width: 30rem;
            top: 6rem;
            right: 2rem;
            border: none;
        }

        @keyframes reveal {
            from {
                border: none;
                height: 0px;
                opacity: 0%;
            }
            to {
                border:none;
                height: 0px;
                opacity: 0%;
            }
        }
        @keyframes slidefromright{
            from {
                opacity: 0%;
                transform: translateY(300px);
            }
            to {
                opacity: 100%;
                transform: translateY(0px);
            }
        }

        @keyframes expand {
            from {
                width: 0px;
            }
            to {
                width: 90%;
            }
        }

        `}</style>
        </>
    )
}