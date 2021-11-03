import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import { Bar, Led } from "../Icon"
import styled from "styled-components"
import moment from "moment"

const TradeItemRow = styled(Row)`
    &:hover {
        background-color: var(--bs-light);
        cursor: help;
        font-weight: bold;
    }
`

const TradeItemContainer = styled.div`
    .caption {
        font-size: 0.5rem;
        display: none;
    }
    &:hover .caption {
        display: block;
    }
`

const TradeItem = ( t: any ) => {
    const [ { connected, socket } ] = useSocket()
    const [ isNotified, setIsNotified ] = useState( false )
    
    
    useEffect( () => {
        // let timer: any
        const onNotify = ( data: any ) => {
            if ( data.order_id === t.order_id ) {
                // clearTimeout( timer )
                setIsNotified( true )
                // timer = setTimeout( () => {
                //     setIsNotified( false )
                // }, 600 )
            }
        }
        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    }, [ connected, socket, t.order_id ])

    const startTime = moment.utc( t.transactTime )
    console.log(startTime.format(), t.transactTime)
    const closeTime = t.closed_at ? moment( t.closed_at ) : moment()
    const now = closeTime.diff(startTime, 'seconds')
    const nowMinute = Math.floor(now / 60)
    const nowSecond = now % 60

    const timeValue = t.side === "SELL" ? 30 : 5
    const textClass = nowMinute >= timeValue ? "danger" : nowMinute >= timeValue / 1.5 ? "warning" : "success"
    const cancelled = t.status === "CANCELLED"
    return (
        <TradeItemContainer className="mb-2">
            <TradeItemRow title={ t.order_id }>
                <Col xs={ { span: t.side === "BUY" ? 5 : 4, offset: t.side === "BUY" ? 0 : 1 } } >
                    <Led className="d-inline-block" disabled={ cancelled } type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
                    { t.side }
                </Col>
                <Col xs={ 4 }>
                    <Bar market={ t.side === "MARKET" } cancelled={ cancelled } value={ t.executed_qty } target={ t.original_qty} />
                </Col>
                <Col xs={ 3 }>
                    <span className="small ms-4">
                        { t.closed_at ? (
                            <span className="text-black-50">
                                { nowMinute }m{ nowSecond }s<br />
                                
                            </span>
                        ) : (
                            <>
                                <span className={ `fw-bold text-${ textClass }`}>
                                    { nowMinute }m{nowSecond}s
                                </span>
                            </>
                        )}
                    </span>
                </Col>
            </TradeItemRow>
            <Row className="caption">
                <Col className="bg-light">
                    { t.reason }
                </Col>
            </Row>
        </TradeItemContainer>
    )
}

export default TradeItem