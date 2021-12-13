import { Col } from "react-bootstrap"
import { useState, useEffect, useCallback } from "react"
import { useSocket } from "../Socket"
import Asset from '../Asset'
import { BinanceChart } from "../Chart"
import { useToasts } from "react-toast-notifications"
// import axios from "axios"
// const API = process.env.REACT_APP_API_URL


const Assets = () => {
    const [ { connected, socket } ] = useSocket()
    const [ data, setData ] = useState( {} )
    const { addToast } = useToasts()
    
    const onSirb = useCallback( ( d ) => {
        if ( d.asset ) {
            setData( ( _data ) => ( { ..._data, [d.asset.asset]: d.asset } ) ) 
        }
    }, [ setData ] )
    
    const onSirbNotify = useCallback( ( d ) => {
        addToast( d.message, { appearance: "info", autoDismiss: false } )
    }, [ addToast ] )

    useEffect( () => {
        // const { data } = await axios.get(`${ API }/sirb/logs`)
        if ( connected ) {
            socket.on("sirb_client", onSirb )
            socket.on("sirb_notify_client", onSirbNotify )
            return () => { socket.off( "sirb_client" )}
        }
    }, [ onSirb, connected, socket, onSirbNotify ] )
    // const avg = Object.entries( data ).reduce( ( b, [ k, v ] ) => b + v.avg_value, 0) / Object.entries( data ).length
    const sorted = Object.entries( data ).sort( ( [ ka, va ], [ kb, vb ] ) => va.avg_value < vb.avg_value ? 1 : -1 )
    
    if ( sorted.length < 1 ) {
        return null
    }
    
    const assets = sorted.map( ( [ k, v ] ) => v.asset )
    return (
        <>
            <Col xs={ 2 }>
                Total: {sorted.reduce( ( a, [ k, v ] ) => a + v.avg_value, 0 ).toFixed(2) }<br />
                Total percentage: {sorted.reduce( ( a, [ k, v ] ) => a + v.avg_percentage, 0 ).toFixed(2) }
                { sorted.map( ( [ k, v ] ) => (
                    <Asset key={ k } { ...v } />
                ) ) }
            </Col>        
            <Col xs={9}>
                <BinanceChart tickers={ assets } />
                {/* <ChartSirb assets={ sorted } /> */}
            </Col>
        </>
    )
}

export default Assets