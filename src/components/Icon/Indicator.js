import styled from "styled-components"

const Wrapper = styled.div`
    background-color: var(--bs-error);
    `
    
const Bar = styled.div`
    height: ${ ( { percentage } ) => percentage }%;
    background-color: var(--bs-danger);
`

const Indicator = ( { percentage } ) => {
    return (
        <Wrapper>
            <Bar percentage={ percentage } />
        </Wrapper>
    )
}

export default Indicator