import styled from "styled-components"

type TProps = {
    width: number
    height: number
}

const ChartBackground = styled.div<TProps>`
    ${ ( { width, height } ) => `
        width: ${ width }px;
        height: ${ height }px;
        background: linear-gradient(90deg, transparent, white)
    `}
`

export default ChartBackground