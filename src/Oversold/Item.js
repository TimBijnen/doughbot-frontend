import { Card, Badge, Container, Row, Col, Modal, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { useToasts } from "react-toast-notifications"
import { TradeItem } from "../Trades"

const API = process.env.REACT_APP_API_URL


const ItemLine = ( { coin, id, has_trades, bollinger_percentage, should_trade } ) => {
    const { addToast } = useToasts()
    const [ isShowingTradeModal, setIsShowingTradeModal ] = useState()
    const showConfirm = () => should_trade && setIsShowingTradeModal( !isShowingTradeModal )
    const makeTrade = async () => {
        if ( bollinger_percentage / 2 + 0.5 < 1 || bollinger_percentage / 2 + 0.5 > 3) {
            console.log("Error")
            return
        } 
        const { data } = await axios.post(`${ API }/trades/new`, { coin, candle_id: id, percentage: bollinger_percentage })
        addToast( data.message, { appearance: data.status, autoDismiss: true })
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
            { " " }
    </>
    )
}

const OversoldItem = ( { trades, ...item } ) => {
    return (
            trades?.length > 0 ? (
                <Card className="p-2">

                <Container>
                    <Row>  
                        <Col>
                            <b className="text-success">
                                { `${ item.coin } ${ item.bollinger_percentage?.toFixed(2) }%` }
                            </b>
                        </Col>
                    </Row>
                        { trades.map( ( t ) => (
                            <TradeItem key={ t.id } { ...t } />
                        ) ) }
                </Container>
                </Card>
                ) : (
                    <ItemLine { ...item } badge/>
                )
    )
}

export default OversoldItem