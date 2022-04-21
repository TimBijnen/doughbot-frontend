import { useState } from "react"
import { Row, Col, ListGroup, Badge } from "react-bootstrap"
// import axios from "axios"
import styled from "styled-components"
import { TraderModal } from "."
import { Bar } from "../../../components/Icon"

const Blinker = styled.div`
    @keyframes blink {
        from {
            color: var(--bs-info);
            > .bg_primary {
                background-color: var(--bs-info);
            }
        }
        2% {
            color: var(--bs-primary);
            .bg_primary {
                background-color: var(--bs-primary);
            }
        }
        10% { color: var(--bs-success) }
        35% { color: var(--bs-success) }
        to { 
            color: var(--bs-secondary);
            .bg_primary {
                background-color: var(--bs-primary);
            }
        }
    }
    animation-fill-mode: forwards;
    animation: blink 60s;
    color: var(--bs-danger);
    font-weight: bold;
    
    @keyframes blinkBadge {
        from { color: white; font-weight: bold; }
        50% { color: black; font-weight: bold; }
    }
    .badge {
        animation: blinkBadge 1s;
        animation-iteration-count: 4
    }
`

const TraderInfo = ({ id, active, connected, status, symbol, sid, start_time, startTime, ...props }) => {
    const [ showDetailed, setShowDetailed ] = useState(false)
    // const setActive = (a) => {
    //     axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/${a?"activate":"deactivate"}`)
    // }
    // const setStrategy = (i) => {
    //     axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/select_strategy/${i}`)
    // }

    const connectedPillBg = connected ? 'success' : 'danger'
    const activePillBg = (props.buy_active || props.sell_active) ? 'success' : 'secondary'
    const buyOrders = props.orders?.filter( ( o ) => o.side === 'BUY' && o).sort((a,b) => a.transactionTime > b.transactionTime ? 1 : -1) || []
    const sellOrders = props.orders?.filter( ( o ) => o.side === 'SELL' && o.type !== 'MARKET' && o.status !== "IDLE" && o).sort((a,b) => a.transactionTime > b.transactionTime ? 1 : -1) || []
    const marketOrders = props.orders?.filter( ( o ) => o.side === 'SELL' && o.type === 'MARKET' && o.status !== "IDLE" && o) || []
    return (
        <ListGroup.Item
            key={id}
            as="li"
            variant={ connected && active ? "light" : "secondary"}
            onClick={ (e) => {
                !showDetailed && setShowDetailed( true )
                e.preventDefault()
            } }
        >
            <div>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto" style={{height: 60}}>
                        <div className="fw-bold d-flex">
                            <Blinker key={props.ordersFetched}>{props.name}</Blinker>
                        </div>
                    
                        <div style={{fontSize: 10}}>
                            <Badge pill bg={activePillBg}>

                            <div style={{width: "100%", display: 'flex'}}>
                                { status }
                                { symbol && ` - Trading ${ symbol }` }
                            </div>
                            </Badge>
                        </div>
                    </div>

                    { connected ? (
                        <Badge style={{fontSize: 10}} bg="secondary">
                            {`Strategy ${ props.strategy_id }`}
                        </Badge>
                    ) : (
                        <Badge pill bg={connectedPillBg}>disconnected</Badge>
                    ) }
                </div>
            </div>
            <TraderModal name={props.name} tid={id} showDetailed={showDetailed} setShowDetailed={setShowDetailed} />

            { props.children ? (
                <div style={{display: 'flex', position: 'absolute', left:0, bottom:0, height: '100px', width: '100%'}}>
                    <div className="ms-auto mt-auto">
                        {props.children}
                    </div>
                </div>
            ) : null }
            {/* { props.orders?.length > 0 && (

                <div className="ms-2" style={{fontSize: 12}}>
                    <Time startTimestamp={ startTime / 1000 } />
                    <div className="d-flex">
                        <Blinker key={ `badge_buys_${id}_${props.orders?.length - sellOrders?.length }`}>
                            <Badge>Buys { props.orders?.length - sellOrders?.length }</Badge>
                        </Blinker>
                        <Blinker key={ `badge_sell_${id}_${sellOrders?.length }`}>
                            <Badge>Sells { sellOrders?.length }</Badge>
                        </Blinker>
                    </div>
                </div>
            )} */}
            <div>
                <Row>
                    <Col xs={2} className="small">
                        Buy {props.total_bought_coins}
                    </Col>
                    <Col xs={8} className="d-flex">
                        {buyOrders.map(( o ) => (
                            <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} className="small">
                        Sell {props.total_sold_coins}
                    </Col>
                    <Col xs={8} className="d-flex">
                        {sellOrders.map(( o ) => (
                            <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} className="small">
                        Market 
                    </Col>
                    <Col xs={8} className="d-flex">
                        {marketOrders.map(( o ) => (
                            <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </ListGroup.Item>
    )
}

export default TraderInfo