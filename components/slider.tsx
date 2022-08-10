import { FC } from "react";

interface SliderProps {
    length: string;
}

const Slider: FC<SliderProps> = (props) => {

    return (
        <div className='slider-container'>
            <div className='slider-wrapper'>
                <div className="slider" />
            </div>
            <style jsx >
                {`
                    .slider-container{
                        width: 100%;
                        height: 0.6rem;
                        background-image: linear-gradient(rgba(200,200,200,0.3), rgba(200,200,200,0.05));
                    }
        
                    .slider-wrapper{
                        animation: reveal 1s;
                        border: none;
                        height: 0.6rem;
                    }
                    .slider{
                        position: relative;
                        width: ${props.length};
                        height: inherit;
                        background-color: rgba(255,255,255,0.8);
                        animation: expandslider 1s ease-in 1s;
                        border: none;
                    }

                    @keyframes expandslider {
                        from {
                            width: 0px;
                        }
                        to {
                            width: ${props.length};
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default Slider