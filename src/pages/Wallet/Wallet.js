import { Table, Button } from "react-bootstrap"
import useWallet from "./hooks/wallet"

const Wallet = () => {
    const [ state, { getAccountData } ] = useWallet()

    return (
        <div>
            <div>
                <div>
                    Wallet info
                    <Button onClick={ getAccountData }>
                        { state.isLoading ? "Loading..." : "Reload" }
                    </Button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Free</th>
                            <th>Locked</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { state.items.map( ( a ) => (
                            <tr key={ a.asset }>
                                <td>
                                    { a.asset }
                                </td>
                                <td>
                                    { a.free }
                                </td>
                                <td>
                                    { a.locked }
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