import Navbar from "./components/Navbar"
import Oversold from "./pages/Oversold"
import Wallet from "./pages/Wallet"
import Login, { AuthProvider, AuthBlocker} from "./components/Auth"
import Footer from "./components/Footer"
import TradesPage from "./pages/Trades/Page"
import TradePage from "./pages/Trades/Trade/Page"
import Dashboard from "./pages/Dashboard"
import Socket, { SocketProvider } from "./components/Socket"
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Audio from "./components/Audio"
import Sentiment from "./components/Sentiment"


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
        <ToastProvider transitionDuration={0}>
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
                                <Route exact path="/trades" component={ TradesPage } />
                                <Route exact path="/trades/:id" component={ TradePage } />
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
