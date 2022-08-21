import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { buttons } from "../util/staticSiteData";
import { Form } from "./form";
import PopupMenu from "./popup";

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
                                    <span><Image alt={data.name} src={data.icon} width={50} height={50} /><h2>{data.name}</h2></span>
                                </div>}
                            </div>
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
                            <h2>Thank you for contacting me, I'll be in touch asap</h2>
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
                    background-color: rgb(30,30,30);
                    
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
                    box-shadow: 0 0 5rem 3rem rgba(0,0,0,0.2);
                    background-color: rgba(0,0,0,0.2);
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