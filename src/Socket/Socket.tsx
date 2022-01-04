import styled from "styled-components"
import useSocket from "./hooks/socket"

const StatusBar = styled.div<{color:string}>`
    height: 10px;
    width: 100%;
    background-color: var(--bs-${ ( { color } ) => color } )   
`

const Status = () => {
    const [ { connected } ] = useSocket()
    let color = "warning"
    if ( connected ) {
        color = "primary"
    } else if ( process.env.REACT_APP_ENV === "local" ) {
        color = "info"
    }
    console.log(process.env)

    return (
        <StatusBar color={ color }/>
    );
}

export default Status
