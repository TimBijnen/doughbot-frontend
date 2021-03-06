import styled from "styled-components"

const Container = styled.div`
    font-size: 0.75rem;
`

const BarContainer = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 4px;
    border-top: 2px solid var(--bs-${ ( { type } ) => type });
    border-bottom: 2px solid var(--bs-${ ( { type } ) => type });
`
    
const BarInner = styled.div`
    height: 100%;
    width: ${ ( { width } ) => width }%;
    background-color: var(--bs-${ ( { type = "info" } ) => type });
    overflow: visible;
    text-align: center;
    white-space: nowrap;
    // border-radius: 4px;
    color: ${ ( { type = "info" } ) => type !== "info" ? "white" : "black" };
`

const BarAppend = styled.div`
    min-width: 80px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Bar = ( { value, target, cancelled, market } ) => {
    const isFilled = value === target && value > 0
    const type = isFilled ? market ? "warning" : "success" : cancelled ? "danger" : "info"
    let width
    let text
    if ( isFilled ) {
        text = "FILLED"
        width = 100
    } else if ( !value && cancelled ) {
        text = "CANCELLED"
        width = 100
    } else {
        width = value / target * 100
        text = `${ parseInt( value / target * 10000, 10 ) / 100 }%`
    }

    return (
        <Container className="d-flex h-100">
            <BarContainer type={ type }>
                <BarInner className="d-flex" width={ width } type={ type }>
                    <div className="m-auto small">
                        { text}
                    </div>
                </BarInner>
            </BarContainer>
            <BarAppend className="m-auto">
                { value.toFixed(2) || 0 } / { target.toFixed(2) }
            </BarAppend>
        </Container>
    )
}

export default Bar