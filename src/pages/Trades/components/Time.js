import moment from "moment"

const Time = ( { start, end, startTimestamp } ) => {
    if (!start) {
        start = moment()
    }
    if (startTimestamp) {
        start = moment.unix(startTimestamp)
    }
    if (!end) {
        end = moment()
    }
    const secondsDiff = end.diff(start, 'seconds')
    const seconds = secondsDiff % 60
    const minutes = parseInt( secondsDiff / 60 ) % 60
    const hours = parseInt( secondsDiff / 3600 ) 
    return (
        <div>
            {hours}h { minutes }m { seconds }s
        </div>
    )
}

export default Time