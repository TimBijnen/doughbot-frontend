import { useState } from "react"
import { Table, Button } from "react-bootstrap"
import useLogin from "./hooks/login"

const Wallet = () => {
    const [ isVisible, setIsVisible ] = useState()
    const toggleLog = () => setIsVisible( !isVisible )
    const [ state, { getLog } ] = useLogin()

    return (
        <div>
            Login
        </div>
    )
}

export default Wallet