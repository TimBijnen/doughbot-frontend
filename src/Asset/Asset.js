import { Card, Badge } from "react-bootstrap"
import styled from "styled-components"

const AssetName = styled.div`
    @keyframes blink {
        from { color: var(--bs-info)}
        20% { color: var(--bs-info)}
        to { color: black }
    }
    animation: blink 0.75s;
    font-weight: bold;
`

const Asset = ( { asset, qty, avg_value, avg_percentage } ) => {
    const avgPercentage = parseInt(avg_percentage * 10000, 10) / 100
    const avgValue = parseInt(avg_value * 100000, 10) / 100000

    return (
        <Card className="small" bg={ avgPercentage > 10.2 || avgPercentage < 9.8 ? "success" : "light" }>
            <Card.Header className="p-1">
                <div key={avgPercentage}>
                    <AssetName>
                        { asset }
                        <span className="float-end">
                            { `${ avgPercentage }%` }
                        </span>
                    </AssetName>
                </div>
                <div>
                    ${ avgValue }
                    <span className="float-end">
                        { qty }
                    </span>
                </div>
            </Card.Header>
        </Card>
    )
}

export default Asset