import React from 'react'
import { Chart } from 'react-charts'
 
const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

const ChartComponent = ( { prices, levels } ) => {
    const priceData = createChartLine( prices )
    const lines = levels.filter( ( d ) => d.value > 0 ).map( ( d ) => ( { ...d, data: [ [ 0, d.value ], [ 29, d.value] ] } ) )
    const data = React.useMemo(
        () => [
            {
                label: 'Price',
                data: priceData
            },
            ...lines
        ],
        [priceData]
    )
 
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
 
    return (
        <div style={{height: 200}}>
            <Chart data={data} axes={axes} />
        </div>
    )
}

export default ChartComponent
