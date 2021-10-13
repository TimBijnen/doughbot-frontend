import { useContext } from "react";
import { SocketContext } from "./SocketProvider"

const useSocket = () => {
    const context = useContext( SocketContext )
    
    if ( context === undefined ) {
        throw new Error('useSocket must be used within a SocketProvider')
    }

    const { state } = context

    return [ state ]
}

export default useSocket