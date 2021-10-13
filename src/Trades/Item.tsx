import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import { Bar, Led } from "../Icon"

const TradeItem = ( t: any ) => {
    const [ { connected, socket } ] = useSocket()
    const [ isNotified, setIsNotified ] = useState( false )
    
    
    useEffect( () => {
        let timer: any
        const onNotify = ( data: any ) => {
            if ( data.order_id === t.order_id ) {
                clearTimeout( timer )
                setIsNotified( true )
                timer = setTimeout( () => {
                    setIsNotified( false )
                }, 600 )
            }
        }
        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    }, [ connected, socket, t.order_id ])

    return (
        <Row className="mb-2">
            <Col xs={ { span: t.type === "BUY" ? 5 : 4, offset: t.type === "BUY" ? 0 : 1 } } >
                <Led className="d-inline-block" disabled={ t.cancelled } type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
                { t.type }
            </Col>
            <Col xs={ 4 }>
                <Bar cancelled={ t.cancelled } value={ t.executed_qty } target={ t.original_qty} />
            </Col>
            <Col xs={ 3 }>
                <span className="small ms-4">{ t.order_id }</span>
            </Col>
        </Row>
    )
}

export default TradeItem