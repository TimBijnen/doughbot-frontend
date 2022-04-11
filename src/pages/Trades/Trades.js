import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../../__components/Socket"
import TraderInfo  from "./components/TraderInfo"
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

    // const setActive = ( sid, active ) => {
    //     axios.post(`/api/doughbot/traders/${sid}/${ active ? 'deactivate' : 'activate' }`)
    // }

    const onStatusUpdate = useCallback((status) => {
        setTraders(status)
    }, [setTraders])

    useEffect( () => {
        if ( socket ) {
            if ( socket.connected ) {
                console.log("Connected!!")
                socket.on("notify_client", onNotify )
                socket.on("traderhub_status", onStatusUpdate )
                axios.get(`${process.env.REACT_APP_API_URL}/doughbot/traders`).then( ( { data } ) => onStatusUpdate( data ) )
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
                { traders.map( t => (
                    <TraderInfo { ...t } />
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