import { useState } from "react"
import { ListGroup, Badge, Modal, Button } from "react-bootstrap"
import axios from "axios"
import styled from "styled-components"
const Blinker = styled.div`
    @keyframes blink {
        from { color: var(--bs-info) }
        2% { color: var(--bs-primary) }
        10% { color: var(--bs-success) }
        35% { color: var(--bs-success) }
        45% { color: var(--bs-light) }
        55% { color: var(--bs-secondary) }
        70% { color: var(--bs-warning)}
        to { color: var(--bs-danger)}
    }
    animation: blink 60s;
    color: var(--bs-danger);
    font-weight: bold;
    margin: auto 16px auto 0;
`

const TraderInfo = ({ id, active, connected, status, symbol, sid, start_time, ...props }) => {
    const [ showDetailed, setShowDetailed ] = useState(false)
    const setActive = (a) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/${a?"activate":"deactivate"}`)
    }
    const setStrategy = (i) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/select_strategy/${i}`)
    }

    const connectedPillBg = connected ? 'success' : 'danger'
    let activePillBg = active ? 'success' : 'warning'
    if (!connected) {
        activePillBg = 'secondary'
    }
    return (
        <ListGroup.Item
            key={start_time}
            as="li"
            variant={ connected ? "light" : "secondary"}
            onClick={ (e) => {
                if ( !showDetailed ) {
                    setShowDetailed(true)
                }  
                e.preventDefault()
            } }
        >
            <div>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto" style={{height: 60}}>
                        <div className="fw-bold">
                            <Blinker key={props.ordersFetched}>{id}</Blinker>
                        </div>
                    
                        <div style={{fontSize: 10}}>
                            <div style={{width: "100%", display: 'flex'}}>
                                { status }
                                { symbol && ` - Trading ${ symbol }` }
                            </div>
                        </div>
                    </div>

                    { connected ? (
                        <Badge pill bg={activePillBg}>{ active ? 'active' : 'inactive'}</Badge>
                    ) : (
                        <Badge pill bg={connectedPillBg}>disconnected</Badge>
                    ) }
                </div>
                <div style={{width: "100%"}}>
                    <p className="m-0" style={{fontSize: 10}}>
                        {`Strategy: ${props.strategy_id}`}
                        {' | '}
                        {`Trades started: ${props.trades_started}`}
                        <br />
                        {`Hub version: ${props.trader_hub_version}`}
                        {' | '}
                        {`Trader version: ${props.trader_version}}`}
                    </p>
                </div>
            </div>
        {/* </ListGroup.Item>
        <ListGroup.Item >
            <div style={{width: "100%", display: 'flex'}}>
                <div style={{width: "100%", display: 'flex'}}>
                    {id}
                </div>
                </div>
            </div> */}
            {/* <Card border={cardBorder}>
                <Card.Header style={ { display: "flex" } }>
                    <div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        { status }
                        { symbol && ` - Trading ${ symbol }` }
                        <p style={{fontSize: 10}}>
                            {moment.unix(start_time).format()}<br/>
                            Strategy {props.strategy_id}<br/>
                            Hub version {props.trader_hub_version}<br/>
                            Trader version {props.trader_version}<br/>
                            Trades started {props.trades_started}
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card> */}
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

            <div style={{position: 'absolute', left:0, bottom:0, height: '100px', width: '100%'}}>
                <div style={{margin: 'auto'}}>
                    {props.children}
                </div>
            </div>
        </ListGroup.Item>
    )
}

export default TraderInfo