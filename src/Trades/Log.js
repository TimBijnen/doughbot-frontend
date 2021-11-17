import { Badge } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../Socket"
import moment from "moment"

const Log = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ log, setLog ] = useState( {} )
    const [ amtOfBuyFetches, setAmtOfBuyFetches ] = useState( 0 )
    const [ amtOfSellFetches, setAmtOfSellFetches ] = useState( 0 )
    const [ amtOfUpdates, setAmtOfUpdates ] = useState( 0 )
    const onExecute = useCallback( ( data ) => {
        if ( data.symbol === symbol ) {
            const time = moment().unix()
            let nextLog = {}
            let nextEntry = data
            if ( data.details === "Update order" ) {
                setAmtOfUpdates( ( a ) => a + 1 )
            } else if ( data.details === "Fetch BUY order" ) {
                setAmtOfBuyFetches( ( a ) => a + 1 )
            } else if ( data.details === "Fetch SELL order" ) {
                setAmtOfSellFetches( ( a ) => a + 1 )
            } else if ( nextEntry.details === "Stop" ) {
                // setLog( {} )
            } else {
                nextEntry = { ...data, time }
                nextLog = { ...log, [ time ]: [ data, ...( log[ time ] || [ { amount: 1 } ] ) ] }
                setLog( nextLog )
            }
        }
    }, [ setLog, symbol, log ] )
    useEffect( () => {
        if ( connected ) {
            socket.on("did_execute_client", onExecute )
            return () => { socket.off( "did_execute_client" )}
        }
    }, [ onExecute, connected, socket ] )

    return (
        <div style={{maxHeight: 200, overflow: 'scroll'}}>
            <Badge>Sell fetches { amtOfSellFetches }</Badge>
            <Badge>Buy fetches { amtOfBuyFetches }</Badge>
            <Badge>Updates { amtOfUpdates }</Badge>
            { Object.entries( log ).sort( ( [ta], [tb] ) => ta > tb ? -1 : 1 ).map( ( [ t, l ], i ) => (
                <div className="small">
                    <div><Badge>{ moment.unix( t ).format( "HH:mm:ss" ) }</Badge></div>
                    { l.map( ( (_l,i) => (
                        <div key={ `${ _l.details }${ i }` } className="small">{ _l.details } { _l.amount > 1 && <Badge>{ _l.amount }</Badge>}</div>
                    ) ) ) }
                </div>
            ) ) }
        </div>
    )
}

export default Log