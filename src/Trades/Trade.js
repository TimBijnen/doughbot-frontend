import { Container, Card, Row, Col, Badge, Table } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import { Bar, Led } from "../Icon"
import styled from "styled-components"
import moment from "moment"
import TradeOrder from "./Order"
import PriceIndicator from "./PriceIndicator"
import { preProcessFile } from "typescript"

const Trade = () => {
    const [ { connected, socket } ] = useSocket()
    const [ isNotified, setIsNotified ] = useState( false )
    const [ currentState, setCurrentState ] = useState({})
    
    useEffect( () => {
        let timer
        const onNotify = ( data ) => {
            // if ( data.order_id === t.order_id ) {
            clearTimeout( timer )
            setIsNotified( true )
            console.log(data)
            setCurrentState(data)
            timer = setTimeout( () => {
                setIsNotified( false )
            }, 600 )
            // }
        }
        if ( connected ) {
            socket.on("notify_client", onNotify )
            return () => { socket.off( "notify_client" )}
        }
    }, [ connected, socket ])

    // const startTime = moment( t.created_at )
    // const closeTime = t.closed_at ? moment( t.closed_at ) : moment()
    // const now = closeTime.diff(startTime, 'seconds')
    // const nowMinute = Math.floor(now / 60)
    // const nowSecond = now % 60
    const buyPercentage = ( parseFloat(currentState.buy_price / currentState.price_now * 100 - 100 ) || 0 ).toFixed( 4 ) 
    const sellPercentage = ( parseFloat(currentState.price_now / currentState.sell_price * 100 - 100 ) || 0 ).toFixed( 4 ) 
    const { prices = {} } = currentState
    const price_now = prices.n || prices.s
    const price_levels = [
        { 'label': "Break even", 'value': prices.be },
        { 'label': "Cancel", 'value': prices.c, bg: 'danger' },
        { 'label': "Rebuy", 'value': prices.rb, bg: 'warning' },
        { 'label': "Buy", 'value': prices.b || prices.bp, bg: 'info' },
        { 'label': "Sell", 'value': prices.s, bg: 'success' },
    ]
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Badge>{ currentState.symbol }
                        
                        <Led className="d-inline-block" type="info" isOn={ isNotified } title={ "Indicator for trade observer"} />
                        </Badge>
                        <Table className="small" style={{ fontFamily: 'var(--bs-font-monospace)' }}>
                            <thead>
                                <th>Buy price</th>
                                {/* <th>Diff</th> */}
                                <th className="text-center">Current price</th>
                                {/* <th>Diff</th> */}
                                <th>Sell price</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-end">
                                        <div><span className="float-start">₿</span>{ prices.b || 0 }</div>
                                        <div><span className="float-start">%</span>{ buyPercentage || 0 }</div>
                                    </td>
                                    {/* <td></td> */}
                                    <td className="text-center">{ price_now }</td>
                                    <td className="text-start">
                                        <div>{ prices.s }<span className="float-end">₿</span></div>
                                        <div>{ sellPercentage }<span className="float-end">%</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <PriceIndicator levels={price_levels} value={ price_now } />
                        
                        <div>Break even price { prices.be }</div>
                        <div>Amount of buy orders { currentState.b_orders }</div>
                        <div>Amount of sell orders { currentState.s_orders }</div>
                        { (currentState.orders || []).filter((o)=>o.status).map( ( o ) => (
                            <TradeOrder { ...o } />
                        ) ) }
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Trade