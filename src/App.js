import Navbar from "./Navbar"
import Oversold from "./Oversold"
import Wallet from "./Wallet"
import Log from "./Log"
import Login, { AuthProvider, AuthBlocker} from "./Auth"
import Footer from "./Footer"
import { ToastProvider } from 'react-toast-notifications';

import {
    BrowserRouter as Router,
    Route,
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
    return (
        <ToastProvider>
                    <div className="App" style={ appStyle }>
                    <AuthProvider>
                <Router>
                    <AuthBlocker />
                        <Navbar />
                        
                                <Route path="/login" component={ Login } />
                        <div style={ oversoldContainer }>
                            <Route exact path="/wallet" component={ Wallet } />
                            <Route exact path="/oversold" component={ Oversold } />
                            <Route exact path="/log" component={ Log } />
                        </div>
            
                        <Footer />
                </Router>
                    </AuthProvider>
                    </div>
        </ToastProvider>
    )
}

export default App;
