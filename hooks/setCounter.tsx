import { useEffect, useState } from "react"

interface SetCount {
    count: object;
    setCount: (data: string,num:number) => void;
}
export const useSetCount = () => {
    const [count, setCounter] = useState<any>({});
    useEffect(() => {
    },[count, setCounter])
    return [count, (data: string,num:number) => {
        return setCounter({...count, [data]: num})
    }]
}