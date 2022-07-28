import { NextPage } from 'next'
import Head from 'next/head';
import { isAbsolute } from 'path';
import Layout from '../components/layout'


const Main: NextPage<JSX.Element> = () => {

    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Layout>
                <>
                <video loop autoPlay={true} muted src="mp4/soldierbkg.mp4"
                    style={{
                        height: '100vh',
                        width: '100vw',
                        objectFit: 'fill',
                        display: 'absolute',
                        position: 'absolute',
                        top: 0, zIndex: -1
                    }} >
                    Your browser does not support the video tag.
            </video>
            <div className='container'>
                {/** Components go here */}
                    </div>
                    </>
                </Layout>
            <style jsx>
                {`
                
                    
                `}
            </style>
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
        </>
    )
                
}
export default Main;