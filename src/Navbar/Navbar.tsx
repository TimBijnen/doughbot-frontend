import { useState } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "../Sentiment"
import SettingsDashboard from "../Settings"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ isShowing, setIsShowing ] = useState<boolean>()
    const [ { user }, ] = useAuth()
    const showModal = () => setIsShowing( true )
    const hideModal = () => setIsShowing( false )

    return (
        <div className="shadow">
            <SettingsDashboard show={ isShowing } onHide={ hideModal } />
            <Navbar bg="primary" variant="dark" >
                <Container>
                    <Navbar.Brand onClick={ showModal }>Doughbot</Navbar.Brand>
                    <Timer />
                </Container>
            </Navbar>
            <Sentiment authorized={ !!user } />
        </div>
    )
}

export default Nav