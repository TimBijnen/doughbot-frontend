import { Card } from "react-bootstrap"
import { Led } from "../Icon"

const ItemLine = ( { coin, stoch_oversold, has_active_trades, price_above_minimum, bollinger_oversold, bollinger_percentage, trade_volume_24h } ) => {
    return (
        <div className="d-flex">
            { coin }
            <Led isOn={ stoch_oversold } />
            <Led isOn={ has_active_trades } />
            <Led isOn={ price_above_minimum } />
            <Led isOn={ bollinger_oversold } />
            <Led isOn={ bollinger_percentage } />
            <Led isOn={ trade_volume_24h } />
            
            {/* { stoch_oversold ? "YES" : "NO" } */}
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