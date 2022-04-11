import React from 'react'
import { Chart } from 'react-charts'
 


const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

const SentimentChartComponent = ( { zeroLine, prices=[], levels=[], height=200, data, datas=[] } ) => {
    const lines = datas.map( ( data, i ) => ( {
        label: [ "one", "four" ][ i ],
        data: createChartLine( data ),
    } ) )
    const zline = React.useMemo( () => {
        const pds = lines[ 0 ]?.data[ 0 ]
        const pde = lines[ 0 ]?.data[ lines[ 0 ].data.length - 1 ]
        if ( pds && pde ) {
            return [ {
                label: 'Zero',
                data: [ [ pds[ 0 ], 100 ], [ pde[ 0 ], 100 ] ]
            } ]
        }
        return []
    }, [ lines ] )
    
    
    const getSeriesStyle = React.useCallback((series) => {
        const colorPalette = {
          one: "var(--bs-info)",
          four: "var(--bs-secondary)",
        };
    
        return {
          stroke: colorPalette[series.label],
          fill: colorPalette[series.label],
        };
    }, []);


    const d = React.useMemo(
        () => [
            ...lines,
            ...zline,
        ],
        [lines, zline]
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
            <Chart data={d} axes={axes} getSeriesStyle={ getSeriesStyle }/>
        </div>
    )
}

export default SentimentChartComponent
