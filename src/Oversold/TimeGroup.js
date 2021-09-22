import { Card, Container, Row, Col } from "react-bootstrap"
import OversoldItem from "./Item"


const OversoldTimeGroup = ( { time, items } ) => {
    return (
        <Card className="bg-secondary text-white">
            <Container>
                <Row>
                    <Col xs="2">
                        { time }
                    </Col>
                    <Col xs="10">
                        { items.map( ( i ) => (
                            <OversoldItem { ...i } />
                        ) ) }
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default OversoldTimeGroup