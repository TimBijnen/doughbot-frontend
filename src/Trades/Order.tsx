import { Row, Col } from "react-bootstrap"
import { Bar } from "../Icon"
import styled from "styled-components"
import moment from "moment"
import { Time } from "./components"

const TradeItemRow = styled(Row)`
    &:hover {
        background-color: var(--bs-light);
        cursor: help;
        font-weight: bold;
    }
`

const TradeItemContainer = styled.div`
    .caption {
        font-size: 0.5rem;
        display: none;
    }
    &:hover .caption {
        display: block;
    }
`

const TradeItem = ( t: any ) => {
    const startTime = moment.unix( t.transactTime / 1000 )
    const closeTime = t.closed_at ? moment.unix( t.closed_at ) : moment()
    const cancelled = t.status === "CANCELLED"
    return (
        <TradeItemContainer className="mb-2 small">
            <TradeItemRow title={ t.order_id }>
                <Col xs={ 2 } className="small">
                    { t.side } { t.type }
                </Col>
                <Col xs={ 8 }>
                    <Bar
                        market={ t.side === "MARKET" }
                        cancelled={ cancelled }
                        value={ t.executed_qty }
                        target={ t.original_qty}
                    />
                </Col>
                <Col xs={ 2 }>
                    <span className="small float-end">
                        <Time start={ startTime } end={ closeTime } />
                    </span>
                </Col>
            </TradeItemRow>
            <Row className="caption">
                <Col className="bg-light">
                    { t.reason }
                </Col>
            </Row>
        </TradeItemContainer>
    )
}

export default TradeItem