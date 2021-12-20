import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import SentimentChartComponent from "../../Chart/Sentiment"

const API = process.env.REACT_APP_API_URL

const TradePage = () => {
    const { id } = useParams();
    const [ trade, setTrade ] = useState( {} )
    const [ sentiment, setSentiment ] = useState( [] )

    useEffect(() => {
        async function loadData() {
            const { data } = await axios.get( `${ API }/trades/${ id }` )
            // const data = {"data":{"buy_orders":3,"candle_id":null,"closed_at":"2021-12-20 05:20:24","created_at":"Mon, 20 Dec 2021 05:20:24 GMT","id":22,"sell_orders":5,"sentiment_1h":99.75978994245189,"sentiment_24h":98.57596656632644,"sentiment_4h":99.88279888813801,"start_time":"2021-12-20 00:13:08","symbol":"BELBTC","total_bought_coins":32.6,"total_buy_value":0.0009909,"total_sell_value":0,"total_sold_coins":32.6}}
            setTrade( data.data )
            const { start_time, closed_at } = data.data
            const st = moment(start_time, "yyyy-MM-DD hh:mm:ss").subtract(10, 'minutes').format("yyyy-MM-DD hh:mm")
            const ca = moment(closed_at, "yyyy-MM-DD hh:mm:ss").add(10, 'minutes').format("yyyy-MM-DD hh:mm")
            const { data: sdata } = await axios.get( `${ API }/sentiment?from=${ st }&to=${ ca }` )
            const hour1 = []
            const hour4 = []
            for ( let i = 0; i < sdata.data.length; i += 1 ) {
                hour1.push( sdata.data[ i ].one_h )
                hour4.push( sdata.data[ i ].four_h )
            }
            // const m = moment
            // debugger
            setSentiment( [ hour1, hour4 ] )
        }
        loadData()
    }, [ id ])

    return (
        <div>
            Trade { id }
            <hr />
            <ul>
                <li>Symbol: { trade.symbol }</li>
                <li>Start time: { trade.start_time }</li>
                <li>End time: { trade.closed_at }</li>
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
                <SentimentChartComponent datas={ sentiment } />
            </div>
        </div>
    )
}

export default TradePage