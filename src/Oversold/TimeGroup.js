import moment from 'moment'
import { Card, Container, Row, Col } from "react-bootstrap"
import OversoldItem from "./Item"
import styled from "styled-components"

const TimeContainer = styled( Container )`
    border-left: 8px solid var(--bs-${ ( { isSentimentPositive } ) => isSentimentPositive ? "success" : "danger" });
    // padding-bottom: 2px;
`

const TimeDrop = styled.div`
    text-align: center;
`

const OversoldTimeGroup = ( { time, items } ) => {
    const isSentimentPositive = items[0].is_sentiment_positive
    return (
        <>
        <Card className="bg-light text-dark mb-2">
            <Card.Header className="p-0">
                <TimeDrop className="time small">
                    { moment.unix(time/1000).format("HH:mm") }
                </TimeDrop>
            </Card.Header>
            <TimeContainer className="pb-2" isSentimentPositive={ isSentimentPositive }>
                <Row>
                    <Col xs="12">
                        { items.map( ( i ) => (
                            <OversoldItem { ...i } />
                        ) ) }
                    </Col>
                </Row>
            </TimeContainer>
        </Card>
        </>
    )
}

export default OversoldTimeGroup