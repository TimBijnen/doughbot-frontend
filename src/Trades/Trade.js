import { Card, Row, Col, Badge, Button } from "react-bootstrap"
import moment from "moment"
import TradeOrder from "./Order"
import PriceIndicator from "./PriceIndicator"
import Chart from "../Chart"
import TradeLog from './Log'
import TradeActions from "./Actions"
import { Time } from "../Components"
import Price from "./components/Price"

const Trade = ( { simulationMode, restartTrader, index, ...props } ) => {
    const currentState = props
    const startTime = moment.unix( currentState.start_time / 1000 )
    const closeTime = currentState.closed_at ? moment( currentState.closed_at ) : moment()
    const { prices = {}, last_prices = [] } = currentState
    const price_now = prices.n || prices.s
    const price_levels = [
        { 'label': "break_even", 'value': prices.be },
        { 'label': "cancel", 'value': prices.c, bg: 'danger' },
        { 'label': "rebuy", 'value': prices.rb, bg: 'warning' },
        { 'label': "buy", 'value': prices.b || prices.bp, bg: 'info' },
        { 'label': "sell", 'value': prices.s, bg: 'success' },
    ]
    console.log(currentState.total_bought_coins === currentState.total_sold_coins)
    const isFinished = (currentState.total_bought_coins === currentState.total_sold_coins) && currentState.total_bought_coins > 0
    return (
        <Card>
            <Card.Header>
                { currentState.symbol } 
                <Badge className="float-end" bg={ isFinished ? "success" : "info" }><Time className="float-end" start={ startTime } end={ closeTime } /></Badge>
            </Card.Header>
            <Card.Body>
                { simulationMode && <TradeActions prices={ currentState.prices } isFinished={ isFinished }/> }
                <Row>
                    <Col xs={4}>
                        <TradeLog symbol={ currentState.symbol } />
                    </Col>
                    <Col xs={8}>
                        <div className="d-flex">
                            <div className="me-2">
                            </div>
                            <div className="small w-100">
                                { `Buy: ${ prices.b || 0 }`}
                                { ' ' }
                                { `Sell: ${ prices.s || 0 }`}
                            </div>
                            <div className="float-end text-nowrap">
                                <Badge variant={ 'outline' } bg={ currentState.buy_active ? "success" : "secondary" }>BUY</Badge>
                                <Badge bg={ currentState.sell_active ? "success" : "secondary" }>SELL</Badge>
                            </div>
                        </div>
                        <Chart prices={ last_prices } levels={ price_levels } />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className="small">
                        <Price { ...prices } />
                    </Col>
                    <Col xs={8}>
                        <PriceIndicator levels={price_levels} value={ price_now } />
                        
                        { (currentState.orders || []).filter((o)=>o.status !== "IDLE").sort( ( a, b ) => a.transactTime > b.transactTime ? 1 : -1).map( ( o ) => (
                            <TradeOrder { ...o } />
                        ) ) }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Trade