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
    min-width: 40px;
    text-align: right;
`

const Bar = ( { value, target, cancelled } ) => {
    const isFilled = value === target
    const type = isFilled ? "success" : cancelled ? "danger" : "info"
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
        text = `${ value || 0 } (${parseInt(value / target * 100, 10)}%)`
    }

    return (
        <Container className="d-flex h-100">
            <BarContainer type={ type }>
                <BarInner className="d-flex" width={ width } type={ type }>
                    <div className="m-auto">
                        { text}
                    </div>
                </BarInner>
            </BarContainer>
            <BarAppend className="m-auto">
                { target }
            </BarAppend>
        </Container>
    )
}

export default Bar