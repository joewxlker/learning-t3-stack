import Image from "next/image";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useHandleSetBool } from "../hooks/setBooleanValues";
import { useIncrementData } from "../hooks/setCounter";
import { isNull, isUndefined } from "../util/isNullUndefiend";
import Slider from "./slider";

export interface GithubAccountData {
    login?: string;
    id?: string;
    node_id?: string;
    avatar_url?: string;
    html_url?: string;
    public_repos?: number;
    repos_url?: string;
    message?: string;
    events?: Array<GithubEvents>;
}

export interface GithubSubscribe {
    owner?: GithubAccountData;
    repos_url?: string;
}

interface Author {
    email?: string;
    name?: string;
    message?: string;
    url?: string;
}

interface Actor {
    id?: number;
    name?: string;
    avatar_url?: string;
}

interface Repo {
    id?: number;
    name?: string;
    url?: string;
}

interface Payload {
    size?: number;
}

export interface GithubEvents {
    id?: string;
    type?: string;
    author?: Author;
    actor?: Actor;
    repo?: Repo;
    payload?: Payload;
    created_at?: string;
}

export interface GithubProps {
    onOpenEmblemMenu: (e: string) => void;
    githubAccountData: GithubAccountData | null;
    githubSubscribe: GithubSubscribe | null;
    activeEmblem: string;
}

export const IdCard: FC<GithubProps> = ({ githubAccountData, githubSubscribe, onOpenEmblemMenu, activeEmblem }): JSX.Element => {

    const [count, setCount, setIncrement] = useIncrementData();
    const [loading, setLoading] = useState(true);
    const [bool, setBool] = useHandleSetBool();

    //TODO fix delay in RepoValues / Commit counts

    useEffect(() => {
        setCount('iterateRepoValues', 1)
        if (!isNull(githubAccountData)) return;
        setBool('githubData')
        setTimeout(() => {
            getCommitData(githubAccountData, githubSubscribe);
        }, 100)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isNull(githubAccountData)) return;
            setIncrement(null, (githubAccountData.public_repos - 1), 'iterateRepoValues', true);
            setTimeout(() => {
                getCommitData(githubAccountData, githubSubscribe);
            }, 100)
            setIncrement(null, 2, 'iteratePValues', true);
        }, 8000)
        return () => clearInterval(interval)
    }, [count, setCount])


    const openEmblemMenu = useCallback(async () => {
        return onOpenEmblemMenu('openEmblemMenu');
    }, [onOpenEmblemMenu])

    const getCommitData = async (data: object | null | undefined, subs: object | null | undefined) => {

        const arr = [data, subs];
        for (let v in arr) { if (!isNull(arr[v]) || !isUndefined(arr[v])) return setLoading(false) }
        const res = await fetch(`https://api.github.com/repos/riectivnoodes/${subs[count['iterateRepoValues'] !== undefined ? count['iterateRepoValues'] : 0].name}/commits`);
        const updateData = await res.json();
        return [setCount('repos', updateData.length), setLoading(false), updateData]

    }

    const idPText = [
        `Current repos ${githubAccountData !== null ? githubAccountData.public_repos : null} ...`,
        `Working on node ${githubAccountData !== null ? githubAccountData.node_id : null} ...`,
        `One more visit to ${githubAccountData !== null ? githubAccountData.html_url : null} ...`]


    if (count['iterateRepoValues'] === undefined) return
    return (
        <>

            <div className='main'>
                {bool['hover'] && <div className='edit-image-container'>
                    <div onMouseLeave={e => setBool('hover')} onClick={openEmblemMenu} className='edit-image'>
                        <h1>!</h1>
                    </div>
                </div>}
                {/* ^ emblem button overlay  */}


                <span className='main-span' >
                    <div id={`${bool['hover']}`} className='emblem-container'>
                        <Image alt={activeEmblem} src={`${activeEmblem}`} height={100} width={110} onMouseOver={e => setBool('hover')} />
                    </div>
                    {/* ^ emblem button */}

                    <span className='id-span' id='id-span-id'>
                        <h3>[jw]{githubAccountData !== null ? githubAccountData.login : 'Joseph Walker'}</h3>
                        <Slider length={'80%'} />
                        {!loading &&
                            <>
                                <span className='todo'>
                                    <svg height="20" width="20"><circle cx="10" cy="14" r="5" stroke="rgba(100,100,100, 0)" strokeWidth="3" fill="rgba(244,200,0, 0.4)" />
                                        Sorry, your browser does not support inline SVG. </svg>
                                    <p>{idPText[count['iteratePValues']]}</p>
                                </span>
                            </>
                        }
                    </span>
                    {/* ^ contains text/slider elements, loading refers to github data fetching - see top of page */}
                </span>


                {bool['githubData'] &&
                    <div className='alert-rate-limit'>
                        <span className='hide-alert' >
                            <button onClick={e => setBool('githubData')} className='alert-button'>X</button>
                            <p>you have been rate limited by github. Data from github will not show</p>
                        </span>
                    </div>}

                {loading && !bool['githubData'] &&
                    <>
                        <div className='spinner'>
                            <Image alt='loading' src='/ui-elements/spinner-orange.svg' width={50} height={50} />
                        </div>
                        <h4 id='spinner-text'>Github Pending...</h4>
                    </>}
                {/* displays spinner and loading text if user is rate limited */}

                {githubAccountData !== null && <div className='github-stats-container'>
                    <span id='repo' className='github-span'>
                        <span className='github-data'>
                            <h4>Repo </h4>
                            {githubSubscribe !== null && <h1>{githubSubscribe[count['iterateRepoValues']].name}</h1>}
                        </span>
                    </span>
                    {/* displays github repo names */}

                    <span id='commit' className='github-span'>
                        <span className='github-data'>
                            <h4>Commits </h4>
                            <h1>{`${count['repos']}${count['repos'] > 29 ? '+' : ''}`}</h1>
                        </span>
                    </span>
                    {/* displays commits */}

                </div>}

            </div>
            <style jsx>{`

            .alert-button{
                background-color: rgba(0,0,0,0.5);
                border: none;
                width: 5rem;
                height: 2rem;
            }

            .alert-button:hover {
                background-color: rgba(255,255,255,0.5);
                cursor: pointer;
            }

            p{
                color: white;
                font-size: 15px;
            }
            #spinner-text{
                text-align: center;
            }

            .emblem-container{
                height: 95%;
                width: 20%;
            }

            .edit-image-container{
                height: 0rem;
            }

            #true{
                filter: blur(3px);
                animation: slowblur 0.5s;
            }

            .edit-image{
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translate(0.5rem, 0.6rem);
                z-index: 2;
                position: relative;
                height: 5.5rem;
                width: 5.8rem;
                cursor: pointer;
                background-color: rgba( 0,0,0, 0.3);
                animation: fade 1s;
            }

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
                left: 20rem;
                top: 1.4rem;
                height:1rem;
                width: 1rem;
                animation: spinner 3s linear infinite;
            }
            .hide-alert{
                animation: reveal 0.5s;
                border: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
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

            .todo:hover{
                display: flex;
                flex-direction: row;
                align-items: center;
                color: white;
                cursor: pointer;
            }

            #id-span-id{
                animation: reveal 1s;
            }

            .id-span{
                color: rgba(230,230,230, 0.4);
                display: flex;
                flex-direction: column;
                padding: 0 1rem;
                width: 90%;
                max-width: 90% !important;
                background-color: rgba(100,100,100,0.1);
                animation: slidefromright 0.5s 0.5s;
                overflow: hidden;
            }
        .main{
            animation: fadein 1s;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            position: absolute;
            width: 30rem;
            top: 9rem;
            right: 2rem;
            border: none;
                    box-shadow: 0 0 4rem 3rem rgba(0,0,0,0.3);
                    background-color: rgba(0,0,0,0.2);
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

        @keyframes slowblur {
            from{filter: blur(0)}
            to{filter: blur(3px)}
        }

        `}</style>
        </>
    )
}