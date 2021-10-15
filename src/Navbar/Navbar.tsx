import { useState, useEffect } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "../Sentiment"
import { useSettings } from "../Settings"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ { isTraderActive: ita } ] = useSettings()
    const [ isTraderActive, setIsTraderActive ] = useState<boolean>( ita )
    const [ { user }, ] = useAuth()
    
    useEffect( () => setIsTraderActive( ita ), [ ita ] )

    return (
        <div className="shadow">
            <Navbar bg={ isTraderActive ? "primary" : "secondary" } variant="dark" >
                <Container>
                    <Navbar.Brand>Doughbot</Navbar.Brand>
                    <Timer />
                </Container>
            </Navbar>
            <Sentiment authorized={ !!user } />
        </div>
    )
}

export default Nav