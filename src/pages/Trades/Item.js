import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../../components/Socket"
import { Bar, Led } from "../../components/Icon"
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

const TradeItem = ( t ) => {
    const [ { connected, socket } ] = useSocket()
    const [ isNotified, setIsNotified ] = useState( false )
    
    
    useEffect( () => {
        let timer
        const onNotify = ( data ) => {
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

    const startTime = moment( t.created_at )
    const closeTime = t.closed_at ? moment( t.closed_at ) : moment()
    const now = closeTime.diff(startTime, 'seconds')
    const nowMinute = Math.floor(now / 60)
    const nowSecond = now % 60

    const timeValue = t.type === "SELL" ? 30 : 5
    const textClass = nowMinute >= timeValue ? "danger" : nowMinute >= timeValue / 1.5 ? "warning" : "success"
    return (
        <TradeItemContainer className="mb-2">
            <TradeItemRow title={ t.order_id }>
                <Col xs={ { span: t.type === "BUY" ? 5 : 4, offset: t.type === "BUY" ? 0 : 1 } } >
                    <Led className="d-inline-block" disabled={ t.cancelled } type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
                    { t.type }
                </Col>
                <Col xs={ 4 }>
                    <Bar market={ t.type === "MARKET" } cancelled={ t.cancelled } value={ t.executed_qty } target={ t.original_qty} />
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