import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"

const Trades = () => {
    const [ { connected, socket } ] = useSocket()
    const [ currentState, setCurrentState ] = useState({})
    useEffect( () => {
        const onNotify = ( data ) => {
            console.log(data)
            if ( data.module === 'doughbot_simulator' ) {
                
            } else {
                setCurrentState( { [ data.symbol ]: data } )
            }
        }

        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    }, [ connected, socket ] )

    const trades = Object.entries( currentState )

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