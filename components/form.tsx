import Image from "next/image";
import { FC, FormEvent, useCallback, useState } from "react";
import useSetForm from "../hooks/setForm";
import { client } from "../pages/_app";
import { inferMutationOutput } from "../server/utils/trpc";

interface FormProps {
    type: Array<'firstname' | 'lastname' | 'email' | 'hidden' | 'message'>;
    target: `sendgrid.send-email`;
    onResponse: (data?: inferMutationOutput<'sendgrid.send-email'>) => void;

};

export const Form: FC<FormProps> = ({ type, target, onResponse }): JSX.Element => {

    const [form, setForm] = useSetForm();
    const [loading, setLoading] = useState<boolean>(false);

    const handleCallback = useCallback((data: inferMutationOutput<'sendgrid.send-email'>) => {
        onResponse(data)
        // pass data to parent elements
    }, [onResponse])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        const emptyCheck = Object.values(form).map(e => { return e === '' });
        // returns true at index of ''
        const filtered = emptyCheck.filter((x) => x === true);
        // filters through array of boolean values, returns empty array | [true, ...] 
        if (((type.length - 1)) != Object.entries(form).length || filtered[0] === true)
            /** -1 here to remove hidden input value from equation, 
             * checks length of properties passed to component matches form input length.
            */
            return setLoading(false);
        // returns, no data is sent to server

        const res: any = await client.mutation(target, form);
        //tRPC request

        console.log('sending')
        handleCallback(res)
        return setLoading(false);
        //TODO fix infered output typing from tRPC
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <>

                    {type.map((types) => {
                        /** type is passed from parent elements,  */
                        return (
                            <input
                                // disabled={loading}
                                key={types}
                                name={types}
                                value={form[types]}
                                type={types}
                                placeholder={types}
                                onChange={setForm} />)
                        //renders form text input elements  
                    })}
                </>
                {!loading && <button type='submit' disabled={((type.length - 1)) != Object.entries(form).length}> Submit </button>}
                {loading && <div className='spinner'>
                    <Image src='/ui-elements/spinner-orange.svg' width={50} height={50} />
                </div>}
            </form>
            <style jsx > {`

            form {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
            }
            input { 
                margin: 1rem;
                width: 50%;
                height: 2rem;
                background: rgba(255,255,255,0.2);
                border: solid 1px rgba(255,255,255,0.4);
                color: white;
                font-size: 20px;
            }

            button {
                margin: 1rem;
                width: 50%;
                height: 3rem;
                background: orange;
                border: solid 0px rgba(255,255,255,0.4);
                color: white;
                font-size: 20px;
            }

                button: {
                    text-align: center;
            }


                :nth-child(5){
                    padding-bottom: 10rem;
                padding-top: 1rem;
            }
            `} </style>
        </>
    )
}