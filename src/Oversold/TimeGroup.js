import moment from 'moment'
import { useState } from "react"
import { Badge, Card, Container, Row, Col, Collapse } from "react-bootstrap"
import OversoldItem from "./Item"
import styled from "styled-components"

const StyledCard = styled( Card )`
    border-left: 8px solid var(--bs-${ ( { isSentimentPositive } ) => isSentimentPositive ? "success" : "danger" });
`

const TimeDrop = styled.div`
    text-align: center;
`

const OversoldTimeGroup = ( { time, items } ) => {
    const isSentimentPositive = items[0].is_sentiment_positive
    const anyHasTrades = items.find( ( i ) => i.trades?.length > 0)
    const anyCouldTrade = items.filter( ( i ) => i.should_trade).length
    const [ open, setOpen ] = useState( !!anyHasTrades );

    return (
        <>
        <StyledCard className="bg-light text-dark mb-2" isSentimentPositive={ isSentimentPositive }>
            <Card.Header className="p-0" onClick={ () => setOpen(!open) }>
                <TimeDrop className="time small">
                    { moment.unix(time/1000).format("HH:mm") } <Badge pill>{ `${ anyCouldTrade } / ${ items.length }` }</Badge>
                </TimeDrop>
            </Card.Header>
            <Collapse in={open}>
                <Container className="pb-2">
                    <Row>
                        <Col xs="12">
                            { items.map( ( i ) => (
                                <OversoldItem { ...i } />
                            ) ) }
                        </Col>
                    </Row>
                </Container>
            </Collapse>
        </StyledCard>
        </>
    )
}

export default OversoldTimeGroup