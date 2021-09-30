import useHealth from "./hooks/health"
import moment from "moment"

const Health = ( { key, value } ) => {
    const [ { health } ] = useHealth()
    const now = moment()
    const latest = moment( health.latest_received_candle, "DD-MM-YYYY HH:mm" )
    const diff = latest.diff( now, 'minutes' )

    return (
        <div>
            <label>
                Status
            </label>
            <p>
                { health.status }
            </p>

            <label>
                Latest candle received at:
            </label>
            <p>
                { `${ health.latest_received_candle } (${ diff } minutes)` }
            </p>
        </div>
    )
}

export default Health