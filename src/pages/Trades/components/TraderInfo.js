import { useState } from "react"
import { Card, Col, Modal, Button } from "react-bootstrap"
import { Led } from "../../../components/Icon"
import moment from "moment"
import axios from "axios"

const TraderInfo = ({ id, active, connected, status, symbol, sid, start_time, ...props }) => {
    const cardBorder = active ? 'success' : 'warning'
    const [ showDetailed, setShowDetailed ] = useState(false)
    const setActive = (a) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/${a?"activate":"deactivate"}`)
    }
    const setStrategy = (i) => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/select_strategy/${i}`)
    }
    return (
        <Col>
            <Card border={cardBorder} onClick={ () => setShowDetailed(true) }>
                <Card.Header style={ { display: "flex" } }>
                    <div style={{width: "100%"}}>
                        {id}
                    </div>
                    <div style={ { display: "flex" }}>
                        <Led isOn={active} />
                        <p style={{fontSize: 10}}>active</p>
                        <Led isOn={connected} />
                        <p style={{fontSize: 10}}>connected</p>
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
            </Card>
            <Modal show={showDetailed}>
                <Modal.Header closeButton onHide={() => setShowDetailed(false)}>
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
        </Col>
    )
}

export default TraderInfo