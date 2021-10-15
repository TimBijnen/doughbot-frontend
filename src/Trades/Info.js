import { Card, Col, Badge } from "react-bootstrap"

const TradeInfo = ( { symbol, orders } ) => {
    const active = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 1 ? 1 : 0), 0)
    const sell = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 2 ? 1 : 0), 0)
    const market = Object.entries(orders).reduce( ( result, [cid, trades] ) => result + (trades.length === 3 ? 1 : 0), 0)
    let bg = "secondary"
    // if ( sell + market === 0 ) {
    //     return null
    // }
    if ( sell > market ) {
        bg = "primary"
    } 
    if ( sell === market && sell !== 0) {
        bg = "warning"
    }
    if ( sell / ( sell + market ) > 0.8 && sell + market > 10) {
        bg = "success"
    }
    if ( market > sell ) {
        bg = "danger"
    }
    return (
        <Col xs={6} sm={4} md={3} lg={2} className="mb-2">
        <Card>
    <div className="d-inline-block mb-2">
        <b>{ symbol } ( { (( sell / ( sell + market ) * 100 ) || 0).toFixed( 2 ) }% )</b><Badge bg={ bg } className="float-end">{ sell + market }</Badge><br />
        Active: { active }<br />
        Sell: { sell }<br />
        Market: { market }<br />
    </div>
                </Card>
</Col>
    )
}

export default TradeInfo