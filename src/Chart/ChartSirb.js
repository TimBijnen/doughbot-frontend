import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import moment from 'moment'
import styled from 'styled-components'

const Overlay = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
opacity: 0.1;
`

const getCorrectedIndex = ( i, data ) => i + ( 120 - data.length )
const createChartLine = ( data=[], b=[] ) => [
    ...data.map( ( d, i ) => [ getCorrectedIndex( i, data ), d ] ),
    ...b.map( ( d, i ) => [ getCorrectedIndex( data.length, data ) + (d.timestamp % 5) / 5, d ] ),
    ...( b.length ? [ [ getCorrectedIndex( data.length, data ) + 1, b[ b.length - 1 ] ] ] : [] ),
]

const ChartComponent = ( { assets=[], closed=false, nextPrice=null, prices=[], levels=[], height=200 } ) => {
    const [ closedPrices, setClosedPrices ] = useState([])
    const [ _prices, _setPrices ] = useState( prices )
    // const [ _nextPrice, setNextPrice ] = useState( nextPrice )
    const [ previousMinute, setPreviousMinute ] = useState()
    const [ assetPrices, setAssetPrices ] = useState( {} )
    // useEffect(() => {
    //     const minute = parseInt(moment().unix() / 30, 10) * 30
    //     if ( !previousMinute || (minute > previousMinute) ) {
    //         const _assets = {} 
    //         Object.entries( assetPrices ).map( ( [ k, v ] ) => {
    //             const l = v.length - 1
    //             const e = l >= 0 ? l : 0
    //             const s = e >= 30 ? e - 30 : 0
    //             _assets[ k ] = v.slice(s, e)
    //         } )
    //         setAssetPrices( _assets )
    //         setPreviousMinute( minute )
    //     }
    // }, [ assetPrices, previousMinute ] )
    useEffect(() => {
        if ( assets.length > 0 ) {
            const _assets = { ...assetPrices }
            assets.map( r => r[ 1 ] ).forEach( ( a ) => {
                if ( !_assets[ a.asset ] ) {
                    _assets[ a.asset ] = []
                }
                if ( _assets[ a.asset ][ 0 ]?.avg_value !== a.avg_value ) {
                    const timestamp = moment().unix()
                    const e = _assets[ a.asset ].length - 1
                    const s = e >= 30 ? e - 30 : 0
                    const na = e < 30 ? _assets[ a.asset ] : [..._assets[ a.asset ].slice( 1, 29 )]
                    _assets[ a.asset ] = [ ...na, { ...a, timestamp } ]
                }
            } )
            setAssetPrices( () => _assets )
        }
    }, [ assets, previousMinute ] )
    const priceData = createChartLine( closedPrices, _prices )
    let pd = {}
    priceData.forEach( _pd => pd[ _pd.asset ] = [ ...( pd[ _pd.asset ] || [] ), _pd ])
    const lines = levels.filter( ( d ) => d.value > 0 ).map( ( d ) => ( { ...d, data: [ [ 0, d.value ], [ closedPrices.length + 1, d.value] ] } ) )
    console.log(assetPrices)
    const data = React.useMemo(
        () => Object.entries( assetPrices ).map( ( [ k, v ] ) => ( { label: k, data: v.map( ( { avg_value }, i ) => [ i, avg_value ] ) } ) ),
        [assetPrices, lines]
    )
 
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
 
    return (
        <div style={{height: height, position: 'relative'}}>
            {/* <Overlay>
                <h1>{ asset }</h1>
            </Overlay> */}
            <Chart data={data} axes={axes} />
        </div>
    )
}

export default ChartComponent
