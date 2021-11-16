import { Container, Row, Col, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"
// import axios from "axios"
import useTrades from "./hooks/trades"

const Trades = () => {
    const [ { socket } ] = useSocket()
    const [ state, { toggleActive } ] = useTrades()
    const [ currentState, setCurrentState ] = useState({})
    
    
    const onNotify = ( data ) => {
        if ( data.module === 'doughbot_simulator' ) {
            
        } else {
            setCurrentState( { [ data.symbol ]: data } )
        }
    }

    useEffect( () => {
        if ( socket ) {
            console.log("Listen notigy")
            socket.on("notify_client", onNotify )
        }
        if ( socket ) {
            return () => { socket.off( "notify_client" )}
        }
    }, [ socket ] )

    const trades = Object.entries( currentState )

    return (
        <>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Button onClick={ toggleActive }>{ state.settings?.is_active ? "Deactivate trader" : "Activate trader" }</Button>
                    </Col>
                </Row>
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