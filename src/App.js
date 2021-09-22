import { Container, Navbar } from "react-bootstrap"
import Sentiment from "./Sentiment"
import Oversold from "./Oversold"

function App() {
    return (
        <div className="App">
            <Navbar bg="primary">
                <Container>
                    <Navbar.Brand href="#home">Doughbot</Navbar.Brand>
                </Container>
            </Navbar>
            <Sentiment />
            <Oversold />
        </div>
    );
}

export default App;
