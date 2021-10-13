import styled from "styled-components"

const Container = styled.div`
    font-size: 0.75rem;
`

const BarContainer = styled.div`
    height: 100%;
    width: 100%;
`
    
const BarInner = styled.div`
    height: 100%;
    width: ${ ( { width } ) => width }%;
    background-color: var(--bs-info);
    overflow: visible;
    text-align: center;
    white-space: nowrap;
    border-radius: 4px;
`

const BarAppend = styled.div`
    min-width: 40px;
    text-align: right;
`

const Bar = ( { value, target } ) => {
    return (
        <Container className="d-flex h-100">
            <BarContainer>
                <BarInner className="d-flex" width={ value / target * 100 }>
                    <div className="m-auto">
                        { `${ value || 0 } (${value / target * 100}%)` }
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