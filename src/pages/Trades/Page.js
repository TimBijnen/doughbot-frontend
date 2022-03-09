import { useTrades } from "."
import { CallStats, DataFilter } from "../../Components"

const TradesPage = () => {
    const [ { isLoading, error, trades, filters } ] = useTrades()
    

    return (
        <>
            <DataFilter filters={ filters } />
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