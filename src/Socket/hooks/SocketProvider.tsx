import { createContext, useReducer, useEffect } from 'react'
import { useToasts } from "react-toast-notifications"
import socketIOClient from "socket.io-client";

export const actions = {
    LOAD: "LOAD",
    SET_DATA: "SET_DATA",
};

const initialReducerState = { connected: false }

const reducer = ( state: any, { type, data }: any ) => {
    switch (type) {
        case actions.LOAD:
            return { ...state, ...data, isLoading: true }
        case actions.SET_DATA:
            return { ...state, ...data, isLoading: false }
        default:
            console.error("Not implemented", type)
            return { ...state, ...data, isLoading: false }
    }
}

const SocketContext = createContext<any|undefined>( undefined )

function SocketProvider( { children }: any ) {
    const [ state, dispatch ] = useReducer( reducer, initialReducerState )
    const value = { state, dispatch }
    const { addToast } = useToasts()
    // const [ socket, setSocket ] = useState()

    useEffect(() => {
        const socket = socketIOClient();
        socket.on("log", data => {
            const appearance = ['error', 'info', 'success', 'warning'].includes( data.status ) ? data.status : "info"
            addToast(`${data.coin} ${data.details}`, { appearance, autoDismiss: appearance !== "error" })
        });
        socket.on("connect", () => {
            dispatch( { type: actions.SET_DATA, data: { connected: true, socket } } )
        });
        // setSocket( socket )
        return () => { socket.disconnect() }
    }, [ addToast ]);



    return (
        <SocketContext.Provider value={ value }>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider
export { SocketContext }