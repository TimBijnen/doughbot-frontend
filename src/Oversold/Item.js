import { Card, Badge } from "react-bootstrap"
import { Led } from "../Icon"

const ItemLine = ( { coin, stoch_oversold, has_active_trades, price_above_minimum, bollinger_oversold, bollinger_percentage, close_price_filter, should_trade } ) => {
    return (
        <div className="d-flex">
            <Led isOn={ close_price_filter } />
            <div className="d-flex w-100">
                <div style={ { fontWeight: should_trade ? "bold" : "normal" } }>
                    { coin }
                </div>
                { should_trade && (
                    <Badge>Trade!</Badge>
                ) }
            </div>
            <div className={ bollinger_percentage >= 1 && bollinger_percentage <= 5 ? "text-success pull-right" : "text-danger pull-right"}>
                {' '}
                { bollinger_percentage?.toFixed(2) }%
            </div>
        </div>
    )
}

const OversoldItem = ( { trades, ...item } ) => {
    
    return (
        trades?.length > 0 ? (
            <Card className="text-black">
                <Card.Body>
                    <ItemLine { ...item } />
                    { trades.map( t => (
                        <div>
                            { t.id }
                            { t.type }
                        </div>
                    )) }
                </Card.Body>
            </Card>
        ) : (
            <ItemLine { ...item } />
        )
    )
}

export default OversoldItem