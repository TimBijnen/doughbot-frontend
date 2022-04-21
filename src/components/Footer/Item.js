import styled from "styled-components"
import { Link } from "react-router-dom";


const StyledItem = styled.div`
    height: 24px;
    line-height: 24px;
    &:hover {
        background-color: var(--bs-primary);
        cursor: pointer;
    }
    &:hover a {
        color: white;
    }
`


const Item = ( { link, children, ...props } ) => (
    <StyledItem {...props}>
        <Link className="d-block" to={ link }>
            { children }
        </Link>
    </StyledItem>
)

export default Item