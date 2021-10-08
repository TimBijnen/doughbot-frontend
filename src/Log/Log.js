import { Table, Button } from "react-bootstrap"
import useLog from "./hooks/log"
import moment from "moment"


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
                    {/* <ButtonGroup>
                        <Button>Errors</Button>
                        <Button>Warnings</Button>
                        <Button>All</Button>
                    </ButtonGroup> */}
                </div>
                <Table striped className="small">
                    <thead>
                        <tr>
                            <th>created</th>
                            <th>severity</th>
                            <th>status</th>
                            <th>module</th>
                            <th>coin</th>
                            <th>details</th>
                        </tr>
                    </thead>
                    <tbody>
                        { state.items.map( ( a, i ) => (
                            <tr key={ i }>
                                <td>
                                    { moment(a.created_at).format("DD-MM-YY HH:mm") }
                                </td>
                                <td>
                                    { a.severity }
                                </td>
                                <td>
                                    { a.status }
                                </td>
                                <td>
                                    { a.module }
                                </td>
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