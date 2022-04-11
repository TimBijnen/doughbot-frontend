import { useState } from "react"
import { Badge } from "react-bootstrap"
import TradeViewChart from "react-crypto-chart"
import styled from "styled-components"


const TradeViewContainer = styled.div`
.container {
    height: 400px
}
`
const BinanceChart = ( { tickers, quotes = [ "USDT", "BTC" ] } ) => {
    const [ asset, setAsset ] = useState( tickers[ 0 ] || "BTC" )
    const [ quote, setQuote ] = useState( quotes[ 0 ] || "USDT" )
    const ticker = `${asset}${quote}`

    return (
        <TradeViewContainer>
            { tickers.length && (
                <div>
                    { tickers.map( ( t ) => (
                        <Badge bg={ t === asset ? "success" : "dark" } onClick={ () => setAsset( t ) }>{ t }</Badge>
                    ) ) }
                </div>
            ) }
            { quotes.length && (
                <div>
                    { quotes.map( ( t ) => (
                        <Badge bg={ t === quote ? "success" : "dark" } onClick={ () => setQuote( t ) }>{ t }</Badge>
                    ) ) }
                </div>
            ) }
            { ticker && (
                <>
                    <h4>{ asset }/{ quote }</h4>
                    <TradeViewChart key={ ticker } pair={ ticker } />
                </>
            ) }
        </TradeViewContainer>
    )
}

export default BinanceChart