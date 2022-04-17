import { ListGroup, Container, Row } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../../components/Socket"
import TraderInfo  from "./components/TraderInfo"
import Trade from "./Trade"
import axios from "axios"
import { useToasts } from "react-toast-notifications"

const Trades = () => {
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
            setCurrentState( currentState => ( { ...currentState, [ data.name ]: data } ) )
        }
    }, [addToast] )
    
    
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
    if ( !currentState ) {
        return <div>Loading</div>
    }
    // debugger
    const connectedTraders = traders.filter( ( a ) => a.connected ? a : null)
    const disconnectedTraders = traders.filter( ( a ) => !a.connected ? a : null)
    const activeTraders = connectedTraders.filter( ( a ) => a.active ? a : null)
    const inactiveTraders = connectedTraders.filter( ( a ) => !a.active ? a : null)

    return (
        <Container>
            <ListGroup as="ul">
                { activeTraders.map( (t, i) => (
                    <>
                    <TraderInfo { ...t } ordersFetched={ordersFetched[t.symbol]}/>
                    <ListGroup.Item>
                        <div style={{position: 'absolute'}}>
                            <Trade { ...currentState[t.id] } />
                        </div>
                    </ListGroup.Item>
                    </>
                ))}
            </ListGroup>

            <ListGroup>
                { inactiveTraders.map( t => (
                    <>
                    <TraderInfo { ...t } ordersFetched={ordersFetched[t.symbol]}>
                        
                            <Trade { ...currentState[t.id] } />
                        
                        </TraderInfo>
                    {/* <div style={{marginBottom: 200}}>
                    </div> */}
                    </>
                ))}
            </ListGroup>

            <h4>Disconnected traders</h4>
            <ListGroup>
                { disconnectedTraders.map( t => (
                    <TraderInfo { ...t } ordersFetched={ordersFetched[t.symbol]}/>
                ))}
            </ListGroup>
            <Row>
            </Row>
            <Row>
                {/* { trades.map( ([s, t], i) => (
                    <Col xs={12}>
                        
                    </Col>
                ) ) } */}
            </Row>
        </Container>
    )
}

export default Trades