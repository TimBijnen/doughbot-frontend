import { Badge, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Asset from '../Asset'
import moment from "moment"
import { ChartSirb } from "../Chart"
import { BinanceChart } from "../Chart"

const Assets = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ data, setData ] = useState( {} )
    const onSirb = ( d ) => {
        if ( d.asset ) {
            setData( { ...data, [d.asset.asset]: d.asset } )
        }
    }
    useEffect( () => {
        if ( connected ) {
            socket.on("sirb_client", onSirb )
            return () => { socket.off( "sirb_client" )}
        }
    }, [ onSirb ] )
    const avg = Object.entries( data ).reduce( ( b, [ k, v ] ) => b + v.avg_value, 0) / Object.entries( data ).length
    const levels = [
        {'value': avg * 0.98},
        {'value': avg},
        {'value': avg * 1.02},
    ]
    const sorted = Object.entries( data ).sort( ( [ ka, va ], [ kb, vb ] ) => va.avg_value < vb.avg_value ? 1 : -1 )
    if ( sorted.length < 1 ) {
        return null
    }
    const assets = sorted.map( ( [ k, v ] ) => v.asset )
    return (
        <>
            <Col xs={ 2 }>
                { sorted.map( ( [ k, v ] ) => (
                    <Asset key={ k } { ...v } />
                ) ) }
            </Col>        
            <Col xs={9}>
                <BinanceChart tickers={ assets } />
                <ChartSirb assets={ sorted } />
            </Col>
        </>
    )
}

export default Assets