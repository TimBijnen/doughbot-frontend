import { ListGroup, Container, Row, Col } from "react-bootstrap"
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
        } else if ( data.type === 'oversold'  ) {
            addToast( `Oversold ${data['symbol']}\n\n`, { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 })
        } else if ( data.type === 'oversold_ignore' ) {
            addToast( `Oversold ${data['symbol']}\n\n`, { appearance: 'warning', autoDismiss: true, autoDismissTimeout: 500 })
        } else if ( data.type === 'candle_collector_notify' || data.type === '__notify' ) {
            addToast( data.title, { appearance: 'success', autoDismiss: true })
        } else {
            setCurrentState( currentState => ( { ...currentState, [ data.name.toLowerCase().replace(" ", "_") ]: data } ) )
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

    
  
    
    if ( Object.entries(currentState).length === 0 ) {
        return <div>Loading</div>
    }
    const _traders = traders.filter((t) => t.connected && t)
    return (
        <Container fluid>
                Current active {_traders.length} ({traders.length})
            <Row>
                <Col xs={12} md={6}>
                    <ListGroup as="ul">
                        { traders.filter((t) => t.connected && t).map( (t, i) => (
                        // { traders.sort( ( a, b ) => ((currentState[a.id]?.name > currentState[b.id]?.name)) ? 1 : -1 ).map( (t, i) => (
                            <TraderInfo key={t.id} { ...t } { ...currentState[t.id] } startTime={currentState[t.id]?.start_time} ordersFetched={ordersFetched[t.symbol]}>
                                {/* <div className="d-sm-none"> */}
                                    <Trade { ...currentState[t.id] } />
                                {/* </div> */}
                            </TraderInfo>
                        ) ) }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Trades