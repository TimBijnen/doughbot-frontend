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
const socket = socketIOClient();

function SocketProvider( { children }: any ) {
    const [ state, dispatch ] = useReducer( reducer, initialReducerState )
    const value = { state, dispatch }
    // const { addToast } = useToasts()
    // const [ socket, setSocket ] = useState()

    useEffect(() => {
        socket.on("connect", () => {
            console.log("notify")
            dispatch( { type: actions.SET_DATA, data: { connected: true, socket } } )
        });
        return () => { socket.disconnect() }
    }, [  ]);



    return (
        <SocketContext.Provider value={ value }>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider
export { SocketContext }