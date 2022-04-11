import { Card, Col, Badge } from "react-bootstrap"

const TradeInfo = ( { symbol, sell, market } ) => {
    let bg = "secondary"

    if ( sell > market ) {
        bg = "primary"
    } 
    if ( sell === market && sell !== 0) {
        bg = "warning"
    }
    if ( sell / ( sell + market ) > 0.8 && sell + market > 10) {
        bg = "success"
    }
    if ( sell / ( sell + market ) > 0.7 && sell + market > 20) {
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
                    Sell: { sell }<br />
                    Market: { market }<br />
                </div>
            </Card>
        </Col>  
    )
}

export default TradeInfo