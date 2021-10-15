import { useState } from "react"
import { Button } from "react-bootstrap"
import Settings from "./Settings"
// import Health from "./Health"
import Rules from "./Rules/Rules"
import axios from "axios"

const Dashboard = ( { show, onHide, ...props } ) => {
    const [ confirmRestart, setConfirmRestart ] = useState()
    const restartStreams = async () => {
        const { data } = await axios.post("/api/restart-streams", {})
        console.log(data)
    }
    const handleRestart = () => {
        if ( confirmRestart ) {
            restartStreams()
            setConfirmRestart(false)
        } else {
            setConfirmRestart(true)
            setTimeout( () => setConfirmRestart( false ), 1500 )
        }
    }
    
    return (
        <div>
            <Settings { ...props } />
            {/* <Health /> */}
            <Button variant={ confirmRestart ? "warning" : "secondary" } onClick={ handleRestart }>{ confirmRestart ? 'Confirm restart' : 'Restart collector' }</Button>
            <Rules />
        </div>
    )
}

export default Dashboard