import { useEffect } from "react"
import styled from "styled-components"
import useSocket from "./hooks/socket"

const StatusBar = styled.div<{connected:boolean}>`
    height: 10px;
    width: 100%;
    background-color: var(--bs-${ ( { connected }: any ) => connected ? "primary" : "warning" } )   
`

const Status = () => {
    const [ { connected } ] = useSocket()
    
    return (
        <StatusBar connected={ connected }/>
    );
}

export default Status
