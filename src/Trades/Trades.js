import { Container, Row, Col, Button } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"
import axios from "axios"

const Trades = ( { simulationMode } ) => {
    const [ { socket } ] = useSocket()
    const [ currentState, setCurrentState ] = useState({})
    const [ traders, setTraders ] = useState( [] )
    
    const onNotify = useCallback( ( data ) => {
        if ( data.module === 'doughbot_simulator' ) {
            
        } else {
            setCurrentState( currentState => ( { ...currentState, [ data.symbol ]: data } ) )
        }
    }, [] )

    const restartTrader = (index) => {
        socket.emit("restart_trader", index)
    }

    const setActive = ( sid, active ) => {
        axios.post(`/api/doughbot/traders/${sid}/${ active ? 'deactivate' : 'activate' }`)
    }

    const onStatusUpdate = useCallback((status) => {
        setTraders(JSON.parse(status).traders)
        // console.log(status)
    }, [setTraders])

    useEffect( () => {
        if ( socket ) {
            if ( socket.connected ) {
                console.log("Connected!!")
                socket.on("notify_client", onNotify )
                socket.on("doughbot_status", onStatusUpdate )
                // socket.emit("get_doughbot_trader_status")
                // timer = setInterval(() => {
                //     axios.get("/api/doughbot/traders").then( ( { data: { data } } ) => {
                //         const traders = Object.entries( data ).map( ( [key, values] ) => ( { key, ...values } ) )
                //         setTraders( traders )
                //     } )
                // }, 1000)
            }
            if ( socket.connected ) {
                return () => {
                    socket.off( "notify_client" )
                    socket.off("doughbot_status")
                }
            }
        }
    }, [ socket, socket?.connected, onNotify, onStatusUpdate ] )

    const trades = Object.entries( currentState )

    return (
        <Container>
            <Row>
                { traders.length }
                { traders.map( t => (
                    <Col>
                    <div>
                        <div>{t.id}</div>
                        <div>{t.active ? "Active" : "Inactive"}</div>
                        <div>{t.connected ? "Connected" : "Disconnected" }</div>
                        <div>{t.status }</div>
                        <div>Symbol: {t.symbol }</div>
                    </div>
                    <Button onClick={ () => setActive( t.sid, t.active ) }>{t.active ? "Deactivate":"Activate"}</Button>
                    </Col>
                ))}
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