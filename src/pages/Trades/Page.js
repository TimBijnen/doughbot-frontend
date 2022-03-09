import { useTrades } from "."
import { Row } from "react-bootstrap"
import { CallStats, Filter } from "../../Components"

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
                { trades.map( ( trade ) => (
                    <div>
                        { trade.symbol }
                        { trade.created_at }
                    </div>
                ) ) }
            </CallStats>
        </>
    )
}

export default TradesPage