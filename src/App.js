import Navbar from "./Navbar"
import Oversold from "./Oversold"
import Wallet from "./Wallet"
import Log from "./Log"
import Login, { AuthProvider, AuthBlocker} from "./Auth"
import Footer from "./Footer"
import Trades from "./Trades"
import Socket, { SocketProvider } from "./Socket"
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Audio from "./Audio"
import Settings from "./Settings"

const appStyle = {
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    height: "100vh",
}


const oversoldContainer = {
    overflowY: "auto",
}


const App = () => {
    return (
        <ToastProvider>
            <SocketProvider>
                <div className="App" style={ appStyle }>
                    <AuthProvider>
                        <Router>
                            <AuthBlocker />
                            <Audio />
                            <Socket />
                            <Navbar />
                                <Route path="/login" component={ Login } />
                                <div style={ oversoldContainer }>
                                    <Route exact path="/wallet" component={ Wallet } />
                                    <Route exact path="/oversold" component={ Oversold } />
                                    <Route exact path="/log" component={ Log } />
                                    <Route exact path="/trades" component={ Trades } />
                                    <Route exact path="/settings" component={ Settings } />
                                </div>
                            <Footer />
                        </Router>
                    </AuthProvider>
                </div>
            </SocketProvider>
        </ToastProvider>
    )
}

export default App;
