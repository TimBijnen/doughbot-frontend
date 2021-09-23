import moment from 'moment'
import { Card, Container, Row, Col } from "react-bootstrap"
import OversoldItem from "./Item"

const OversoldTimeGroup = ( { time, items } ) => {
    return (
        <Card className="bg-secondary text-white mt-2">
            <Container>
                <Row>
                    <Col xs="3">
                        <div className="small">
                            { moment.unix(time/1000).format("hh:mm") }
                        </div>
                    </Col>
                    <Col xs="9">
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