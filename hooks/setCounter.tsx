import { Dispatch, SetStateAction, useEffect, useState } from "react"


interface SetCount {
    iteratePValues: number;
    iterateRepoValues: number;
    repos: number;
}
export const useSetCount = () => {
    const [count, setCounter] = useState<any>({"iteratePValues": 0, "iterateRepoValues": 0, "repos": 0});
    useEffect(() => {
    },[count, setCounter])
    return [count, (data: string, num: number) => {
        return setCounter((prev: object) => { return{...prev, [data]: num}})
    }]
}