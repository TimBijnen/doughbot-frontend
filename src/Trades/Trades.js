import { Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"

const Trades = () => {

    const [ { connected, socket } ] = useSocket()
    const [ currentState, setCurrentState ] = useState({})
    useEffect( () => {
        // let timer
        const onNotify = ( data ) => {
        //     // if ( data.order_id === t.order_id ) {
        //     clearTimeout( timer )
            // setIsNotified( true )
        //     console.log(data)
            setCurrentState( { ...currentState, [ data.symbol ]: data } )
        //     timer = setTimeout( () => {
        //         setIsNotified( false )
        //     }, 600 )
        //     // }
        }
        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    } )

    const trades = Object.entries( currentState )
    // debugger
    return (
        <>
            <Container>
                <Row>
                    { trades.map( ([s, t]) => (
                        <Col xs={12} md={6} lg={6}>
                            <Trade { ...t } />
                        </Col>
                    ) ) }
                </Row>
            </Container>
        </>
    )
}

export default Trades