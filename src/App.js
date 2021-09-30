import { useState, useEffect } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "./Sentiment"
import Oversold from "./Oversold"
import SettingsDashboard from "./Settings"
import moment from 'moment'

const App = () => {
    const [ isShowing, setIsShowing ] = useState()
    const [ now, setNow ] = useState( "00:00:00" )
    const showModal = () => setIsShowing( true )
    const hideModal = () => setIsShowing( false )

    useEffect(() => {
        const interval = setInterval( () => setNow( moment().format("hh:mm:ss") ), 1000 )
        return () => clearInterval( interval )
    }, [])

    return (
        <div className="App">
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand onClick={ showModal }>Doughbot</Navbar.Brand>
                    <div className="pull-right text-white">{ now }</div>
                </Container>
            </Navbar>
            <Sentiment />
            <Oversold />
            <SettingsDashboard show={ isShowing } onHide={ hideModal } />
            
        </div>
    );
}

export default App;
