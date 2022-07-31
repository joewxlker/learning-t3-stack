import { FC, useEffect, useState } from "react";

export interface CodeWarsLanguages {
    javascript: CodeWarsStats;
}
export interface CodeWarsStats {
    rank: number;
    name: string;
    color: string;
    score: number;
}
export interface RankObj {
    overall: CodeWarsStats;
    languages: CodeWarsLanguages;
}
export interface CodeWarsData {
    id: string;
    username: string;
    name: string;
    honor: number;
    leaderboardPosition: number | null;
    ranks: RankObj;
    codeChallenges: object;
}
export interface CodeWarsProps {
    data: CodeWarsData;
}

const CodeWars: FC<CodeWarsProps> = ({data}): JSX.Element => {

    if (data === undefined) return
    return (
        <CodeWarsId data={data} />
    )
}

export default CodeWars;

export const CodeWarsId: FC<CodeWarsProps> = ({ data }) => {
    const [hover, setHover] = useState<boolean>()
    const handleHover = () => {
        if (hover) return setHover(false)
        return setHover(true)
    }
    return (
        <>
            <div onMouseEnter={handleHover} id={`${hover}`} className='main' >
                <h3>__ CodeWars __</h3>
                <span><h4>CodeWars: {data.name}</h4></span>
                <span>{data.leaderboardPosition !== null && <h4>LeaderBoard Position: {data.leaderboardPosition}</h4>}</span>
                <span>{data.leaderboardPosition === null && <h4>LeaderBoard Position: null</h4>}</span>
                <span><h4>Score: {data.ranks.languages.javascript.score}</h4></span>
                <span><h4>Rank: {data.ranks.overall.name}</h4></span>
            </div>
            {hover && <div className="open-codewars" onMouseLeave={handleHover} onClick={e => { e.preventDefault(); window.open('https://www.codewars.com/users/riectivnoodes') }}>
                <span title='opens new link in the browser' className='open-codewars-span'><h2>View Codewars Profile</h2></span>
            </div>}
            <style jsx>{`
            #true{
                filter: blur(3px);
                animation: slowblur 0.5s;
            }
            h2{
                color: white;
                padding: 0;
                margin: 0;
            }
            h4{
                color: white;
                margin: 0;
            }
            h3{
                color: orange;
                margin: 0;
            }
            .main{
                animation: fadein 1s;
                position:absolute;
                background-color: rgba(0,0,0, 0.3);
                padding: 1rem;
                // border: solid grey 2px;
                box-shadow: 0 10px black;
                width: 30rem;
                height: 10rem;
                top: 23rem;
                right: 2rem;
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
            .open-codewars{
                cursor: pointer;
                position:absolute;
                background-color: rgba(0,0,0, 0.3);
                padding: 1rem;
                border: solid grey 2px;
                box-shadow: 0 10px black;
                width: 30rem;
                height: 10rem;
                top: 23rem;
                right: 2rem;
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
                  0% 100%)
            }

            .open-codewars-span{
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                align-items: center;
                justify-content: center;
                animation: fadein 1s;
            }

            @keyframe fadein {
                from {opacity: 0}
                to {opacity: 100%}
            }
            @keyframes slowblur {
                from {
                    filter: blur(0);
                }
                to {
                    filter: blur(3px);
                }
            }
            `}</style>
        </>
    );
}