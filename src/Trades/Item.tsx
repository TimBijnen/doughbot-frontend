import { Badge, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import { Bar, Led } from "../Icon"

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
            <Col xs={ { span: t.type === "SELL" ? 2 : 3, offset: t.type === "SELL" ? 1 : 0 } } >
                { t.type }
            </Col>
            <Col xs={ 3 }>
                <Bar value={ t.executed_qty } target={ t.original_qty} />
            </Col>
            <Col xs={ 3 }>
                <span className="small ms-4">{ t.order_id }</span>
            </Col>
            <Col xs={ 2 }>
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
            <Col xs={ 1 }>
                <Led disabled={ t.cancelled } type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
            </Col>
        </Row>
    )
}

export default TradeItem