import { Button, Container, Col, Row } from "react-bootstrap"
import { Trades } from "../Trades"
import axios from 'axios'

const API = process.env.REACT_APP_API_URL

const DoughbotSimulator = () => {
    const startTrade = () => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': 'start' } )
    }
    const action = ( action, target ) => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': action, 'target': target } )
    }
    return (
        <Container fluid>
        <Row>
        <Col xs={2}>
                    <h1>Doughbot</h1>
                    <Button onClick={ startTrade }>Start simulations</Button>
                    <Button>Stop simulations</Button>
                    <Button>Stop simulations</Button>
                    <div>Actions</div>
                    <Button onClick={ () => action( 'set_price', 'sell' ) }>Go to sell price</Button>
                    <Button onClick={ () => action( 'set_price', 'buy' ) }>Go to buy price</Button>
                    <Button onClick={ () => action( 'set_price', 'rebuy' ) }>Go to rebuy price</Button>
                    <Button onClick={ () => action( 'set_price', 'cancel' ) }>Go to cancel price</Button>
                    <Button onClick={ () => action( 'fill', 'buy' ) }>Fill buy</Button>
                    <Button onClick={ () => action( 'fill', 'sell' ) }>Fill sell</Button>
                </Col>
                <Col xs={10}>
                    <Trades />
                </Col>
            </Row>
        </Container>
    )
}

export default DoughbotSimulator


