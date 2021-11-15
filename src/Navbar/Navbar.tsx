import { useState, useEffect } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import Sentiment from "../Sentiment"
import { useSettings } from "../Settings"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ { isTraderActive: ita } ] = useSettings()
    const [ isTraderActive, setIsTraderActive ] = useState<boolean>( ita )
    const [ { user }, { logout }] = useAuth()
    
    useEffect( () => setIsTraderActive( ita ), [ ita ] )

    return (
        <div className="shadow">
            <Navbar bg={ isTraderActive ? "primary" : "secondary" } variant="dark" >
                <Container>
                    <Navbar.Brand>Doughbot</Navbar.Brand>
                    <Timer />
                    <Button onClick={ logout }>Logout</Button>
                </Container>
            </Navbar>
            <Sentiment authorized={ !!user } />
        </div>
    )
}

export default Nav