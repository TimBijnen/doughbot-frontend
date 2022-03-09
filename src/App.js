import Navbar from "./Navbar"
import Oversold from "./Oversold"
import Wallet from "./Wallet"
import Log from "./Log"
import Login, { AuthProvider, AuthBlocker} from "./Auth"
import Footer from "./Footer"
import TradesPage from "./pages/Trades/Page"
import TradePage from "./Trades/Trade/Page"
import Dashboard from "./pages/Dashboard"
import Socket, { SocketProvider } from "./Socket"
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Audio from "./Audio"
import Settings from "./Settings"
import Sirb from "./Sirb"
import Simulations from "./Simulations"
import Sentiment from "./Sentiment"


const appStyle = {
    display: "grid",
    gridTemplateRows: "10px 56px 48px auto 32px",
    height: "100vh",
}


const oversoldContainer = {
    overflowY: "auto",
}


const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <SocketProvider>
                    <div className="App" style={ appStyle }>
                        <Router>
                            <AuthBlocker />
                            <Audio />
                            <Socket />
                            <Navbar />
                            <Footer />
                            <Route path="/login" component={ Login } />
                            <div style={ oversoldContainer }>
                                <Route exact path="/" component={ Dashboard } />
                                <Route exact path="/wallet" component={ Wallet } />
                                <Route exact path="/oversold" component={ Oversold } />
                                <Route exact path="/sirb" component={ Sirb } />
                                <Route exact path="/log" component={ Log } />
                                <Route exact path="/trades" component={ TradesPage } />
                                <Route exact path="/trades/:id" component={ TradePage } />
                                <Route exact path="/settings" component={ Settings } />
                                <Route path="/simulations" component={ Simulations } />
                            </div>
                            <Sentiment />
                        </Router>
                    </div>
                </SocketProvider>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App;
