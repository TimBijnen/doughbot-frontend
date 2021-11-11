import React from 'react'
import { Chart } from 'react-charts'
 
const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

const ChartComponent = ( { zeroLine, prices=[], levels=[], height=200, data } ) => {
    const priceData = data || createChartLine( prices )
    const lines = levels.filter( ( d ) => d.value > 0 ).map( ( d ) => ( { ...d, data: [ [ 0, d.value ], [ 29, d.value] ] } ) )
    const zline = React.useMemo( () => {
        if ( zeroLine ) {
            const pds = priceData[ 0 ]
            const pde = priceData[ priceData.length - 1 ]
            if ( pds && pde ) {
                return [ {
                    label: 'Zero',
                    data: [ [ pds[ 0 ], 0 ], [ pde[ 0 ], 0 ] ]
                }, {
                    label: 'Zero',
                    data: [ [ pds[ 0 ], -0.1 ], [ pde[ 0 ], -0.1 ] ]
                }, {
                    label: 'Zero',
                    data: [ [ pds[ 0 ], -0.2 ], [ pde[ 0 ], -0.2 ] ]
                }, {
                    label: 'Zero',
                    data: [ [ pds[ 0 ], 0.1 ], [ pde[ 0 ], 0.1 ] ]
                }, {
                    label: 'Zero',
                    data: [ [ pds[ 0 ], 0.2 ], [ pde[ 0 ], 0.2 ] ]
                } ]
            }
        }
        return []
    }, [ priceData, zeroLine ] )
    const d = React.useMemo(
        () => [
            {
                label: 'Price',
                data: priceData
            },
            ...lines,
            ...zline,
        ],
        [priceData, lines, zline]
    )
    // const x = React.useMemo(
    //     () => [
    //         { label: "", data: focussed },
    //         { data: compared },
    //         { data: diff }
    //     ],
    //     [ focussed, compared, diff]
    // )
 
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
 
    return (
        <div style={{height: height}}>
            <Chart data={d} axes={axes} />
        </div>
    )
}

export default ChartComponent
