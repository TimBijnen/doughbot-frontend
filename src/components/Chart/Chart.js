// import React from 'react'
// import { Chart } from 'react-charts'
import * as d3 from "d3";
 
const margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 960 - margin.left - margin.right,
    height = 240 - margin.top - margin.bottom;

const createChartLineD3 = ( data ) => {
    if ( data.length < 30 ) {
        let ndata = data.map( ( d, i ) => ({ date: i + 30 - data.length,  value: d, price: d }) )
        return [{date: 0, value: ndata[0].value, price: ndata[0].price }, ...ndata]
    }
    return data.map( ( d, i ) => ({ date: i,  value: d, price: d }) )
}
const ChartD3Component = ({data, levels}) => {
    if (data.length<3) {
        return <div></div>
    }
    data = createChartLineD3(data)
    // const yMinValue = d3.min(data, (d) => d.price)
    const yMinValue = levels.find((v) => v.label === 'cancel').value
    // const yMaxValue = d3.max(data, (d) => d.price)
    const yMaxValue = levels.find((v) => v.label === 'sell').value || levels.find((v) => v.label === 'buy').value
    const getX = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width]);

    const getY = d3
        .scaleLinear()
        .domain([yMinValue * 1.00, yMaxValue * 1.01])
        .range([height, 0]);

    const linePath = d3
        .line()
        .x((d) => getX(d.date))
        .y((d) => getY(d.price))
        .curve(d3.curveMonotoneX)(data);


    const createFlatLine = (value, start=0, end=29) => {
        return d3
        .line()
        .x((d) => getX(d.date))
        .y((d) => getY(d.value))
        .curve(d3.curveMonotoneX)([{date: start, value}, {date: end, value}]);
    }

    const buyLevel = levels.find((v) => v.label === 'buy').value
    const levelBuy = buyLevel && createFlatLine(buyLevel)
    const rebuyLevel = levels.find((v) => v.label === 'rebuy').value
    const levelRebuy = rebuyLevel && createFlatLine(rebuyLevel)
    const cancelLevel = levels.find((v) => v.label === 'cancel').value
    const levelCancel = cancelLevel && createFlatLine(cancelLevel)
    const sellLevel = levels.find((v) => v.label === 'sell').value
    const levelSell = sellLevel && createFlatLine(sellLevel)
    const breakEvenLevel = levels.find((v) => v.label === 'break_even').value
    const levelBreakEven = breakEvenLevel && createFlatLine(breakEvenLevel)
    
    return (
            <svg
                viewBox={`0 0 ${width + margin.left + margin.right} 
                                ${height + margin.top + margin.bottom}`}
            >
                
                {/* <g className="axis" ref={getYAxis} /> */}
                {/* <g
                    className="axis xAxis"
                    ref={getXAxis}
                    transform={`translate(0,${height})`}
                /> */}
                {/* <path fill={color} d={areaPath} opacity={0.3} /> */}
                { sellLevel && (
                    <path strokeWidth={3} fill="none" stroke="var(--bs-success)" d={levelSell} />
                )}
                { breakEvenLevel && (
                    <path strokeWidth={3} fill="none" stroke="var(--bs-secondary)" d={levelBreakEven} />
                )}
                { buyLevel && (
                    <path strokeWidth={3} fill="none" stroke="var(--bs-info)" d={levelBuy} />
                ) }
                { cancelLevel && (
                    <path strokeWidth={5} fill="none" stroke="var(--bs-danger)" d={levelCancel} />
                ) }
                { rebuyLevel && (
                    <path strokeWidth={3} fill="none" stroke="var(--bs-warning)" d={levelRebuy} />
                ) }

                <path strokeWidth={6} fill="none" stroke="url(#PriceLine)"  d={linePath} />
                {/* <text
                    transform={"rotate(-90)"}
                    x={0 - height / 2} y={0 - margin.left} dy="1em">
                    {"USD"}
                </text>
                <text
                    x={width / 2} y={0 - margin.top / 2} text-anchor="middle" >
                    {"USD to RUB Exchange Rates, 2020"}
                </text> */}
                {/* <a
                    className="subtitle"
                    href="https://www.moex.com/ru/index/rtsusdcur.aspx?tid=2552"
                    target="_blank">
                    <text x="0" y={height + 50}>
                        {"Source: Moscow Exchange"}
                    </text>
                </a> */}
      
                {/* {data.map((item, index) => {
                    return (
                        <g key={index}>
                        // hovering text 
                            <text
                                fill="#666"
                                x={getX(item.date)}
                                y={getY(item.price) - 20}
                                textAnchor="middle"
                            >
                                {index === activeIndex ? item.price : ""}
                            </text>
                           // hovering circle
                            <circle
                                cx={getX(item.date)}
                                cy={getY(item.price)}
                                r={index === activeIndex ? 6 : 4}
                                fill={color}
                                strokeWidth={index === activeIndex ? 2 : 0}
                                stroke="#fff"
                                style={{ transition: "ease-out .1s" }}
                            />
                        </g>
                    );
                })} */}
            </svg>
      );
          
}



// const createChartLine = ( data ) => data.map( ( d, i ) => [ i, d ] )

// const ChartComponent = ( { zeroLine, prices=[], levels=[], height=120, data, datas=[] } ) => {
//     const priceData = datas[ 0 ] || data || createChartLine( prices )
//     const lines = levels.filter( ( d ) => d.value > 0 ).map( ( d ) => ( { ...d, data: [ [ 0, d.value ], [ 29, d.value] ] } ) )
//     const zline = React.useMemo( () => {
//         if ( zeroLine ) {
//             const pds = priceData[ 0 ]
//             const pde = priceData[ priceData.length - 1 ]
//             if ( pds && pde ) {
//                 return [ {
//                     label: 'Zero',
//                     data: [ [ pds[ 0 ], 0 ], [ pde[ 0 ], 0 ] ]
//                 }, {
//                     label: 'Zero',
//                     data: [ [ pds[ 0 ], -0.1 ], [ pde[ 0 ], -0.1 ] ]
//                 }, {
//                     label: 'Zero',
//                     data: [ [ pds[ 0 ], -0.2 ], [ pde[ 0 ], -0.2 ] ]
//                 }, {
//                     label: 'Zero',
//                     data: [ [ pds[ 0 ], 0.1 ], [ pde[ 0 ], 0.1 ] ]
//                 }, {
//                     label: 'Zero',
//                     data: [ [ pds[ 0 ], 0.2 ], [ pde[ 0 ], 0.2 ] ]
//                 } ]
//             }
//         }
//         return []
//     }, [ priceData, zeroLine ] )
    
    
//     const getSeriesStyle = React.useCallback((series) => {
//         const colorPalette = {
//           break_even: "var(--bs-secondary)",
//           cancel: "var(--bs-danger)",
//           rebuy: "var(--bs-warning)",
//           buy: "var(--bs-info)",
//           sell: "var(--bs-success)",
//         };
    
//         return {
//           stroke: colorPalette[series.label],
//           fill: colorPalette[series.label],
//         };
//     }, []);


//     const d = React.useMemo(
//         () => [
//             {
//                 label: 'Price',
//                 data: datas[ 0 ] || priceData
//             },
//             // {
//             //     label: 'Price',
//             //     data: datas[ 1 ] || priceData
//             // },
//             // {
//             //     label: 'Price',
//             //     data: datas[ 2 ] || priceData
//             // },
//             ...lines,
//             ...zline,
//         ],
//         [priceData, lines, zline, datas]
//     )
  
//     const primaryAxes = React.useMemo(
//         () => ({
//         getValue: () => 0.01
//         }),
//         []
//     );

//     const secondaryAxes = React.useMemo(
//         () => [
//         {
//             getValue: () => 0.01,
//         },
//         ],
//         []
//     );
//     const axes = React.useMemo(
//         () => [
//             { primary: true, type: 'time', position: 'bottom' },
//             { type: 'linear', position: 'left' }
//         ],
//         []
//     )
 
//     return (
//         <div style={{height: height}}>
//             <Chart data={d} axes={axes} getSeriesStyle={getSeriesStyle}/>
//         </div>
//     )
// }

export default ChartD3Component
