import { useState } from "react"
import { Table, Button } from "react-bootstrap"
import useLogin from "./hooks/login"

const Wallet = () => {
    const [ isVisible, setIsVisible ] = useState()
    const toggleLog = () => setIsVisible( !isVisible )
    const [ state, { getLog } ] = useLogin()

    return (
        <div>
            <div onClick={ toggleLog }>
                Log { state.isLoading && "Loading..."}
            </div>
            { isVisible && (
                <div>
                    <div>
                        <Button onClick={ getLog }>Reload</Button>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>coin</th>
                                <th>details</th>
                            </tr>
                        </thead>
                        <tbody>
                    { state.items.map( ( a ) => (
                        <tr>
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
            ) }
        </div>
    )
}

export default Wallet