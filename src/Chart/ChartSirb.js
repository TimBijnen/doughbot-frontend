import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import moment from 'moment'

const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

const ChartComponent = ( { nextPrice=null, prices=[], levels=[], height=200 } ) => {
    const [ _prices, _setPrices ] = useState( prices )
    const [ _nextPrice, setNextPrice ] = useState( nextPrice )
    useEffect(() => {
        if ( nextPrice != _prices[ _prices.length - 1 || 0] ) {
            _setPrices( [ ..._prices.slice(1), nextPrice ])
        }
    }, [ nextPrice, _prices ] )
    useEffect(() => {
        const setPrice = () => {
            if (prices.length > 120) {
                _setPrices( [ ..._prices.slice(1), nextPrice ])
            } else {
                _setPrices( [ ..._prices, nextPrice ])
            }
        }
        const timeout = setInterval( setPrice, 25 * _prices.length )
        return () => { clearInterval( timeout ) }
    }, [ nextPrice, _prices ] )
    const priceData = createChartLine( _prices )
    const lines = levels.filter( ( d ) => d.value > 0 ).map( ( d ) => ( { ...d, data: [ [ 0, d.value ], [ 29, d.value] ] } ) )
    const data = React.useMemo(
        () => [
            {
                label: 'Price',
                data: priceData
            },
            ...lines
        ],
        [priceData, lines]
    )
 
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
 
    return (
        <div style={{height: height}}>
            <Chart data={data} axes={axes} />
        </div>
    )
}

export default ChartComponent
