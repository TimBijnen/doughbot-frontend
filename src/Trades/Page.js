import useTrades from "./hooks/trades"
import { Card } from "react-bootstrap"
import { Led } from "../Icon"

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
        if ( !grouped[ i.candle_id ] ) {
            grouped[ i.candle_id ] = []
        } 
        grouped[ i.candle_id ] = [ ...grouped[ i.candle_id ], i ]
    } )
    const orders = Object.entries(grouped)

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
                        <Leds /><div className="w-100">: { amtOfSellOrdersNone }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a/><div className="w-100">: { amtOfSellOrders1h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds b/><div className="w-100">: { amtOfSellOrders4h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds c/><div className="w-100">: { amtOfSellOrders24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b/><div className="w-100">: { amtOfSellOrders1h4h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a c/><div className="w-100">: { amtOfSellOrders1h24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds b c/><div className="w-100">: { amtOfSellOrders4h24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b c/><div className="w-100">: { amtOfSellOrders1h4h24h }</div>
                    </div>
                </div>
                <div>
                    Market orders: { amtOfMarketOrders } ({ (amtOfMarketOrders / amtOfOrders * 100).toFixed(2) }%)<br/>
                    <div className="d-flex">
                        <Leds /><div className="w-100">: { amtOfMarketOrdersNone }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a/><div className="w-100">: { amtOfMarketOrders1h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds b/><div className="w-100">: { amtOfMarketOrders4h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds c/><div className="w-100">: { amtOfMarketOrders24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b/><div className="w-100">: { amtOfMarketOrders1h4h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a c/><div className="w-100">: { amtOfMarketOrders1h24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds b c/><div className="w-100">: { amtOfMarketOrders4h24h }</div>
                    </div>
                    <div className="d-flex">
                        <Leds a b c/><div className="w-100">: { amtOfMarketOrders1h4h24h }</div>
                    </div>
                </div>
            </div>
            
            <br />
            <hr />
            { orders.map( ( [candle_id, trades] ) => (
                <Card>
                    { candle_id }
                    { trades.map( ( t ) => (
                        <div>
                            { t.order_id }
                            { t.symbol }
                            { t.type }
                            { t.coin }
                            { t.original_qty }
                            { t.executed_qty }
                            { t.cancelled ? "Inactive" : "Active"}
                        </div>
                    ) ) }
                </Card>
            ) ) }
        </>
    )
}

export default Page