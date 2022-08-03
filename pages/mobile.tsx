import { NextPage } from "next";
import { useEffect, useState } from "react";

export interface MobileProps {

}

const Mobile: NextPage<MobileProps> = () => {
    
    const [innerWidthProp, setInnerWidthProp] = useState<number>();

    const updateWidth = () => setInnerWidthProp(window.innerWidth)
            useEffect(() => {
                window.addEventListener('resize', updateWidth)
                if(window.innerWidth > 800){ window.location.href = '/main'}
           updateWidth()
           return () => window.removeEventListener('resize', updateWidth)  
            }, [innerWidthProp, setInnerWidthProp])
    
    return (
        <div>
            hello mobile
        </div>
    )
}

export default Mobile