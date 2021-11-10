import { Badge, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Trade from "./Trade"
import moment from "moment"

const Log = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ log, setLog ] = useState( {} )
    const [ lastEntry, setLastEntry ] = useState( {} )

    const onExecute = ( data ) => {
        if ( data.symbol == symbol ) {
            let amount = 1
            const time = moment().unix()
            // if ( !log[ time ] ) {
            //     setLog( { [ time ]: [], ...log } )
            // }
            let nextLog = {}
            let nextEntry = data
            if ( lastEntry.details == data.details ) {
                amount = 3
                // nextEntry = { ...log[ lastEntry.time ][ 0 ], amount }
                nextLog = { ...log, [ lastEntry.time ]: [ { ...log[ lastEntry.time ][ 0 ], amount } ] }
            } else {
                nextEntry = { ...data, time }
                setLastEntry( nextEntry )
                nextLog = { ...log, [ time ]: [ data, ...( log[ time ] || [ { amount: 1 } ] ) ] }
            }
            if ( nextEntry.details === "Stop" ) {
                setLog( {} )
            }
            setLog( nextLog )
        }
    }
    useEffect( () => {
        if ( connected ) {
            socket.on("did_execute_client", onExecute )
            return () => { socket.off( "did_execute_client" )}
        }
    }, [ onExecute ] )

    return (
        <>
            { Object.entries( log ).sort( ( [ta], [tb] ) => ta > tb ? -1 : 1 ).map( ( [ t, l ], i ) => (
                <div className="small">
                    <div><Badge>{ moment.unix( t ).format( "HH:mm:ss" ) }</Badge></div>
                    { l.map( ( (_l,i) => (
                        <div key={ `${ _l.details }${ i }` } className="small">{ _l.details } { _l.amount > 1 && <Badge>{ _l.amount }</Badge>}</div>
                    ) ) ) }
                </div>
            ) ) }
        </>
    )
}

export default Log