import { Modal } from "react-bootstrap"
import Settings from "./Settings"
import Health from "./Health"

const Dashboard = ( { show, onHide } ) => {
    return (
        <div>
            <Modal show={ show } onHide={ onHide }>
                <Modal.Header closeButton>
                    Info
                </Modal.Header>
                <Modal.Body>
                    API URL: { process.env.REACT_APP_API_URL }
                    <Settings />
                    <Health />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Dashboard