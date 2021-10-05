import { Container } from "react-bootstrap"
import OversoldTimeGroup from "./TimeGroup"
import useOversold from "./hooks/oversold"

// const data = [
//     {   
//         "id": 1,
//         "coin": "NOPEBTC",
//         "opentime": 123,
//         "date": "21-09-21 16:42:00",
//         "open_price": 123,
//         "close_price": 123,
//         "high": 123,
//         "low": 123,
//         "volume": 123,
//         "K": 123,
//         "stoch_oversold": true,
//         "has_active_trades": false,
//         "price_above_minimum": true,
//         "bollinger_oversold": false,
//         "bollinger_percentage": 2,
//         "trade_volume_24h": 2,
//         trades: [{ id: 1, type: "SELL" }],
//     },
//     {   
//         "id": 2,
//         "coin": "NOPEBTC",
//         "opentime": 123,
//         "date": "21-09-21 16:42:00",
//         "open_price": 123,
//         "close_price": 123,
//         "high": 123,
//         "low": 123,
//         "volume": 123,
//         "K": 123,
//         "stoch_oversold": true,
//         "has_active_trades": false,
//         "price_above_minimum": true,
//         "bollinger_oversold": false,
//         "bollinger_percentage": 2,
//         "trade_volume_24h": 2
//     },
//     {   
//         "id": 3,
//         "coin": "NOPEBTC",
//         "opentime": 1283,
//         "date": "21-09-21 16:42:00",
//         "open_price": 123,
//         "close_price": 123,
//         "high": 123,
//         "low": 123,
//         "volume": 123,
//         "K": 123,
//         "stoch_oversold": true,
//         "has_active_trades": false,
//         "price_above_minimum": true,
//         "bollinger_oversold": false,
//         "bollinger_percentage": 2,
//         "trade_volume_24h": 2
//     }
// ]

const Oversold = () => {
    const groupData = ( d, t ) => {
        const grouped = {}
        d.forEach(( e ) => {
            if ( !grouped[ e.opentime ] ) {
                grouped[ e.opentime ] = []
            }
            const item = e
            e.trades = t.filter( t => t.candle_id === e.id || t.id === e.trade_id )
            if ( e.trades.length > 0 ) {
                e.trades = [ ...e.trades, ...t.filter( a => e.trades.find(x => x.id === a.trade_id) ? a : null )]
            }
            
            grouped[ e.opentime ] = [ e, ...grouped[ e.opentime ] ]
        });
        return Object.entries( grouped )
    }

    const [ { items, trades } ] = useOversold()
    const sorted = groupData( items, trades )

    return (
        <Container>
            { sorted.map( ( [time, items ] ) => (
                <OversoldTimeGroup time={ time } items={ items } />
            ))}
            {/* { data.map( d => (
                <OversoldItem { ...d } />
            ) ) } */}
        </Container>
    )
}

export default Oversold