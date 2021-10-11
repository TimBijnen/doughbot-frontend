import { Card, Badge, Table, Modal, Button } from "react-bootstrap"
import { useState } from "react"
import { Led } from "../Icon"
import axios from "axios"

const API = process.env.REACT_APP_API_URL


const ItemLine = ( { coin, id, badge, has_trades, price_above_minimum, bollinger_oversold, bollinger_percentage, close_price_filter, should_trade } ) => {
    const [ isShowingTradeModal, setIsShowingTradeModal ] = useState()
    const showConfirm = () => should_trade && setIsShowingTradeModal( !isShowingTradeModal )
    const makeTrade = async () => {
        const { data } = await axios.post(`${ API }/trades/new`, { coin, candle_id: id})
        showConfirm()
    }

    return (
        <>
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
            
            <Badge bg={ has_trades ? "success" : should_trade ? "info" : "secondary" } onClick={ showConfirm } className="mr-2">
                { coin }
                { " " }
                { bollinger_percentage?.toFixed(2) }%
            </Badge>
            { " "}
    </>
    )
}

const OversoldItem = ( { trades, ...item } ) => {
    return (
        trades?.length > 0 ? (
            <>  
                <b className="text-success">
                    { `${ item.coin } ${ item.bollinger_percentage?.toFixed(2) }%` }
                </b>
                    <Table striped bordered className="small" size="sm">
                        {/* <thead>
                            <tr>
                                <th>Order id</th>
                                <th>Type</th>
                                <th>Executed</th>
                                <th>Status</th>
                            </tr>
                        </thead> */}
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
                    <hr className="m-0"/>
            </>
        ) : (
            <ItemLine { ...item } badge/>
        )
    )
}

export default OversoldItem