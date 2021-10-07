import styled from "styled-components"
import { Link } from "react-router-dom";


const StyledItem = styled.div`
    height: 48px;
    line-height: 48px;
    &:hover {
        background-color: var(--bs-primary);
        cursor: pointer;
    }
    &:hover a {
        color: white;
    }
`


const Item = ( { link, children } ) => (
    <StyledItem className="w-100 text-center">
        <Link className="d-block" to={ link }>
            { children }
        </Link>
    </StyledItem>
)

export default Item