import moment from 'moment'
import { Card, Container, Row, Col } from "react-bootstrap"
import OversoldItem from "./Item"

const OversoldTimeGroup = ( { time, items } ) => {
    const isSentimentPositive = items[0].is_sentiment_positive
    return (
        <Card className="bg-light text-dark mt-2">
            <Container>
                <Row>
                    <Col xs="3" style={ { borderLeft: `8px solid var(--bs-${ isSentimentPositive ? "error" : "danger" })` } }>
                        <div className="small">
                            { moment.unix(time/1000).format("HH:mm") }
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