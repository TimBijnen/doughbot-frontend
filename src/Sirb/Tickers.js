import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../Socket"

const Sirb = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ data, setData ] = useState( {} )
    const onSirbTicker = useCallback( ( d ) => {
        setData( ( _data ) => ( { ..._data, [ d.symbol ]: d } ) )
    }, [ setData ] )
    useEffect( () => {
        if ( connected ) {
            socket.on("sirb_ticker_client", onSirbTicker )
            return () => { socket.off( "sirb_ticker_client" )}
        }
    }, [ onSirbTicker, connected, socket ] )

    return (
        <div className="d-flex small">
            { Object.entries( data ).map( ( [ k, v ] ) => (
                <div className="w-100 text-center small">
                    <b>{ k }</b>
                    <br />
                    <i>{ v.price }</i>
                </div>  
            ) ) }
        </div>
    )
}

export default Sirb