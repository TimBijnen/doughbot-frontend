import { Modal, Button } from "react-bootstrap"
import Settings from "./Settings"
import Health from "./Health"
import axios from "axios"

const Dashboard = ( { show, onHide } ) => {
    const restartStreams = async () => {
        const { data } = await axios.post("/api/restart-streams", {})
        console.log(data)
    }
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
                    <Button onClick={ restartStreams }>Restart collector</Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Dashboard