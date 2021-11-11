import { Badge, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import moment from "moment"

const Sirb = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ data, setData ] = useState( {} )
    const onSirbTicker = ( d ) => {
        setData( { ...data, [ d.symbol ]: d } )
    }
    useEffect( () => {
        if ( connected ) {
            socket.on("sirb_ticker_client", onSirbTicker )
            return () => { socket.off( "sirb_ticker_client" )}
        }
    }, [ onSirbTicker ] )

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