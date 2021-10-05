import { useState } from "react"
import { Table, Button } from "react-bootstrap"
import useWallet from "./hooks/wallet"

const Wallet = () => {
    const [ isWalletVisible, setIsWalletVisible ] = useState()
    const toggleWallet = () => setIsWalletVisible( !isWalletVisible )
    const [ state, { getAccountData } ] = useWallet()

    return (
        <div>
            <div onClick={ toggleWallet }>
                Wallet { state.isLoading && "Loading..."}
            </div>
            { isWalletVisible && (
                <div>
                    <div>
                        Wallet info
                        <Button onClick={ getAccountData }>Reload</Button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Free</th>
                                <th>Locked</th>
                            </tr>
                        </thead>
                        <tbody>
                    { state.items.map( ( a ) => (
                        <tr>
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
            ) }
        </div>
    )
}

export default Wallet