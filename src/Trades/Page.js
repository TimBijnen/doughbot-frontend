import useTrades from "./hooks/trades"
import { Table, Container, Row } from "react-bootstrap"
import { Dot } from "../Icon"
import TradeInfo from "./Info"

const Leds = ( ( { a, b, c, type, secondary } ) => type >= 0 ? (
    secondary ? (
        <div>
            <Dot isOn={ type % 2 === 1 ? type >= 6 : undefined }/>
            <Dot isOn={ parseInt(type / 2) % 2 === 1 ? type >= 6 : undefined }/>
            <Dot isOn={ parseInt(type / 4) % 2 === 1 ? type >= 6 : undefined }/>
        </div>
    ) : (
        <div>
            <Dot isOn={ type % 2 === 1 }/>
            <Dot isOn={ parseInt(type / 2) % 2 === 1 }/>
            <Dot isOn={ parseInt(type / 4) % 2 === 1 }/>
        </div>
    ) 
): (
    <div>
        <Dot isOn={ a }/>
        <Dot isOn={ b }/>
        <Dot isOn={ c }/>
    </div>
))

const Page = () => {
    const [ { sentiment, isLoading } ] = useTrades()

    if ( isLoading ) {
        return <div>Loading</div>
    }

    const percentage = ( sentiment.total.sell / ( sentiment.total.sell + sentiment.total.market ) * 100 ).toFixed( 2 )
    if ( sentiment ) {
        return (
                <div className="w-100">
                    <div className="d-flex">
                        <div className="w-100">
                            Total orders: {sentiment.total.sell + sentiment.total.market}<br />
                            Total sell orders: {sentiment.total.sell}<br />
                            Total market orders: {sentiment.total.market}<br />
                        </div>
                        <div className={`float-end p-3 fw-bold ${ percentage < 60 ? "text-danger" : percentage < 80 ? "text-warning" : "text-success" } `} style={ { fontSize: "2rem" } }>
                            { percentage }%
                        </div>
                    </div>

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
                    {/* <Table>
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
                            { new Array(12).fill(1).map( ( a, i ) => (
                                <tr>
                                    <td><Leds secondary type={ i }/></td>
                                    <td>{ sentiment.total.sell }</td>
                                    <td>{ sentiment.total.market }</td>
                                    <td>{ sentiment.total.sell + sentiment.total.market }</td>
                                    <td>{ ( sentiment.total.sell / (sentiment.total.sell + sentiment.total.market) * 100 ).toFixed( 2 ) } %</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </Table> */}
                    <hr />
                    <Container fluid>
                        <Row>
                                { sentiment.coins.sort( ( a, b ) => a.total > b.total ? -1 : 1).map( ( coin ) => (
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