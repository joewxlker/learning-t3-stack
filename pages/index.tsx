import Head from 'next/head'
import Image from 'next/image';
import { logos } from '../util/staticSiteData';
import { FC, useEffect, useState } from 'react';
import { useIncrementData } from '../hooks/setCounter';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://useless-facts.sameerkumar.website/api');
  const data = await res.json();
  return { props: { data: data } }
}

interface ApiData {
  data: string;
}

interface IndexProps {
  data: ApiData;
}

export const Home: FC<IndexProps> = (props): JSX.Element => {

  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [animationDelay, setDelay] = useState(true);
  const [count, setCount, setIncrement] = useIncrementData();

  setTimeout(() => {
    setLoading(false)
  }, 4000)

  const handleWindowSize = () => {
    window.innerWidth > 600 ? setMobile(false) : setMobile(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setDelay(false)
    }, 300);
    if (animationDelay) return
    const interval = setInterval(() => {
      setIncrement(null, 14, 'index-logo', true);
      return clearInterval(interval)
    }, 1000)
  })

  useEffect(() => {
    window.addEventListener('resize', handleWindowSize);
    if (!loading) { !mobile ? window.location.href = '/main' : window.location.href = '/mobile' }
    handleWindowSize();
    return window.removeEventListener('resize', handleWindowSize)
  }, [loading, setLoading, mobile, setMobile])

  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="wrapper" style={{ width: '100vw', maxHeight: '100vh' }}>
        <div key={mobile.toString()} className='container'>

          {/** Components */}
          <div className='main'>
            <h1>WELCOME TO JOSEPH WALKER'S PORTFOLIO</h1>
            <h2></h2>
            <div className='logo-wrapper'><Image src={logos[count['index-logo']]} width={50} height={50} /></div>
          </div>
          <div className='bottom-span'>
            <div className='spinner'><Image src='/ui-elements/spinner-blue.svg' width={50} height={50} /></div>
            <h1>... {props.data.data}</h1>
          </div >
        </div>
        {mobile && <Image className='background-image' src='/images/cyborg-mobile.jpeg' alt='' layout='fill'></Image>}
        {!mobile && <Image className='background-image' src='/images/cyborg.jpeg' alt='' layout='fill'></Image>}

        <style jsx>{`
         .logo-wrapper{
          animation: movelogoleft 1s ease-in infinite ;
         }
        .main {
          font-size: 2vh;
          color: white;
          background-image: linear-gradient( rgba(30,30,30,1),  rgba(30,30,30,1));
          margin-bottom: 10vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow:hidden;
          clip-path: polygon(
            0 20%,
            15% 0,
            100% 0,
            100% 10%,
            100% 80%,
            85% 100%,
            100% 100%,
            0% 100%,
            0% 100%);
        }

        .background_image{
          background-position: cover;
        }

      .container{
        height: 100vh !important:
        width: 100vw;
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .bottom-span{
        color: white;
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 10vh;
        display: flex;
        align-items: center;
        // justify-content: center;
        background-color: rgba(200, 200, 200, 0.3);
      }


      .spinner{
        position: relative;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        animation: spin 2s infinite linear;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg)
        }
        to {
          transform: rotate(360deg)
        }
      }

      @keyframes movelogoleft {
        from {
          opacity: 100%;
          transform: translateX(-100px)
        }
        to {
          opacity: 0%;
          transform: translateX(100px)
        }
      }
        }
      `}</style>

        <style jsx global>{`
        html,
        body {
          background-image: linear-gradient(rgba(10,10,10,1), rgba(10,10,10,1));
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
      </div>
    </>
  )
}

export default Home