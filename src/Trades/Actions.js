import { Button } from "react-bootstrap"
// import { Trades } from "../Trades"
import axios from 'axios'
import { useState } from "react"

const API = process.env.REACT_APP_API_URL

const TradeActions = ( { prices = {}, isFinished = false } ) => {
    const [ sellFill, setSellFill ] = useState( 0 )
    const [ buyFill, setBuyFill ] = useState( 0 )
    const [ speed, setSpeed ] = useState( 1 )
    const [ runner, setRunner ] = useState()
    const startTrade = () => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': 'start' } )
    }
    const stopTrade = () => {
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': 'stop' } )
    }
    const action = ( action, target="", amount="" ) => {
        if ( action === "speed" ) {
            if ( amount > 5 ) {
                amount = 1
            }
            setSpeed( amount )
        }
        axios.post( `${ API }/simulations`, { 'module': 'doughbot', 'action': action, 'target': target, amount } )
    }
    
    const setFilled = ( target ) => {
        if ( target === 'sell' ) {
            const next = sellFill + 20 > 100 ? 100 : sellFill + 20
            setSellFill( next )
            clearTimeout( runner )
            setRunner( setTimeout( () => {
                action( 'fill', 'sell', next )
                setSellFill( 0 )
            }, 1000) )
        }
        if ( target === 'buy' ) {
            const next = buyFill + 20 > 100 ? 100 : buyFill + 20
            setBuyFill( next )
            clearTimeout( runner )
            setRunner( setTimeout( () => {
                action( 'fill', 'buy', next )
                setBuyFill( 0 )
            }, 1000) )
        }
    }
    return (
        <div className="d-flex">
            <Button size="sm" onClick={ startTrade }>Start simulations</Button>
            <Button size="sm" onClick={ stopTrade }>Stop simulations</Button>
            <div>Actions</div>
            <Button size="sm" disabled={ !prices.s } onClick={ () => action( 'set_price', 'sell' ) }>Sell price</Button>
            <Button size="sm" disabled={ !prices.b } onClick={ () => action( 'set_price', 'buy' ) }>Buy price</Button>
            <Button size="sm" disabled={ !prices.rb } onClick={ () => action( 'set_price', 'rebuy' ) }>Rebuy price</Button>
            <Button size="sm" disabled={ !prices.c }onClick={ () => action( 'set_price', 'cancel' ) }>Cancel price</Button>
            <Button size="sm" onClick={ () => setFilled( 'buy' ) }>Fill buy ({ buyFill }%)</Button>
            <Button size="sm" onClick={ () => setFilled( 'sell' ) }>Fill sell ({ sellFill }%)</Button>
            <Button size="sm" onClick={ () => action( 'speed', 'prices', speed + 1 ) }>Speed {speed}</Button>
            <Button size="sm" disabled={ !isFinished } onClick={ () => action( 'store_simulation' ) }>Store</Button>
        </div>
    )
}

export default TradeActions