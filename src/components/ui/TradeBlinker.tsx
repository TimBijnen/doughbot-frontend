import styled from "styled-components"

type TProps = {
    bg: string
}

const TradeBlinker = styled.div<TProps>`
    @keyframes tradeBlink_success {
        from { background-color: rgba(var(--bs-success-rgb),0.6); }    
        49% { background-color: rgba(var(--bs-success-rgb),0.6); }    
        50% { background-color: transparent; }    
    }
    @keyframes tradeBlink_warning {
        from { background-color: rgba(var(--bs-warning-rgb),0.6); }    
        49% { background-color: rgba(var(--bs-warning-rgb),0.6); }    
        50% { background-color: transparent; }    
    }
    @keyframes tradeBlink_info {
        from { background-color: rgba(var(--bs-info-rgb),0.6); }    
        49% { background-color: rgba(var(--bs-info-rgb),0.6); }    
        50% { background-color: transparent; }    
    }
    animation: tradeBlink_${ ( { bg } ) => bg } 1s;
    background-color: transparent;
    font-weight: bold;
    animation-iteration-count: ${ ( { bg } ) => bg === 'info' ? 1 : 10 };
    position: absolute;
    right: -11px;
    width: 10px;
    height: 100%;
    top: 0;
`

export default TradeBlinker