import { FC } from "react"

interface PopupMenuProps { children: JSX.Element }

const PopupMenu: FC<PopupMenuProps> = (props): JSX.Element => {
    return (
        <>

            <div className="main">
                {props.children}
            </div>
            <div className='overlay'></div>
            <style jsx>
                {`
                .overlay{
                    top: 0;
                    left: 0;
                    display: flex;
                    position: fixed;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.8);
                    z-index: 6;
                    animation: fade 1s;
                }
                .main{
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    width: 80vw;
                    height: 70vh;
                    top: 15vh;
                    left: 10vw;
                    background-color: rgba(30,32,38,1);
                    z-index: 10;
                    animation: openmenu 0.4s;
                }

                @keyframes openmenu {
                    from {
                         width: 0vw;
                         transform: translateX(50vw);

                    }
                    to {
                        width: 80vw;
                        transform: translateX(0px);
                    }
                }

                @keyframes fade {
                    from {opacity: 0}
                    to {opactity: 0}
                }
                `}
            </style>
        </>

    )
}

export default PopupMenu