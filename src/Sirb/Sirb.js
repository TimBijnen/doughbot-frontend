import { Container, Row } from "react-bootstrap"
import Tickers from "./Tickers"
import Assets from "./Assets"

const Sirb = () => {
    return (
        <>
            <Tickers />
            <hr />
            <Container fluid>
                <Row>
                    <Assets />
                </Row>

            </Container>
        </>
    )
}

export default Sirb