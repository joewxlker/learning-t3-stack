import { FC, useCallback, useEffect, useState } from "react";
import Slider from "./slider";

interface SettingsProps {
    onSliderChange: (arg0: string, arg1: string) => void;
}

export const Settings: FC<SettingsProps> = ({ onSliderChange }): JSX.Element => {

    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [width, setWidth] = useState<number>();
    const [xpos, setXpos] = useState({ 'brightness': 220, 'sound': 1 });

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [width, setWidth])

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
    }, [xpos, onSliderChange])

    return (
        <>
            <div className='settings'>
                <div className='main-container'>
                    {elementData.map((data) => {
                        // renders list containers into columns
                        return (
                            <div key={data.title} style={{ width: `${width / 4}%` }}>
                                {/* width refers to inner screen width */}
                                <h1>{data.title}</h1>
                                <ul>
                                    {data.slider !== undefined && data.slider.map((listData) => {
                                        // renders listed sliders if defined
                                        return (
                                            <li key={listData.title} className='list-item'>
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
                                            <li key={listData.text} className='list-item'>
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
                    box-shadow: 0 0 10rem 3rem rgba(0,0,0,0.9);
                    animation: fadeinsettings 1s linear;
                    background-image: url('/ui-elements/settings-bkg.svg'),radial-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6));
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;

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

