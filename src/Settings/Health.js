import useHealth from "./hooks/health"
import moment from "moment"

const Health = ( { key, value } ) => {
    const [ { health } ] = useHealth()
    const now = moment()
    const latest = moment.utc( health.latest_received_candle )
    const diff = latest.diff( now, 'minutes' )

    return (
        <div>
            <label>
                Status
            </label>
            <p>
                { health.status || "" }
            </p>

            <label>
                Latest candle received at:
            </label>
            <p>
                { `${ latest.local().format( "DD-MM-YYYY HH:mm:ss" ) } (${ diff } minutes)` }
            </p>
        </div>
    )
}

export default Health