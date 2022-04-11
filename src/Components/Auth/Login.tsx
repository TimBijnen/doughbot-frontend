import { Form, Button, Modal } from "react-bootstrap"
import { useAuth } from "."
import { Redirect } from "react-router"

const LoginPage = () => {
    const [ { user }, { authenticate } ] = useAuth()

    const submitLoginForm = async ( e: any ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const loginForm: FormData = new FormData();
        loginForm.append( "username", form.elements.loginUsername.value )
        loginForm.append( "password", form.elements.loginPassword.value )
        authenticate( loginForm )
    }
    
    return user ? <Redirect to="/oversold" /> : (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Jij mag er niet zomaar in</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={ submitLoginForm }>
                    <Form.Group controlId="loginUsername">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control type="username" placeholder="Gebruikersnaam" />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Label>Wachtwoord</Form.Label>
                        <Form.Control type="password" placeholder="Wachtwoord" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Inloggen
                    </Button>
                </Form>
            </Modal.Body>
        </Modal.Dialog>
    )
}

export default LoginPage