import Indicator from "./Indicator"
import useSentiment from "./hooks/sentiment"
import { LockIcon } from "../Icon"

const Sentiment = ( { authorized }: any ) => {
    const [{ sentiment, isLoading }] = useSentiment()
    
    if ( isLoading ) {
        return <div className="text-center" style={ { lineHeight: "32px" } }>Loading</div>
    }
    if ( !authorized ) {
        return <div className="text-center" style={ { lineHeight: "32px" } }><LockIcon /></div>
    }
    if ( !sentiment ) {
        return <div>No data</div>
    }
    const data = [
        { label: "1h", value: sentiment.one_h },
        { label: "4h", value: sentiment.four_h },
        { label: "24h", value: sentiment.one_d },
    ]
    return (
        <div className="d-flex">
            { data.map( Indicator ) }
        </div>
    )
}

export default Sentiment