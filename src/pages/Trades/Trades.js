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

    
    let groupedByVersion = useCallback( () => {
        return traders.reduce( ( a, b ) => {
            if ( !a[ b.trader_version ] ) {
                a[ b.trader_version ] = []
            }
            return { ...a, [ b.trader_version ]: [ ...a[ b.trader_version ], b ] }
        }, {} )
    }, [traders])
    
    if ( Object.entries(currentState).length === 0 ) {
        return <div>Loading</div>
    }
    
    
    return (
        <Container fluid>
            <Row>
                <Col xs={12} sm={6} md={4}>
                    { Object.entries( groupedByVersion() ).map( ( [version, _traders] ) => {
                        return (
                            <>
                                <h6>{version}</h6>
                                <ListGroup as="ul">
                                    { _traders.sort( ( a, b ) => ((currentState[a.id]?.start_time > currentState[b.id]?.start_time)) ? 1 : -1 ).map( (t, i) => (
                                        <TraderInfo key={t.id} { ...t } { ...currentState[t.id] } startTime={currentState[t.id]?.start_time} ordersFetched={ordersFetched[t.symbol]}>
                                            <div className="d-sm-none">
                                                <Trade { ...currentState[t.id] } />
                                            </div>
                                        </TraderInfo>
                                    ) ) }
                                </ListGroup>
                            </>
                        )
                    } ) }
                </Col>
                <Col className="d-none d-sm-block" sm={6} md={8}>
                    prin
                </Col>
            </Row>
        </Container>
    )
}

export default Trades