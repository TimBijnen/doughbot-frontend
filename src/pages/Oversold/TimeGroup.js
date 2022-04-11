import moment from 'moment'
import { useState } from "react"
import { Badge, Card, Container, Row, Col, Collapse } from "react-bootstrap"
import OversoldItem from "./Item"
import styled from "styled-components"
import { Led } from '../../__components/Icon'

const StyledCard = styled( Card )`
    border-left: 8px solid var(--bs-${ ( { issentimentpositive } ) => issentimentpositive ? "success" : "danger" });
`

const TimeDrop = styled.div`
    text-align: center;
    width: 100%;
`

const OversoldTimeGroup = ( { time, items } ) => {
    const { is_sentiment_positive, sentiment_1h, sentiment_4h, sentiment_24h } = items[0]
    const anyHasTrades = items.find( ( i ) => i.trades?.length > 0)
    const anyCouldTrade = items.filter( ( i ) => i.should_trade).length
    const [ open, setOpen ] = useState( !!anyHasTrades );

    return (
        <>
        <StyledCard className="bg-light text-dark mb-2" issentimentpositive={ is_sentiment_positive }>
            <Card.Header className="p-0 d-flex" onClick={ () => setOpen(!open) }>
                    <div className="float-end d-flex">
                        <Led isOn={ sentiment_1h >= 100 } title={ `1h ${ sentiment_1h }%`}/>
                        <Led isOn={ sentiment_4h >= 100 } title={ `4h ${ sentiment_4h }%`}/>
                        <Led isOn={ sentiment_24h >= 100 } title={ `24 ${ sentiment_24h }%`}/>
                    </div>
                <TimeDrop className="time small">
                    { moment.unix(time/1000).format("HH:mm") } 
                </TimeDrop>
                <div className="small">
                    <Badge  pill  bg={ anyCouldTrade ? "success" : "secondary" }>{ `${ anyCouldTrade } / ${ items.length }` }</Badge>
                </div>
            </Card.Header>
            <Collapse in={open}>
                <Container className="pb-2">
                    <Row>
                        <Col xs="12">
                            { items.map( ( i ) => (
                                <OversoldItem key={ i.id } { ...i } />
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