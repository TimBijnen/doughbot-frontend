import { Container, Card, Row, Col, Badge } from "react-bootstrap"
import moment from "moment"
import TradeOrder from "./Order"
import PriceIndicator from "./PriceIndicator"
import Chart from "../Chart"
import TradeLog from './Log'
import TradeActions from "./Actions"


const Trade = ( props ) => {
    // const [ currentState, setCurrentState ] = useState({})
    const currentState = props
    

    const startTime = moment.unix( currentState.start_time / 1000 )
    const closeTime = currentState.closed_at ? moment( currentState.closed_at ) : moment()
    // const now = closeTime.diff(startTime, 'seconds')
    // const nowMinute = Math.floor(now / 60)
    // const nowSecond = now % 60
    // const buyPercentage = ( parseFloat(currentState.buy_price / currentState.price_now * 100 - 100 ) || 0 ).toFixed( 4 ) 
    // const sellPercentage = ( parseFloat(currentState.price_now / currentState.sell_price * 100 - 100 ) || 0 ).toFixed( 4 ) 
    const { prices = {}, last_prices = [] } = currentState
    const price_now = prices.n || prices.s
    const price_levels = [
        { 'label': "Break even", 'value': prices.be },
        { 'label': "Cancel", 'value': prices.c, bg: 'danger' },
        { 'label': "Rebuy", 'value': prices.rb, bg: 'warning' },
        { 'label': "Buy", 'value': prices.b || prices.bp, bg: 'info' },
        { 'label': "Sell", 'value': prices.s, bg: 'success' },
    ]
    return (
                    <Card>
        <Container>
<TradeActions prices={ currentState.prices } />
            <Row>
                <Col xs={4}>
                    <div>{startTime.format("HH:mm:ss")} {closeTime.format("HH:mm:ss")}</div>
                    { prices.s && <div>Sell price { prices.s.toFixed(6) } ({(prices.s / prices.b).toFixed(5)})</div> }
                    { prices.be && <div>Break even price { prices.be.toFixed(6) } ({(prices.be / prices.b).toFixed(5)})</div> }
                    { prices.b && <div>Buy price { prices.b.toFixed(6) }</div> }
                    { prices.rb && <div>Rebuy price { prices.rb.toFixed(6) } ({(prices.rb / prices.b).toFixed(5)})</div> }
                    { prices.c && <div>Cancel price { prices.c.toFixed(6) } ({(prices.c / prices.b).toFixed(5)})</div> }
                </Col>
                <Col xs={8}>
                    <div className="d-flex">
                        <div className="me-2">
                            <Badge bg={currentState.total_bought_coins === currentState.total_sold_coins ? "success" : "info"}>{ currentState.symbol } { moment().format("HH:mm:ss")}</Badge>
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
                <Col xs={4}>
                    <TradeLog symbol={ currentState.symbol } />
                </Col>
                <Col xs={8}>
                        <PriceIndicator levels={price_levels} value={ price_now } />
                        
                        { (currentState.orders || []).filter((o)=>o.status !== "IDLE").sort( ( a, b ) => a.transactTime > b.transactTime ? 1 : -1).map( ( o ) => (
                            <TradeOrder { ...o } />
                        ) ) }
                        
                </Col>
            </Row>
        </Container>
                    </Card>
    )
}

export default Trade