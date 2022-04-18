import { useState } from "react"
import { ListGroup, Badge, Modal, Button } from "react-bootstrap"
import axios from "axios"
import styled from "styled-components"
import Time from "./Time"

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
    const setActive = (a) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/${a?"activate":"deactivate"}`)
    }
    const setStrategy = (i) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/select_strategy/${i}`)
    }

    const connectedPillBg = connected ? 'success' : 'danger'
    const activePillBg = (props.buy_active || props.sell_active) ? 'success' : 'secondary'
    const sellOrders = props.orders?.filter( ( o ) => o.side === 'SELL' && o) || []
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
                            <Blinker key={props.ordersFetched}>{id}</Blinker>
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
            <Modal show={showDetailed}>
                <Modal.Header closeButton onHide={(e) => setShowDetailed(false)}>
                    Ttel
                </Modal.Header>
                <Modal.Body>
                    <p>{`Is ${ active ? '' : 'not' } active`}</p>
                    <p>{`Is ${ connected ? '' : 'not' } connected`}</p>
                    <Button variant={parseInt(props.strategy_id, 10) === 1 ? 'success' : 'secondary'} onClick={ () => setStrategy(1) }>
                        1
                    </Button>
                    <Button variant={parseInt(props.strategy_id, 10) === 2 ? 'success' : 'secondary'} onClick={ () => setStrategy(2) }>
                        2
                    </Button>
                    <Button variant={parseInt(props.strategy_id, 10) === 3 ? 'success' : 'secondary'} onClick={ () => setStrategy(3) }>
                        3
                    </Button>
                    <div className="w-100 text-end"  style={{fontSize: 12}}>
                        <Badge>
                            {`Hub version: ${props.trader_hub_version}`}
                        </Badge>
                        <Badge>
                            {`Trader version: ${props.trader_version}`}
                        </Badge>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={active ? 'success' : 'secondary'} onClick={ () => setActive(true) }>
                        Activate
                    </Button>
                    <Button variant={!active ? 'warning' : 'secondary'} onClick={ () => setActive(false) }>
                        Deactivate
                    </Button>
                </Modal.Footer>

            </Modal>

            { props.children ? (
                <div style={{display: 'flex', position: 'absolute', left:0, bottom:0, height: '100px', width: '100%'}}>
                    <div className="ms-auto mt-auto">
                        {props.children}
                    </div>
                </div>
            ) : null }
            { props.orders?.length > 0 && (

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
            )}
        </ListGroup.Item>
    )
}

export default TraderInfo