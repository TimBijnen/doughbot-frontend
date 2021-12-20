import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"

const API = process.env.REACT_APP_API_URL

// const trade = {
//     "buy_orders": 2,
//     "candle_id": null,
//     "created_at": "Sun, 19 Dec 2021 09:25:07 GMT",
//     "id": 1,
//     "sell_orders": 2,
//     "sentiment_1h": 99.80223254985493,
//     "sentiment_24h": 101.79285957749812,
//     "sentiment_4h": 99.84041778614629,
//     "symbol": "KMDBTC",
//     "total_bought_coins": 33.0,
//     "total_buy_value": 0.00051255,
//     "total_sell_value": 0,
//     "total_sold_coins": 0.0
// }

const TradePage = () => {
    const { id } = useParams();
    const [ trade, setTrade ] = useState( {} )
    const [ sentiment, setSentiment ] = useState( [] )

    useEffect(() => {
        async function loadData() {
            const { data } = await axios.get( `${ API }/trades/${ id }` )
            setTrade( data.data )
            const { start_time, closed_at } = data.data
            const st = moment(start_time, "yyyy-MM-DD hh:mm:ss").subtract(10, 'minutes').format("yyyy-MM-DD hh:mm")
            const ca = moment(closed_at, "yyyy-MM-DD hh:mm:ss").add(10, 'minutes').format("yyyy-MM-DD hh:mm")
            const { data: sdata } = await axios.get( `${ API }/sentiment?from=${ st }&to=${ ca }` )
            console.log(sdata)
            setSentiment( sdata.data )
        }
        loadData()
    }, [ id ])

    return (
        <div>
            Trade { id }
            <hr />
            <ul>
                <li>Symbol: { trade.symbol }</li>
                <li>Created at: { trade.created_at }</li>
                <li>Buy orders: { trade.buy_orders }</li>
                <li>Sell orders: { trade.sell_orders }</li>
                <li>Sentiment 1h: { trade.sentiment_1h }</li>
                <li>Sentiment 4h: { trade.sentiment_4h }</li>
                <li>Total bought coins: { trade.total_bought_coins }</li>
                <li>Total sold coins: { trade.total_sold_coins }</li>
                <li>Total buy value: { trade.total_buy_value }</li>
                <li>Total sell value: { trade.total_sell_value }</li>
            </ul>
            <div>
                { sentiment.length }
            </div>
        </div>
    )
}

export default TradePage