import { useState } from "react"
import { Card, Col, Modal, Button } from "react-bootstrap"
import { Led } from "../../../components/Icon"
import moment from "moment"
import axios from "axios"

const TraderInfo = ({ id, active, connected, status, symbol, sid, start_time }) => {
    const cardBorder = active ? 'success' : 'warning'
    const [ showDetailed, setShowDetailed ] = useState(false)
    const setActive = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/doughbot/traders/${sid}/${active?"deactivate":"activate"}`)
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
                        <p style={{fontSize: 10}}>{moment.unix(start_time).format()}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Modal show={showDetailed} close={() => setShowDetailed(false)}>
                <Modal.Title>
                    Ttel
                </Modal.Title>
                <Modal.Body>
                    <Button onClick={ setActive }>
                        { active ? "Deactivate" : "Activate" }
                    </Button>
                </Modal.Body>

            </Modal>
        </Col>
    )
}

export default TraderInfo