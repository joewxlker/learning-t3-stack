import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Layout from '../../components/layout'
import Product from '../../components/product';

export const getStaticProps: GetStaticProps = async () => {
    return { props: { one: 'test', two: 'hello' } }
} 

const About: NextPage<JSX.Element> = ({ ...props }) => {

    const iterableProps = Object.values(props)
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Layout>
                <>
                    <Product/>
                    {iterableProps.map((data, id) => {
                        return (
                            <div key={id}>
                                {data}
                            </div>
                        )
                    })}
                </>
            </Layout>
        </>
    )
                
}
export default About;