import { FC, useEffect } from "react";
import { useIncrementData } from "../hooks/setCounter";
import { storeOneArr, storeTwoArr } from "../util/staticSiteData";
import { StoreModuleOne, StoreModuleTwo } from "./store-modules";

export const Store: FC = (): JSX.Element => {

    const [count, setCounter, setIncrement] = useIncrementData();

    useEffect(() => {
        console.log(count, setCounter, setIncrement)
    })
    useEffect(() => {
        const interval = setInterval(() => {
            setIncrement(null, 2, 'shopSlider', true)
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
                        <StoreModuleTwo data={storeTwoArr} />
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

