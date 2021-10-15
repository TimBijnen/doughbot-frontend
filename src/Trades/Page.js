import useTrades from "./hooks/trades"
import { Container, Row } from "react-bootstrap"
import { Led } from "../Icon"
import TradeInfo from "./Info"

const Leds = ( ( { a, b, c } ) => (
    <>
        <Led isOn={ a }/>
        <Led isOn={ b }/>
        <Led isOn={ c }/>
    </>
))

const Page = () => {
    const [ { items, isLoading } ] = useTrades()
    const grouped = {}
    if ( isLoading ) {
        return <div>Loading</div>
    }
    
    items.forEach( ( i ) => {
        if ( !grouped[ i.symbol ] ) {
            grouped[ i.symbol ] = {}
        }
        if ( !grouped[ i.symbol ][ i.candle_id ] ) {
            grouped[ i.symbol ][ i.candle_id ] = []
        } 
        grouped[ i.symbol ][ i.candle_id ] = [ ...grouped[ i.symbol ][ i.candle_id ], i ]

    } )
    const symbols = Object.entries(grouped)

    const amtOfSellOrders = items.filter( ( i ) => i.type === "SELL" ).length
    const amtOfMarketOrders = items.filter( ( i ) => i.type === "MARKET" ).length
    const amtOfOrders = amtOfMarketOrders + amtOfSellOrders
    
    const amtOfSellOrdersNone = items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    const amtOfSellOrders1h = items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    const amtOfSellOrders4h = items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    const amtOfSellOrders24h = items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h < 100 && i.twofour_h >= 100 ).length

    const amtOfSellOrders1h4h = items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    const amtOfSellOrders1h24h = items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    const amtOfSellOrders4h24h = items.filter( ( i ) => i.type === "SELL" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    const amtOfSellOrders1h4h24h = items.filter( ( i ) => i.type === "SELL" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    
    
    const amtOfMarketOrdersNone = items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    const amtOfMarketOrders1h = items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h < 100 ).length
    const amtOfMarketOrders4h = items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    const amtOfMarketOrders24h = items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    const amtOfMarketOrders1h4h = items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h < 100 ).length
    const amtOfMarketOrders1h24h = items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h < 100 && i.twofour_h >= 100 ).length
    const amtOfMarketOrders4h24h = items.filter( ( i ) => i.type === "MARKET" && i.one_h < 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    const amtOfMarketOrders1h4h24h = items.filter( ( i ) => i.type === "MARKET" && i.one_h >= 100 && i.four_h >= 100 && i.twofour_h >= 100 ).length
    
    return (
        <>
            Total trades: { amtOfOrders }
            <br />
            <div className="d-flex">
                <div>
                    Sell orders: { amtOfSellOrders } ({ (amtOfSellOrders / amtOfOrders * 100).toFixed(2) }%)<br/>
                    <div className="d-flex">
                        <Leds /><div className="w-100">: { amtOfSellOrdersNone } ({ (amtOfSellOrdersNone / (amtOfSellOrdersNone + amtOfMarketOrdersNone ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a/><div className="w-100">: { amtOfSellOrders1h } ({ (amtOfSellOrders1h / (amtOfSellOrders1h + amtOfMarketOrders1h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds b/><div className="w-100">: { amtOfSellOrders4h } ({ (amtOfSellOrders4h / (amtOfSellOrders4h + amtOfMarketOrders4h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds c/><div className="w-100">: { amtOfSellOrders24h } ({ (amtOfSellOrders24h / (amtOfSellOrders24h + amtOfMarketOrders24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b/><div className="w-100">: { amtOfSellOrders1h4h } ({ (amtOfSellOrders1h4h / (amtOfSellOrders1h4h + amtOfMarketOrders1h4h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a c/><div className="w-100">: { amtOfSellOrders1h24h } ({ (amtOfSellOrders1h24h / (amtOfSellOrders1h24h + amtOfMarketOrders1h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds b c/><div className="w-100">: { amtOfSellOrders4h24h } ({ (amtOfSellOrders4h24h / (amtOfSellOrders4h24h + amtOfMarketOrders4h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b c/><div className="w-100">: { amtOfSellOrders1h4h24h } ({ (amtOfSellOrders1h4h24h / (amtOfSellOrders1h4h24h + amtOfMarketOrders1h4h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                </div>
                <div>
                    Market orders: { amtOfMarketOrders } ({ (amtOfMarketOrders / amtOfOrders * 100).toFixed(2) }%)<br/>
                    <div className="d-flex">
                        <Leds /><div className="w-100">: { amtOfMarketOrdersNone } ({ (amtOfMarketOrdersNone / (amtOfMarketOrdersNone + amtOfSellOrdersNone ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a/><div className="w-100">: { amtOfMarketOrders1h } ({ (amtOfMarketOrders1h / (amtOfMarketOrders1h + amtOfSellOrders1h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds b/><div className="w-100">: { amtOfMarketOrders4h } ({ (amtOfMarketOrders4h / (amtOfMarketOrders4h + amtOfSellOrders4h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds c/><div className="w-100">: { amtOfMarketOrders24h } ({ (amtOfMarketOrders24h / (amtOfMarketOrders24h + amtOfSellOrders24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b/><div className="w-100">: { amtOfMarketOrders1h4h } ({ (amtOfMarketOrders1h4h / (amtOfMarketOrders1h4h + amtOfSellOrders1h4h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a c/><div className="w-100">: { amtOfMarketOrders1h24h } ({ (amtOfMarketOrders1h24h / (amtOfMarketOrders1h24h + amtOfSellOrders1h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds b c/><div className="w-100">: { amtOfMarketOrders4h24h } ({ (amtOfMarketOrders4h24h / (amtOfMarketOrders4h24h + amtOfSellOrders4h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b c/><div className="w-100">: { amtOfMarketOrders1h4h24h } ({ (amtOfMarketOrders1h4h24h / (amtOfMarketOrders1h4h24h + amtOfSellOrders1h4h24h ) * 100).toFixed(2) }%)</div>
                    </div>
                </div>
            </div>
            
            <br />
            <hr />
            <Container fluid>
                <Row>
                        { symbols.map( ( [ symbol, orders ] ) => (
                            <TradeInfo symbol={ symbol } orders={ orders } />
                        ) ) }
                </Row>
            </Container>
        </>
    )
}

export default Page