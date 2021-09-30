import { Modal } from "react-bootstrap"
import Settings from "./Settings"
import Health from "./Health"
import moment from "moment"

const Dashboard = ( { show, onHide, now } ) => {
    
    return (
        <div>
            <Modal show={ show } onHide={ onHide }>
                <Modal.Header closeButton>
                    Info
                </Modal.Header>
                <Modal.Body>
                    <label>
                        API URL:
                    </label>
                    <p>
                        { process.env.REACT_APP_API_URL }
                    </p>
                    <Settings />
                    <Health />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Dashboard