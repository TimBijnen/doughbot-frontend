import { Card, Badge, Table, Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { Led } from "../Icon"
import axios from "axios"

const API = process.env.REACT_APP_API_URL


const ItemLine = ( { coin, id, stoch_oversold, has_active_trades, price_above_minimum, bollinger_oversold, bollinger_percentage, close_price_filter, should_trade } ) => {
    const [ isShowingTradeModal, setIsShowingTradeModal ] = useState()
    const showConfirm = () => setIsShowingTradeModal( !isShowingTradeModal )
    const makeTrade = async () => {
        const { data } = await axios.post(`${ API }/trades/new`, { coin, candle_id: id})
        console.log(data)
    }

    return (
        <div className="d-flex">
            <Modal show={ isShowingTradeModal }>
                <Modal.Header>
                    Confirm
                </Modal.Header>
                <Modal.Body>
                    Place trade?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ showConfirm }>Cancel</Button>
                    <Button variant="success" onClick={ makeTrade }>Yes</Button>
                </Modal.Footer>
            </Modal>
            <Led isOn={ close_price_filter } />
            <div className="d-flex w-100">
                <div style={ { fontWeight: should_trade ? "bold" : "normal" } }>
                    { coin }
                </div>
                { should_trade && (
                    <Badge onClick={ showConfirm }>Trade!</Badge>
                ) }
            </div>
            <div className={ bollinger_percentage >= 1 && bollinger_percentage <= 5 ? "text-success pull-right" : "text-danger pull-right"}>
                {' '}
                { bollinger_percentage?.toFixed(2) }%
            </div>
        </div>
    )
}

const OversoldItem = ( { trades, ...item } ) => {
    return (
        trades?.length > 0 ? (
            <Card className="text-black">
                <Card.Body>
                    <ItemLine { ...item } />
                    <Table striped bordered size="sm">
                        <thead>
                            <tr>
                                <th>Order id</th>
                                <th>Type</th>
                                <th>Executed</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { trades.map( t => (
                                <tr>
                                    <td><small>{ t.order_id }</small></td>
                                    <td><Badge pill bg={ "secondary" }>{ t.type }</Badge></td>
                                    <td>{ t.executed_qty } ({ t.executed_qty / t.original_qty * 100 }%)</td>
                                    <td>
                                        {
                                            t.cancelled ? (
                                                <Badge pill bg="danger">CANCELLED</Badge>
                                            ) : (
                                                <Badge pill bg="success">ACTIVE</Badge>
                                            )
                                        }
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        ) : (
            <ItemLine { ...item } />
        )
    )
}

export default OversoldItem