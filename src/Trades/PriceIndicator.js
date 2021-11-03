import styled from "styled-components"
const IndicatorBar = styled.div`
position: relative;
height: 48px;
`

const Indicator = styled.div`
position: absolute;
width: ${ ( { tiny, medium } ) => tiny ? 4 : medium ? 8 : 16 }px;
height: ${ ( { tiny, medium } ) => tiny ? 4 : medium ? 8 : 16 }px;
background-color: var(--bs-success);
top: 50%;
left: ${( { left } ) => left}%;
transform: translate(-50%, -50%);
border-radius: 50%;
transition: all ${ ( { tiny, medium } ) => tiny ? 0.2 : medium ? 4 : 10 }s;
opacity: ${ ( { tiny, medium } ) => tiny ? 1 : medium ? 0.4 : 0.2 };
`
const Stroke = styled.div`
position: absolute;
width: 16px;
height: 100%;
background-color: var(--bs-success);
left: ${( { left } ) => left}%;
transform: translateX(-50%);
background-color: var(--bs-${({ bg }) => bg || "secondary" });
color: ${({ bg }) => ['warning'].indexOf(bg) >= 0 ? "black" : "white" };
`

const StrokeLabel = styled.div`
font-size: 0.7rem;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%) rotate(-90deg);
white-space: nowrap;
`

const PriceIndicator = ( { levels, value } ) => {
    const sorted = levels.filter((a) => a.value).sort( (a, b) => a?.value > b?.value ? 1 : -1)
    const min = sorted[0]?.value < value ? sorted[0].value : value 
    const max = (sorted[sorted.length - 1]?.value) > value ? (sorted[sorted.length - 1]?.value) : value
    // console.log(sorted, min, max)
    const getLeft = (v) => {
        return (v-min) / (max-min) * 90 + 5
    }
    
    return (
        <IndicatorBar className="border">
            { sorted.map( (l) => (
                <Stroke bg={ l.bg } left={getLeft(l.value)}>
                    <StrokeLabel>{ l.label }</StrokeLabel>
                </Stroke>
            ) ) }
            <Indicator left={getLeft(value)}/>
            <Indicator medium left={getLeft(value)}/>
            <Indicator tiny left={getLeft(value)}/>
        </IndicatorBar>
    )

}

export default PriceIndicator