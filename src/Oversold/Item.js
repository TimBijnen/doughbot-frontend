import { Card } from "react-bootstrap"
import { Led } from "../Icon"

const ItemLine = ( { coin, stoch_oversold, has_active_trades, price_above_minimum, bollinger_oversold, bollinger_percentage, trade_volume_24h } ) => {
    return (
        <div className="d-flex">
            <Led isOn={ trade_volume_24h } />
            <div className="d-flex w-100">
                { coin }
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