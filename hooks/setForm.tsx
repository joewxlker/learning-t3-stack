import { useState } from "react";

interface FormObj {
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined,
    hidden: string | undefined,
    message: string | undefined,
}

export const formObj = {}

const useSetForm = () => {
    const [value, setForm] = useState<FormObj>();
    return [value, (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((oldValue) => {
            return { ...oldValue, [event.target.name]: event.target.value };
            // sets form state based on input value without mutating state
        });
    },
    ] as const;
};

export default useSetForm;