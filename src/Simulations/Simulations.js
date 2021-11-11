import { Link, Route } from "react-router-dom"
import { Tabs, Tab } from "react-bootstrap"
import DoughbotSimulator from "./Doughbot"
import SirbSimulator from "./Sirb"

const Simulations = () => {
    return (
        <>
            <div className="text-center d-flex">
                <Link className="w-100" to="/simulations/doughbot">Doughbot</Link>
                <Link className="w-100" to="/simulations/sirb">Sir Balancealot</Link>
            </div>
            <div>
                <Route exact path="/simulations/doughbot" component={ DoughbotSimulator } />
                <Route exact path="/simulations/sirb" component={ SirbSimulator } />
            </div>
        </>
    )
}

export default Simulations