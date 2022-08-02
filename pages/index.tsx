import Head from 'next/head'
import Image from 'next/image';
import { useState } from 'react';

export default function Home():JSX.Element {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 4000)
  
  if (!loading) {
    window.location.href = '/main'
  }

  return (
    <>
    <Head>
        <title></title>
      </Head>
      <div className="wrapper" style={{ width: '100vw', maxHeight: '100vh' }}>
        <div className='container'>
            {/** Components go here */}
          <div className='name'><h3>Joseph Walker</h3></div>
          <span className='bottom-span'>
            <div className='spinner'></div>
            <h2 style={{textAlign: 'center'}}>Tips...</h2>
            </span>

        </div>
        
        <Image className='background-image' src='/images/cyborg.jpeg' alt='' layout='fill'></Image>
      
        <style jsx>{`

        .background_image{
          background-position: cover;
        }

      .container{
        height: 100vh !important:
        width: 100vw;
        z-index: 1;
        position: relative;
      }

      .bottom-span{
        color: white;
        position: absolute;
        padding-top: 4vh;
        bottom: 0;
        width: 100vw;
        height: 20vh;
        background-color: rgba(200, 200, 200, 0.3);
      }
      .name{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 16vh;
        right: 27vw;
        width: 9vw;
        height: 30px;
        background-color: red;
        border: 0.1rem solid maroon; 
        color: white;
      }

      .background-image{
        display: absolute;
        position: absolute;
        z-index: 1;
      }

      .spinner{
        position: relative;
        height: 10px;
        width: 15vh;
        top: 6vh;
        left: 3vw;
        background-color: white;
        animation: spin 2s infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg)
        }
        to {
          transform: rotate(360deg)
        }
      }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background-image: linear-gradient(rgba(10,10,10,1), rgba(100,100,100,1))
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