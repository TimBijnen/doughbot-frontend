import { Button, Container, Navbar } from "react-bootstrap"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ , { logout }] = useAuth()
    
    return (
        <Navbar bg={ true ? "primary" : "secondary" } variant="dark" className="bg-gradient p-none">
            <Container>
                <Navbar.Brand>Doughbot</Navbar.Brand>
                <Timer />
                <Button variant="dark" size="sm" onClick={ logout }>Logout</Button>
            </Container>
        </Navbar>
    )
}

export default Nav