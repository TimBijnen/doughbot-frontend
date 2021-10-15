import { Card, Col } from "react-bootstrap"

const TradeInfo = ( { symbol, orders } ) => {
    const active = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 1 ? 1 : 0), 0)
    const sell = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 2 ? 1 : 0), 0)
    const market = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 3 ? 1 : 0), 0)
    return (
        <Col xs={6} sm={4} md={3} lg={2} className="mb-2">
        <Card>
    <div className="d-inline-block mb-2">
        <b>{ symbol } ( { sell / (sell + market ) * 100 }% )</b><br />
        Active: { active }<br />
        Sell: { sell }<br />
        Market: { market }<br />
    </div>
                </Card>
</Col>
    )
}

export default TradeInfo