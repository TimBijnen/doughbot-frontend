import { useState, useEffect } from "react"
import { Container, Navbar } from "react-bootstrap"
import Sentiment from "./Sentiment"
import Oversold from "./Oversold"
import SettingsDashboard from "./Settings"
import moment from 'moment'
import Wallet from "./Wallet"
import Log from "./Log"
import Login from "./Login"
import { CoinIcon, LogIcon, WalletIcon } from "./Icon"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


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

    const isLoggedIn = false
    return isLoggedIn ? (
        <Router>
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
                    <Switch>
                        <Route path="/login" component={ Login } />
                        <Route path="/wallet" component={ Wallet } />
                        <Route path="/oversold" component={ Oversold } />
                        <Route path="/log" component={ Log } />
                    </Switch>
                </div>

                <div>
                    <footer className="d-flex">
                        <div className="w-100 text-center">
                            <Link to="/oversold">
                                <CoinIcon />
                            </Link>
                        </div>
                        <div className="w-100 text-center">
                            <Link to="/wallet">
                                <WalletIcon />
                            </Link>
                        </div>
                        <div className="w-100 text-center">
                            <Link to="/log">
                                <LogIcon />
                            </Link>
                        </div>
                    </footer>
                </div>
            </div>
        </Router>
    ) : <Login />
}

export default App;
