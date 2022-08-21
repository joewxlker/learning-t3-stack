import { useState } from "react";

// interface BooleanObject {
//     githubData: boolean;
//     hover: boolean;
//     openEmblemMenu: boolean;
// }

// export interface Bool {
//     githubData: boolean;
//     hover: boolean;
//     openEmblemMenu: boolean;
//     setBool: (target: string) => React.Dispatch<React.SetStateAction<Boo>>
// }

export const useHandleSetBool = () => {
    const [bool, setBool] = useState<any>({ githubData: true, hover: false, openEmblemMenu: false });
    return [bool, (target: string) => {
        if (bool[target]) { setBool((prev: object) => { return { ...prev, [target]: false } }) }
        else { setBool((prev: object) => { return { ...prev, [target]: true } }) }
    }] as const
} 