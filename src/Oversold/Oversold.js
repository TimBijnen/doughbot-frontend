import { Container } from "react-bootstrap"
import OversoldTimeGroup from "./TimeGroup"
import useOversold from "./hooks/oversold"
import moment from "moment"
// const data = [

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
//         "id": 4,
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
//         "id": 5,
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
//         "should_trade": true,
//         "has_active_trades": false,
//         "price_above_minimum": true,
//         "bollinger_oversold": false,
//         "bollinger_percentage": 2,
//         "trade_volume_24h": 2
//     },
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
//         trades: [{ id: 1, type: "SELL", executed_qty: 1, original_qty: 4 }],
//         should_trade: true,
//     },
//     {   
//         "id": 6,
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
//         "id": 7,
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
//         "id": 8,
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
            e.trades = t.filter( t => t.candle_id === e.id ).sort( ( a, b ) => a.type === "BUY" ? -2 : a.type === "SELL" ? -1 : 0 )
            
            grouped[ e.opentime ] = [ e, ...grouped[ e.opentime ] ]
        });
        return Object.entries( grouped ).map( ( [key, values] ) => {
            return [ key, values.sort( ( a, b ) => (a.trades || []).length < (b.trades || []).length ? 1 : -1) ]
        })
    }

    const [ { items, trades, isLoading, updateTime } ] = useOversold()
    const sorted = groupData( items, trades )

    return (
        <Container>
            Updated at { moment.unix(updateTime/1000).format("DD-MM-YYYY HH:mm:ss") } { isLoading && "Loading..." }
            { sorted.map( ( [time, items ] ) => (
                <OversoldTimeGroup key={ time } time={ time } items={ items } />
            ))}
        </Container>
    )
}

export default Oversold