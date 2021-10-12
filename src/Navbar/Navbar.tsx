import { useState, useEffect } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "../Sentiment"
import SettingsDashboard, { useSettings } from "../Settings"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ { isTraderActive: ita } ] = useSettings()
    const [ isShowing, setIsShowing ] = useState<boolean>()
    const [ isTraderActive, setIsTraderActive ] = useState<boolean>( ita )
    const [ { user }, ] = useAuth()
    const showModal = () => setIsShowing( true )
    const hideModal = () => setIsShowing( false )
    
    useEffect( () => setIsTraderActive( ita ), [ ita ] )

    return (
        <div className="shadow">
            <SettingsDashboard show={ isShowing } onHide={ hideModal } setIsTraderActive={ setIsTraderActive }/>
            <Navbar bg={ isTraderActive ? "primary" : "secondary" } variant="dark" >
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