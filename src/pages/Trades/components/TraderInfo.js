import { Card, Row, Col, Button } from "react-bootstrap"
import { Led } from "../../../components/Icon"
import moment from "moment"

const TraderInfo = ({ id, active, connected, status, symbol, sid, start_time }) => {
    const cardBorder = active ? 'success' : 'warning'
    const setActive = () => {}
    return (
        <Col>
            <Card border={cardBorder}>
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
                        <p style={{fontSize: 10}}>{moment.unix(start_time).format()}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TraderInfo