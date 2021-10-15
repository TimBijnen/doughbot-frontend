import { Table } from "react-bootstrap"
import Rule from "./Rule"

const rules = [
    { 
        name: "strategy 1",
        sentiment: [{
            state: -1,
        }, { 
            state: 0
        }, {
            state: 1
        }],
        "buy_timeout": 5,
        "sell_timeout": 60,
        "buy_value": 0.5,
        "sell_value": -3,
    },
    { 
        name: "strategy 2",
        sentiment: [{
            state: 1,
        }, { 
            state: 0
        }, {
            state: 1
        }],
        "buy_timeout": 3,
        "sell_timeout": 12,
        "buy_value": 1.5,
        "sell_value": -1,
    }
]

const tableHeaders = [ "Name", "Sentiment", "Buy timeout", "Sell timeout", "Buy value", "Sell value" ]

const Rules = () => {
    return (
        <Table>
            <thead>
                { tableHeaders.map( ( header ) => (
                    <th>{ header }</th>
                ) ) }
            </thead>
            <tbody>
                { rules.map( ( rule ) => (
                    <Rule rule={ rule } />
                ) ) }
            </tbody>
        </Table>
    )
}

export default Rules