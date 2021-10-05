import { useState, useEffect } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "./Sentiment"
import Oversold from "./Oversold"
import SettingsDashboard from "./Settings"
import moment from 'moment'
import Wallet from "./Wallet"

// const uppStyle = {
//     maxHeight: "100%",
//     height: "100%",
// }

const appStyle = {
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    height: "100vh",
}

const oversoldContainer = {
    overflowY: "auto",
}

const App = () => {
    const [ isShowing, setIsShowing ] = useState()
    const [ now, setNow ] = useState( moment().format("HH:mm:ss") )
    const showModal = () => setIsShowing( true )
    const hideModal = () => setIsShowing( false )

    useEffect(() => {
        const interval = setInterval( () => setNow( moment().format("HH:mm:ss") ), 1000 )
        return () => clearInterval( interval )
    }, [])

    return (
        <div className="App" style={ appStyle }>
            <SettingsDashboard now={ now } show={ isShowing } onHide={ hideModal } />

            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand onClick={ showModal }>Doughbot</Navbar.Brand>
                        <div className="pull-right text-white">{ now }</div>
                    </Container>
                </Navbar>
                <Sentiment />
            </div>
            
            <div style={ oversoldContainer }>
                <Oversold />
            </div>

            <div>
                <footer>
                    <ul>
                        <Wallet />
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default App;
