import { useState } from "react"
import { Dot } from "../../Icon"

const getType = ( state ) => state > 0 ? "success" : state < 0 ? "danger" : "secondary"

const Sentiment = ( { sentiment }) => {
    const [ _sentiment, setSentiment ] = useState( sentiment )
    const handleClick = ( index, rule ) => () => {
        const s = _sentiment
        s[ index ].state = (rule.state + 2) % 3 - 1
        console.log(s[ index ])
        setSentiment( [ ...s ] )
    }
    return (
        <div className="d-flex">
            { _sentiment.map( ( s, i ) => (
                <>
                { console.log(getType( s.state))}
                <Dot type={ getType( s.state) } onClick={ handleClick( i, s ) } />
                </>
            ) ) }
        </div>
    )
}

export default Sentiment