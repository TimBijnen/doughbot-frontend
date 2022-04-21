import { useState } from "react"
import { Row, Col, ListGroup, Badge } from "react-bootstrap"
// import axios from "axios"
import styled from "styled-components"
import { TraderModal } from "."
import { Bar } from "../../../components/Icon"
import { TradeBlinker } from "../../../components/ui"

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
    font-size: 0.75rem;
    
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
    let bgStatus = 'info'
    // const tbc = parseFloat(props.total_sold_coins)
    // const tsc = parseFloat(props.total_bought_coins)
    const tbv = parseFloat(props.total_buy_value)
    const tsv = parseFloat(props.total_sell_value)
    if ( parseFloat(props.total_bought_coins) === parseFloat(props.total_sold_coins)) {
        
        if ( tbv > tsv) {
            bgStatus = "warning"
        } else {
            bgStatus = "success"
        }
    }
    // const connectedPillBg = connected ? 'success' : 'danger'
    // const activePillBg = (props.buy_active || props.sell_active) ? 'success' : 'secondary'
    const buyOrders = props.orders?.filter( ( o ) => o.side === 'BUY' && o).sort((a,b) => a.transactionTime > b.transactionTime ? 1 : -1) || []
    const sellOrders = props.orders?.filter( ( o ) => o.side === 'SELL' && o.type !== 'MARKET' && o.status !== "IDLE" && o).sort((a,b) => a.transactionTime > b.transactionTime ? 1 : -1) || []
    const marketOrders = props.orders?.filter( ( o ) => o.side === 'SELL' && o.type === 'MARKET' && o.status !== "IDLE" && o) || []
    const didSellAllCoins = props.total_bought_coins > 0 && props.total_sold_coins === props.total_bought_coins
    const didBuyCoins = props.total_bought_coins > 0
    
    return (
        <ListGroup.Item
            key={id}
            as="li"
            variant={ connected && active ? "light" : "secondary"}
            onClick={ (e) => {
                !showDetailed && setShowDetailed( true )
                e.preventDefault()
            } }
            style={{borderColor: `var(--bs-${ bgStatus })`}}
        >
            <TradeBlinker bg={bgStatus} key={`${id}_${bgStatus}_${tbv}_${tsv}`} />

            <div>
                <div className="d-flex justify-content-between align-items-start">
                    <Blinker key={props.ordersFetched}>{`${props.name} ${ symbol }`}</Blinker>
                </div>
            </div>
            <TraderModal name={props.name} tid={id} showDetailed={showDetailed} setShowDetailed={setShowDetailed} />

            <div>
                <Row>
                    <Col xs={2} className={`small ${ didBuyCoins ? 'bg-success' : 'outline-success'}`} as={Badge}>
                        Buy
                    </Col>
                    <Col xs={10} className="d-flex">
                        {buyOrders.map(( o ) => (
                            <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                            </div>
                        ))}
                    </Col>
                </Row>
                { marketOrders.length > 0 ? (
                    <Row>
                        <Col xs={2} className={`small ${ didSellAllCoins ? 'bg-warning' : 'outline-warning'}`} as={Badge}>
                        {/* <Col xs={2} className="small bg-warning" as={Badge}> */}
                            Market 
                        </Col>
                        <Col xs={10} className="d-flex">
                            {marketOrders.map(( o ) => (
                                <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                    <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                                </div>
                            ))}
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col xs={2} className={`small ${ didSellAllCoins ? 'bg-success' : 'outline-success'}`} as={Badge}>
                            Sell 
                        </Col>
                        <Col xs={10} className="d-flex">
                            {sellOrders.map(( o ) => (
                                <div style={{ width: `${ o.original_qty / props.total_bought_coins * 100 }%`}}>
                                    <Bar market={ o.type === "MARKET" } cancelled={ o.status === "CANCELED" || o.status === "IDLE" } value={ o.executed_qty } target={ o.original_qty} />
                                </div>
                            ))}
                        </Col>
                    </Row>
                )}
            </div>
            { props.children ? (
                <div style={{display: 'flex', position: 'absolute', right:0, bottom:0}}>
                    <div className="ms-auto mt-auto">
                        {props.children}
                    </div>
                </div>
            ) : null }
            
        </ListGroup.Item>
    )
}

export default TraderInfo