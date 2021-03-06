import React from 'react'
import { Chart } from 'react-charts'
 


const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

const ChartComponent = ( { zeroLine, prices=[], levels=[], height=200, data, datas=[] } ) => {
    const priceData = datas[ 0 ] || data || createChartLine( prices )
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
    
    
    const getSeriesStyle = React.useCallback((series) => {
        const colorPalette = {
          break_even: "var(--bs-secondary)",
          cancel: "var(--bs-danger)",
          rebuy: "var(--bs-warning)",
          buy: "var(--bs-info)",
          sell: "var(--bs-success)",
        };
    
        return {
          stroke: colorPalette[series.label],
          fill: colorPalette[series.label],
        };
    }, []);


    const d = React.useMemo(
        () => [
            {
                label: 'Price',
                data: datas[ 0 ] || priceData
            },
            // {
            //     label: 'Price',
            //     data: datas[ 1 ] || priceData
            // },
            // {
            //     label: 'Price',
            //     data: datas[ 2 ] || priceData
            // },
            ...lines,
            ...zline,
        ],
        [priceData, lines, zline, datas]
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
            <Chart data={d} axes={axes} getSeriesStyle={getSeriesStyle}/>
        </div>
    )
}

export default ChartComponent
