import { Button, Container, Col, Row } from "react-bootstrap"
import { Trades } from "../Trades"
import axios from 'axios'
import { SocketProvider } from "../Socket"

const API = process.env.REACT_APP_API_URL

const DoughbotSimulator = () => {
    const startTrade = () => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': 'start' } )
    }
    const stopTrade = () => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': 'stop' } )
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <h1>Doughbot</h1>
                    <Button onClick={ startTrade }>Start simulations</Button>
                    <Button onClick={ stopTrade }>Stop simulations</Button>
                </Col>
                <Col xs={10}>
                    <SocketProvider port={ 5001 }>
                        <Trades simulationMode/>
                    </SocketProvider>
                </Col>
            </Row>
        </Container>
    )
}

export default DoughbotSimulator


