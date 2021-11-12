import { useState, useEffect, useCallback } from "react";
import axios from "axios"
import Chart from "../Chart";
import { Button } from "react-bootstrap";

const SirbSimulator = () => {
    const [ focussed, setFocussed ] = useState( [] )
    const [ compared, setCompared ] = useState( [] )
    const [ tickers, setTickers ] = useState( [] )
    const [ loading, setLoading ] = useState( 0 )
    const [ currentTicker, setCurrentTicker ] = useState()
    // const 
    const [ toggle, setToggle ] = useState()
    const loadFocussed = useCallback( async (symbol) => {
        if ( !symbol || loading ) {
            return
        }
        setLoading( true )
        const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ symbol }&interval=1m`)
        setFocussed( data.map( ( d ) => [ d[ 0 ], d[ 4 ] ] ) )
        setLoading( false )
    }, [ loading ])
    const loadTickers = useCallback( async () => {
        // debugger
        setLoading( true )
        const { data } = await axios.get(`https://api.binance.com/api/v3/ticker/bookTicker`)
        setTickers( data.map( ( d ) => d.symbol ).filter( d => d.endsWith( "BTC") ) )
        setLoading( false )
        // loadFocussed()
    }, [  ])
    const loadCompared = useCallback( async (symbol) => {
        if ( !symbol || loading ) {
            return
        }
        setLoading( true )
        const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ symbol }&interval=1m`)
        setCompared( data.map( ( d ) => [ d[ 0 ], d[ 4 ] ] ) )
        setLoading( false )
    }, [ loading ])

    useEffect( () => {
        if ( !loading && tickers.length === 0 ) {
            loadTickers()
            
        }
        return () => {} 
    }, [ tickers, loading, loadTickers ] )
    const loadNext = useCallback(() => {
        let nt = tickers[ Math.round(Math.random() * tickers.length) - 1 || 0 ]
        while ( nt === currentTicker ) {
            nt = tickers[ Math.round(Math.random() * tickers.length) - 1 ]
        }
        if ( nt ) {
            if ( toggle ) {
                loadFocussed( nt )
            } else {
                loadCompared( nt )
            }
            setToggle( !toggle )
            setCurrentTicker( nt )
        }
    }, [ toggle, currentTicker, tickers, loadFocussed, loadCompared ])
    if ( compared.length === 0 || focussed.length === 0 ) {
        return <Button onClick={ loadNext }>Start</Button>
    }
    const diff = {}
    // let f_high = 0
    let f_high = focussed[ 0 ] ? focussed[ 0 ][ 1 ] : 0
    let f_low = Number.MAX_SAFE_INTEGER
    // let c_high = 0
    let c_high = compared[ 0 ] ? compared[ 0 ][ 1 ] : 0
    let c_low = Number.MAX_SAFE_INTEGER
    focussed.forEach( f => {
        // if ( f[ 1 ] > f_high ) {
        //     f_high = f[ 1 ]
        // }
        if ( f[ 1 ] < f_low ) {
            f_low = f[ 1 ]
        }
        diff[ f[ 0 ] ] = { focussed: f[ 1 ] }
    } )
    compared.forEach( f => {
        // if ( f[ 1 ] > c_high ) {
        //     c_high = f[ 1 ]
        // }
        if ( f[ 1 ] < c_low ) {
            c_low = f[ 1 ]
        }
        diff[ f[ 0 ] ] = { ...diff[ f[ 0 ] ], compared: f[ 1 ] }
    } )
    let first
    let signals = true
    const _diff_f = []
    const _diff_c = []
    const _diff = Object.entries( diff ).map( ( [ k, v ] ) => {
        if ( !first ) {
            first = k
        }
        if ( v.focussed && v.compared ) {
            const _vf = v.focussed / f_high - 1
            const _vc = v.compared / c_high - 1
            const _v = (_vf + _vc)/2
            _diff_f.push( [ k - first, _vf ] )
            _diff_c.push( [ k - first, _vc ] )
            // console.log()
            signals = signals || _v < -0.2 || _v > 0.2
            return [ k - first, _v ]
        }
        return null
    } ).filter( ( a ) => a )
    if ( signals && tickers.length > 0 ) {
        console.log(currentTicker)
    }
    return (
        <div>
            <h1>Sirb Simulator</h1>
            {/* foc */}
            <Button disabled={ loading || signals } onClick={ loadNext }>Next</Button>
            <Button disabled={ !loading && !signals } onClick={ loadNext }>Proceed</Button>
            <Chart data={ focussed.map( ( ( [ k, v ] ) => [k - focussed[ 0 ][ 0 ], v ] ) ) } />
            <h4>{ currentTicker }
            </h4>
            { compared && signals && (
            <>
            <Chart zeroLine datas={ [_diff, _diff_f, _diff_c] } />
            { signals && "!!"}
            <Chart data={ compared.map( ( ( [ k, v ] ) => [k - compared[ 0 ][ 0 ], v ] ) ) } />
                </>
            )}
        </div>
    )
}

export default SirbSimulator