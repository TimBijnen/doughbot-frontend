import { Badge, Container, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSocket } from "../Socket"
import Tickers from "./Tickers"
import Assets from "./Assets"
import { BinanceChart } from "../Chart"

const Sirb = ( { symbol } ) => {
    const [ { connected, socket } ] = useSocket()
    const [ data, setData ] = useState()

    const onSirb = ( data ) => {
        setData( "data" )
    }
    useEffect( () => {
        if ( connected ) {
            socket.on("sirb_client", onSirb )
            return () => { socket.off( "sirb_client" )}
        }
    }, [ onSirb ] )


    return (
        <>
            <Tickers />
            <hr />
            <Container fluid>
                <Row>
                    <Assets />
                </Row>

            </Container>
        </>
    )
}

export default Sirb