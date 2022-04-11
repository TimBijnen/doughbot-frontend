import { Button, Container, Navbar } from "react-bootstrap"
import { useAuth } from "../Auth"
import Timer from "./Timer"

const Nav = () => {
    const [ , { logout }] = useAuth()
    
    return (
        <div className="shadow">
            <Navbar bg={ true ? "primary" : "secondary" } variant="dark" >
                <Container>
                    <Navbar.Brand>Doughbot</Navbar.Brand>
                    <Timer />
                    <Button onClick={ logout }>Logout</Button>
                </Container>
            </Navbar>
        </div>
    )
}

export default Nav