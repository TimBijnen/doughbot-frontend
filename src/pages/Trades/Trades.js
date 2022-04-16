import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../../components/Socket"
import TraderInfo  from "./components/TraderInfo"
import Trade from "./Trade"
import axios from "axios"
import { useToasts } from "react-toast-notifications"

const Trades = ( { simulationMode } ) => {
    const { addToast } = useToasts()
    const [ { socket } ] = useSocket()
    const [ currentState, setCurrentState ] = useState({})
    const [ traders, setTraders ] = useState( [] )
    const [ ordersFetched, setOrdersFetched ] = useState( {} )
    
    const onNotify = useCallback( ( data ) => {
        if ( data.type === 'fetched_order' ) {
            setOrdersFetched( ( o ) => ( { ...o, [data.symbol]: (o[data.symbol] || 0) + 1} ) )
        } else if ( data.type === 'oversold' ) {
            addToast( `Oversold ${data['symbol']}\n\n`, { appearance: 'success', autoDismiss: true })
        } else if ( data.type === 'candle_collector_notify' || data.type === '__notify' ) {
            addToast( data.title, { appearance: 'success', autoDismiss: true })
        } else {
            setCurrentState( currentState => ( { ...currentState, [ data.symbol ]: data } ) )
        }
    }, [addToast] )
    
    const restartTrader = (index) => {
        socket.emit("restart_trader", index)
    }
    
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
                    socket.off("traderhub_status")
                }
            }
        }
    }, [ socket, socket?.connected, onNotify, onStatusUpdate ] )

    const trades = Object.entries( currentState )

    return (
        <Container>
            <Row>
                { traders.map( t => (
                    <TraderInfo { ...t } ordersFetched={ordersFetched[t.symbol]}/>
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