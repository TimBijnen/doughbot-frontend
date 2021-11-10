import { Badge, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Asset from '../Asset'
import moment from "moment"
import { ChartSirb } from "../Chart"


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

    return (
        <Col xs={ 12 }>
                
            { Object.entries( data ).sort( ( [ _, av ], [ x, bv ] ) => av.avg_value > bv.avg_value ? -1 : 1).map( ( [ k, v ] ) => (
                <Row>
                    <Col xs={ 2 }>
                        <Asset { ...v } />
                    </Col>
                    <Col xs={8}>
                        <ChartSirb height={100} nextPrice={ v.avg_value } levels={ [] }/>
                    </Col>        
                </Row>
            ) ) }
        </Col>        
    )
}

export default Assets