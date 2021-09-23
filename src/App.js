import { useState } from "react"
import { Container, Navbar, Modal } from "react-bootstrap"
import Sentiment from "./Sentiment"
import Oversold from "./Oversold"
import SettingsDashboard from "./Settings"

const App = () => {
    const [ isShowing, setIsShowing ] = useState()

    const showModal = () => setIsShowing( true )
    const hideModal = () => setIsShowing( false )

    return (
        <div className="App">
            <Navbar bg="primary">
                <Container>
                    <Navbar.Brand onClick={ showModal }>Doughbot</Navbar.Brand>
                </Container>
            </Navbar>
            <Sentiment />
            <Oversold />
            <SettingsDashboard show={ isShowing } onHide={ hideModal } />
            
        </div>
    );
}

export default App;
