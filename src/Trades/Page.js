import useTrades from "./hooks/trades"
import { Card } from "react-bootstrap"
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
    
    return (
        <>
            Total trades: { amtOfOrders }
            <br />
            Sell orders: { amtOfSellOrders } ({ (amtOfSellOrders / amtOfOrders * 100).toFixed(2) }%)
            <br />
            Market orders: { amtOfMarketOrders } ({ (amtOfMarketOrders / amtOfOrders * 100).toFixed(2) }%)
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