import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"

const Trades = () => {

    const [ { connected, socket } ] = useSocket()
    const [ currentState, setCurrentState ] = useState({})
    const [ execution, setExecution ] = useState({})
    useEffect( () => {
        const onNotify = ( data ) => {
            setCurrentState( { ...currentState, [ data.symbol ]: data } )
        }
        // const onExecute = ( data ) => {
        //     setExecution( { ...execution, [ data.symbol ]: data.details } )
        // }

        if ( connected ) {
            socket.on("notify_client", onNotify )
            // socket.on("did_execute_client", onExecute )
            return () => { socket.off( "notify_client" )}
        }
    } )

    const trades = Object.entries( currentState )
    // const executions = Object.entries( execution )
    // debugger
    return (
        <>
            <Container>
                <Row>
                    { trades.map( ([s, t]) => (
                        <Col xs={12}>
                            <Trade { ...t } />
                        </Col>
                    ) ) }
                </Row>
            </Container>
        </>
    )
}

export default Trades