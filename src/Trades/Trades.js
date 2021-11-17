import { Container, Row, Col, Button } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"
// import axios from "axios"
import useTrades from "./hooks/trades"

const Trades = ( { simulationMode } ) => {
    const [ { socket } ] = useSocket()
    const [ state, { toggleActive } ] = useTrades()
    const [ currentState, setCurrentState ] = useState({})
    
    
    const onNotify = useCallback( ( data ) => {
        if ( data.module === 'doughbot_simulator' ) {
            
        } else {
            setCurrentState( currentState => ( { ...currentState, [ data.symbol ]: data } ) )
        }
    }, [] )

    const restartTrader = (index) => {
        socket.emit("restart_trader", index)
    }

    useEffect( () => {
        if ( socket ) {
            if ( socket.connected ) {
                socket.on("notify_client", onNotify )
                socket.emit("get_doughbot_trader_status")
            }
            if ( socket.connected ) {
                return () => { socket.off( "notify_client" )}
            }
        }
    }, [ socket, socket?.connected, onNotify ] )

    const trades = Object.entries( currentState )

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Button onClick={ toggleActive }>{ state.settings?.is_active ? "Deactivate trader" : "Activate trader" }</Button>
                </Col>
            </Row>
            <Row>
                { trades.map( ([s, t], i) => (
                    <Col xs={12}>
                        <Trade { ...t } index={ i } restartTrader={ restartTrader } simulationMode={ simulationMode } />
                    </Col>
                ) ) }
            </Row>
        </Container>
    )
}

export default Trades