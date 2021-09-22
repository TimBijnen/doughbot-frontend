import Indicator from "./Indicator"

const Sentiment = () => {
    const data = [
        { label: "1h", value: 70 },
        { label: "4h", value: 99 },
        { label: "24h", value: 120 },
    ]

    return (
        <div className="d-flex">
            { data.map( Indicator ) }
        </div>
    )
}

export default Sentiment