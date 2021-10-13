import { Badge, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import { Led } from "../Icon"

const TradeItem = ( t: any ) => {
    const [ { connected, socket } ] = useSocket()
    const [ isNotified, setIsNotified ] = useState( false )
    let timer: any

    const onNotify = ( data: any ) => {
        if ( data.order_id === t.order_id ) {
            clearTimeout( timer )
            setIsNotified( true )
            timer = setTimeout( () => {
                setIsNotified( false )
            }, 800 )
        }
    }

    useEffect( () => {
        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    }, [ connected ])

    return (
        <Row className="mb-2">
            <Col className="border rounded" sm={ { span: 9, offset: t.type === "SELL" ? 3 : 0 } } style={ { textAlign: t.type === "SELL" ? "right" : "left", backgroundColor: t.type === "SELL" ? "#0dcaf01f" : "#1987541f" }}>
                <Led disabled={ t.cancelled } type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
                { `${ t.order_id } ${ t.type } ${ t.executed_qty || 0 } / ${ t.original_qty }` }
                {
                    t.original_qty === t.executed_qty ? (
                        <Badge className="float-end" pill bg="success">FILLED</Badge>
                    ) : (
                        t.cancelled ? (
                            <Badge className="float-end" pill bg="danger">CANCELLED</Badge>
                        ) : (
                            <Badge className="float-end" pill bg="info">ACTIVE</Badge>
                        )
                    )
                }
            </Col>
        </Row>
    )
}

export default TradeItem