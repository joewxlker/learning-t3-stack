import { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import { FC, useRef } from 'react';
import Layout from '../components/layout'


const Main: NextPage<JSX.Element> = () => {

    const background = useRef(null)
    const handleLinkClick = (props) => {
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
                        <IdCard/>
                    </div>
                    </>
                </Layout>
            <style jsx>
                {`


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

export const IdCard: FC = (): JSX.Element => {
    return (
        <>
            <div className='main'>
                <Image src='/images/propaganda.png' height={100} width={100} />
                <span className='id-span'>
                    <h3>[jw]JosephWalker Rank 3</h3>
                    <div className='slider-container'>
                        <div className="slider" />
                    </div>
                    </span>
            </div>
            <style jsx>{`

            h3{
                color: white;
            }
            .slider-container{
                width: 90%;
                height: 1rem;
                background-image: linear-gradient(rgba(200,200,200,0.3), rgba(200,200,200,0.05));
                // border-radius: 5px;
                box-shadow: inset 0.1rem 0.1rem white;
                padding: 0.1rem 0.15rem ;
            }
            .slider{
                position: relative;
                width: 90%;
                height: 0.9rem;
                background-color: orange;
                box-shadow: inset 0 0.3rem 0.8rem 0.05rem red;
                animation: expand 1sec ease-in;
            }
            .id-span{
                display: flex;
                flex-direction: column;
                padding: 0 1rem;
                width: 100%;
            }
        .main{
            display: flex;
            justify-content: stretch;
            position: absolute;
            width: 30rem;
            top: 6rem;
            right: 2rem;
            background-color: rgba(100,100,100,0.1);
            animation: slidefromright 0.5s ease-in;
        }

        @keyframes slidefromright{
            from {
                transform: translateY(600px)
            }
            to {
                transform: translateY(0px)
            }
        }

        @keyframes expand {
            from {
                width: 0%;
                transform: translateX(-100px)
            }
            to {
                width: 90%;
                transform: translateX(0px)
            }
        }

        `}</style>
        </>
    )
}