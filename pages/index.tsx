import Head from 'next/head'
import Image from 'next/image';
import { useState } from 'react';

export default function Home():JSX.Element {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 2000)
  
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
          <div className='name'><h3>Joseph Walker</h3></div>
          
        </div>
        
        <Image className='background-image' src='/images/loadingscreenone.jpg' alt='' layout='fill'></Image>
      
        <style jsx>{`

        .background_image{
          background-position: cover;
        }

      .container{
        height: 100%:
        width: 100%;
        z-index: 1;
        position: relative;
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

      .spin-on-load{
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