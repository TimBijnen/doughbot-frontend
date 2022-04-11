import useTrades from "./hooks/useTrades"
import { Row } from "react-bootstrap"
import { CallStats, Filter } from "../../__components"

const TradesPage = () => {
    const [ { isLoading, error, trades, filters } ] = useTrades()
    

    return (
        <>  
            <Row>
                { filters.map( ( filter ) => (
                    <Filter { ...filter } />
                ) ) }
            </Row>
            <CallStats isLoading={ isLoading } error={ error }>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Symbol</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        { trades.map( ( trade ) => (
                            <tr>
                                <th>
                                    { trade.symbol }
                                </th>
                                <td>
                                    { trade.created_at }
                                </td>
                                <td>
                                    { trade.total_buy_value / trade.total_sell_value }
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </CallStats>
        </>
    )
}

export default TradesPage