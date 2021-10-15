import Sentiment from "./Sentiment"

const Rule = ( { rule } ) => {
    return (
        <tr>
            <td>
                { rule.name}
            </td>
            <td>
                <Sentiment sentiment={ rule.sentiment } />
            </td>
            <td>
                { rule.buy_timeout }
            </td>
            <td>
                { rule.sell_timeout }
            </td>
            <td>
                { rule.buy_value }
            </td>
            <td>
                { rule.sell_value }
            </td>
        </tr>
    )
}

export default Rule