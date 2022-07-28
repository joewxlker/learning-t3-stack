import { GetServerSideProps } from "next";
import React, { FC } from "react";

export interface StripeObject {
    id: string;
    description: string;
    unit_amount: number;
}
export interface StripeData { 
    data: Array<StripeObject>;
}

const Product: FC<StripeData> = ({ ...props }): JSX.Element => {
    console.log(props)
    return (
        <div className=''>
            {/* {props.data.map((data: StripeObject) => {
                return (
                    <div>{data.description}</div>
            )})} */}
        </div>
    );
}
export default Product;

export const getServerSideProps: GetServerSideProps = async () => {
    
    const stripe = require('stripe')(process.env.STRIPE_API_KEY, {
        apiVersion: '2020-08-27',
    });
    const getProducts = async () => {
        return await stripe.products.retrieve('')
      }
      const getPrice = async () => {
        let data: any = [];
        const productData = await getProducts()
        for (let v in productData.data) {
          const priceData = await stripe.prices.retrieve(productData.data[v].default_price)
          data = [...data, { ...productData.data[v], ...priceData }]
        }
        return data
      }
      const configStripe = async (input: string, bool: boolean) => {
      
        const allItems = await getPrice()
        if (!bool) {
          return allItems
        }
        else if (bool) {
          let data: Array<object> = [];
          for (let v in allItems) {
            if (input === allItems[v].product) {
              return allItems[v]
            }  
          }
        }
    }
    
    return { props: {data: configStripe('', false)}}
}

