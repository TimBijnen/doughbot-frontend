import { Table, Button } from "react-bootstrap"
import useLog from "./hooks/log"

const Wallet = () => {
    const [ state, { getLog } ] = useLog()

    return (
        <div>
                <div>
                    <div>
                        Logs 
                        <Button onClick={ getLog }>
                            { state.isLoading ? "Loading..." : "Reload" }
                        </Button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>coin</th>
                                <th>details</th>
                            </tr>
                        </thead>
                        <tbody>
                    { state.items.map( ( a, i ) => (
                        <tr key={ i }>
                            <td>
                                { a.coin }
                            </td>
                            <td>
                                { a.details }
                            </td>
                        </tr>
                    ) ) }
                    </tbody>
                    </Table>
                </div>
        </div>
    )
}

export default Wallet