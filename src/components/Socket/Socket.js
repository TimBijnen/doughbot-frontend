import { useEffect, useState } from "react"
import styled from "styled-components"
import {useSocket} from "."

const StatusBar = styled.div`
    width: 100%;
    font-size: 8px;
    line-height: 8px;
    text-align: right;
    color: white;
    background-color: var(--bs-${ ( { color } ) => color } )   
`

const Status = () => {
    const [ { connected, socket } ] = useSocket()
    const [ color, setColor ] = useState("warning")

    useEffect(() => {
        if ( socket ) {
            if ( connected ) {
                socket.emit("candle_collector")
                setColor("primary")
            } else if ( process.env.REACT_APP_ENV === "local" ) {
                setColor("info")
            }
        }
    }, [ socket, connected ])
    // console.log(process.env)

    return (
        <StatusBar className="h-100 w-100" color={ color }/>
    );
}

export default Status
