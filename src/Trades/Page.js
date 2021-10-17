import useTrades from "./hooks/trades"
import { Table, Container, Row } from "react-bootstrap"
import { Dot } from "../Icon"
import TradeInfo from "./Info"

const Leds = ( ( { a, b, c, type } ) => type >= 0 ? (
    <div>
        <Dot isOn={ type % 2 === 1 }/>
        <Dot isOn={ parseInt(type / 2) % 2 === 1 }/>
        <Dot isOn={ parseInt(type / 4) % 2 === 1 }/>
    </div>
): (
    <div>
        <Dot isOn={ a }/>
        <Dot isOn={ b }/>
        <Dot isOn={ c }/>
    </div>
))

const Page = () => {
    const [ { items, sentiment, isLoading } ] = useTrades()
    // const grouped = {}
    if ( isLoading ) {
        return <div>Loading</div>
    }
    
    // const perCandle = {}
    // items.forEach( ( i ) => {
    //     if ( !perCandle[ i.candle_id ] ) {
    //         perCandle[ i.candle_id ] = []
    //     }
    //     if ( !grouped[ i.symbol ] ) {
    //         grouped[ i.symbol ] = {}
    //     }
    //     if ( !grouped[ i.symbol ][ i.candle_id ] ) {
    //         grouped[ i.symbol ][ i.candle_id ] = []
    //     } 
    //     grouped[ i.symbol ][ i.candle_id ] = [ ...grouped[ i.symbol ][ i.candle_id ], i ]
    //     perCandle[ i.candle_id ] = [ ...perCandle[ i.candle_id ], i ]
    // } )
    // const symbols = Object.entries(grouped)
    // const _items = Object.entries( perCandle ).reduce( ( result, [ candle_id, item ] ) => [ ...result, { candle_id, type: item[item.length - 1].type, one_h: item[0].one_h, four_h: item[0].four_h, twofour_h: item[0].twofour_h } ], [] ) 
    
    // const amtOfSellOrders = _items.filter( ( i ) => i.type === "SELL" ).length
    // const amtOfMarketOrders = _items.filter( ( i ) => i.type === "MARKET" ).length
    // const amtOfOrders = amtOfMarketOrders + amtOfSellOrders
    
    // const amtOfSellOrdersNone = _items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    // const amtOfSellOrders1h = _items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    // const amtOfSellOrders4h = _items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    // const amtOfSellOrders24h = _items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h < 100 && i.twofour_h >= 100 ).length

    // const amtOfSellOrders1h4h = _items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    // const amtOfSellOrders1h24h = _items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    // const amtOfSellOrders4h24h = _items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    // const amtOfSellOrders1h4h24h = _items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    
    
    // const amtOfMarketOrdersNone = _items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    // const amtOfMarketOrders1h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    // const amtOfMarketOrders4h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    // const amtOfMarketOrders24h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    // const amtOfMarketOrders1h4h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    // const amtOfMarketOrders1h24h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    // const amtOfMarketOrders4h24h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    // const amtOfMarketOrders1h4h24h = _items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    
    if ( sentiment ) {
        return (
                <div className="w-100">
                    Total orders: {sentiment.total.sell + sentiment.total.market}<br />
                    Total sell orders: {sentiment.total.sell}<br />
                    Total market orders: {sentiment.total.market}<br />
                    Sell orders 
                        <Table>
                            <thead>
                                <th>
                                    Sentiment
                                </th>
                                <th>
                                    Sell
                                </th>
                                <th>
                                    Market
                                </th>
                                <th>
                                    Total
                                </th>
                                <th>
                                    Percentage
                                </th>
                            </thead>
                            <tbody>
                    { sentiment.types.map( ( s, i ) => (
                                <tr>
                                    <td>
                                        <Leds type={ i }/>
                                    </td>
                                    <td>
                                        { s.sell } 
                                    </td>
                                    <td>
                                        { s.market } 
                                    </td>
                                    <td>
                                        { s.total } 
                                    </td>
                                    <td>
                                        { ( s.sell / s.total * 100 ).toFixed( 2 ) } %
                                    </td>
                                </tr>
                            
                    ) ) }
                    </tbody>
                    </Table>
                    <hr />
                    <Container fluid>
                        <Row>
                                { sentiment.coins.map( ( coin ) => (
                                    <TradeInfo symbol={ coin.symbol } sell={ coin.sell } market={ coin.market } />
                                ) ) }
                        </Row>
                    </Container>
                </div>
        )
    }
    return null

}

export default Page