import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useSetCount } from "../hooks/setCounter";

interface Bool {
    githubData: boolean;
}

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

export interface GithubProps {
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
}

export const IdCard: FC<GithubProps> = ({ githubAccountData, githubSubscribe }): JSX.Element => {
    
    const [count, setCount] = useSetCount();
    const [loading, setLoading] = useState(true);
    const [bool, setBool] = useState<Bool>({ githubData: true });
    
    useEffect(() => {
        setCount('iterateRepoValues', 1)
        if (githubAccountData === null) return
        setBool({ ...bool, ['githubData']: false })
        getCommitData();
    }, [])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (githubAccountData === null) return
            iterateData(githubAccountData.public_repos - 1, 'iterateRepoValues');
            getCommitData();
            iterateData(2, 'iteratePValues');
        }, 8000)
        return () => clearInterval(interval)
    }, [count])

    const iterateData = async (greaterThan: string | number, target: string) => {
        if (count[target] < greaterThan) return setCount(target, (count[target] + 1));
        else return setCount(target, 0)
    };

    const getCommitData = async () => {
        if (githubAccountData === null || githubAccountData === undefined) return setLoading(false)
        if (githubSubscribe === null || githubSubscribe === undefined) return setLoading(false)
        const res = await fetch(`https://api.github.com/repos/riectivnoodes/${githubSubscribe[count['iterateRepoValues'] !== undefined ? count['iterateRepoValues'] : 0].name}/commits`);
        const data = await res.json();
        setCount('repos', data.length);
        setLoading(false)
    }
    const idPText = [
        `Current repos ${githubAccountData !== null ? githubAccountData.public_repos : null} ...`,
        `Working on node ${githubAccountData !== null ? githubAccountData.node_id : null} ...`,
        `One more visit to ${githubAccountData !== null ? githubAccountData.html_url : null} ...`]


    if (count['iterateRepoValues'] === undefined) return
    return (
        <>
            <div className='main'>
                <span className='main-span'>
                    <Image src='/images/propaganda.png' height={10} width={140} />
                    <span className='id-span'>
                        <h3>[jw]{githubAccountData !== null ? githubAccountData.login : 'Joseph Walker'}</h3>
                        <div className='slider-container'>
                            <div className='slider-wrapper'>
                                <div className="slider" />
                            </div>
                        </div>
                        {!loading &&
                            <>
                                <span className='todo'>
                                    <svg height="20" width="20"><circle cx="10" cy="14" r="5" stroke="rgba(100,100,100, 0)" strokeWidth="3" fill="rgba(244,200,0, 0.4)" />
                                        Sorry, your browser does not support inline SVG. </svg>
                                    <p>{idPText[count['iteratePValues']]}</p>
                                </span>
                                {githubAccountData === null && <p>no data to show</p>}
                            </>
                        } 
                    </span>
                </span>
                {bool['githubData'] && <div className='alert-rate-limit'>
                    <span className='hide-alert' ><h4>you have been rate limited by github. Data from github will not show</h4><button
                        onClick={e => { e.preventDefault(); setBool({ ...bool, ['githubData']: false }) }} className='alert-button'>X</button></span>
                </div>}
                {loading && !bool['githubData'] && <span><h4>Github Pending...</h4><div className='spinner'></div></span>}
                <>
                    {githubAccountData !== null && <div className='github-stats-container'>
                        <span id='repo' className='github-span'>{githubAccountData !== null ?
                            <span  className='github-data'>
                                <h4>Repo </h4>
                                {githubSubscribe !== null && <h1>{githubSubscribe[count['iterateRepoValues']].name}</h1>}
                            </span>
                            : ''}</span>
                        <span id='commit' className='github-span'>{githubAccountData !== null || count['repos'] !== undefined ?
                            <span className='github-data'>
                                <h4>Commits </h4>
                                <h1>{count['repos']}</h1>
                            </span> : ''}</span>
                        
                    </div>}
                </>

            </div>
            <style jsx>{`
            span{
                margin: 0.3rem;
            }
            .github-stats-container{
                display: flex;   
                width: 30rem;
            }

            #repo{
                width: 70%;
            }

            #commit{
                width: 30%;
            }
            .github-span{
                background-color: rgba(200,200,200, 0.1);
                border: 2px solid  rgba(200,200,200, 0.3);
                display: flex;
                postion: relative;
                flex-direction: row;
                max-height: 4.9rem;
                overflow: hidden;
            }
            .spinner{
                position: relative;
                top: 2.4rem;
                height:0.2rem;
                width: 3rem;
                animation: spinner 2s infinite;
                background-color:white;
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
                padding: 0.3rem;                    
                -webkit-filter: blur(0.1px);
                background-color: rgba(200,200,200, 0.1);
                border: 2px solid  rgba(200,200,200, 0.3);
                box-shadow: 0rem 0rem 1rem 0.01rem rgba(200,160,70, 0.7);
                display: flex;
                flex-direction: row;
                animation: fade 0.5s ease-in;
                height: 6rem;
            }
            .todo{
                white-space:nowrap;
                overflow: hidden;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 10%:
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
            .slider-container{
                width: 100%;
                height: 0.6rem;
                background-image: linear-gradient(rgba(200,200,200,0.3), rgba(200,200,200,0.05));
            }

            .slider-wrapper{
                animation: reveal 0.5s;
                border: none;
                height: 0.6rem;
            }
            .slider{
                position: relative;
                width: 90%;
                height: inherit;
                background-color: rgba(255,255,255,0.8);
                animation: expand 1s 0.5s;
                border: none;
            }

            .id-span{
                color: rgba(230,230,230, 0.4);
                display: flex;
                flex-direction: column;
                padding: 0 1rem;
                width: 90%;
                max-width: 90% !important;
                background-color: rgba(100,100,100,0.1);
                animation: slidefromright 0.5s;
                overflow: hidden;
            }
        .main{
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            position: absolute;
            width: 30rem;
            top: 9rem;
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

        @keyframes fade {
            from {
                opacity: 0%;

            }
            to {
                opacity: 100%;
            }
        }

        @keyframes spinner{
            from {
                transform: rotate(0deg)
            }
            to {
                transform: rotate(360deg)
            }
        }

        `}</style>
        </>
    )
}