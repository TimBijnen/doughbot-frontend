import { useState } from "react"
import useTrades from "./hooks/trades"
import { Form, Button, Table, Container, Row, Col } from "react-bootstrap"
import { Dot } from "../Icon"
import TradeInfo from "./Info"
import moment from "moment"

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
    const [ selectedInterval, setSelectedInterval ] = useState( "day" )
    const [ selectedDate, setSelectedDate ] = useState( { start: moment().subtract( 1, "day" ), end: moment() } )
    const [ { sentiment, isLoading } ] = useTrades( selectedDate )
    if ( isLoading ) {
        return <div>Loading</div>
    }

    const setDate = ( type ) => {
        let nextDate
        if ( selectedInterval === "all" ) {
            nextDate = { start: moment(0), end: moment() }
        } else if ( type === "before" ) {
            nextDate = {
                start: selectedDate.start.subtract(1, selectedInterval),
                end: selectedDate.end.subtract(1, selectedInterval),
            }
        } else if ( type === "today" ) {
            nextDate = {
                start: moment().subtract(1, selectedInterval),
                end: moment(),
            }
        } else if ( type === "after" ) {
            nextDate = {
                start: selectedDate.start.add(1, selectedInterval),
                end: selectedDate.end.add(1, selectedInterval),
            }
        }
        if ( nextDate ) {
            setSelectedDate( nextDate )
        }
    }
    
    const selectInterval = (i) => {
        const type = i.target.value
        const nextDate = {
            start: type === "all" ? moment() : moment( selectedDate.end ).subtract(1, type),
            end: selectedDate.end,
        }
        setSelectedInterval( type )
        setSelectedDate( nextDate )
    }
    
    if ( sentiment ) {
        const percentage = ( sentiment.total.sell / ( sentiment.total.sell + sentiment.total.market ) * 100 ).toFixed( 2 )
        return (
            <div className="w-100">
                    <Row>
                        <Col xs={ 3 }>
                            <Button onClick={ () => setDate( "before" ) }>{ "<" }</Button>
                            <Button onClick={ () => setDate( "today" ) }>Today</Button>
                            { console.log(selectedDate.end.diff(moment().add(1, selectedInterval)) > 0)}
                            <Button disabled={ selectedDate.end.diff(moment().add(1, selectedInterval)) > 0 } onClick={ () => setDate( "after" ) }>{ ">" }</Button>
                        </Col>
                        <Col xs={ 6 }>
                            { selectedDate.start.format("DD-MM-YYYY HH:mm" ) }
                            {" <--> "}
                            { selectedDate.end.format("DD-MM-YYYY HH:mm" ) }
                        </Col>
                        <Col xs={ 3 }>
                            <Form.Select value={ selectedInterval } aria-label="Default select example" onChange={ selectInterval }>
                                <option value="hour">Hour</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                                <option value="all">All time</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <hr />

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
                                <tr>
                                    <th>
                                        Sentiment
                                    </th>
                                    <th>
                                        Score
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
                                </tr>
                            </thead>
                            <tbody>
                                { sentiment.types.sort(( a , b ) => (a.sell / a.market || 0) >= (b.sell / b.market || 0) ? -1 : 1).map( ( s, i ) => (
                                    <tr>
                                        <td>
                                            <Leds type={ s.type }/>
                                        </td>
                                        <td>
                                            { s.type}
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