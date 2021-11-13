import { createContext, useReducer, useEffect } from 'react'
// import { useToasts } from "react-toast-notifications"
import socketIOClient from "socket.io-client";

export const actions = {
    LOAD: "LOAD",
    SET_DATA: "SET_DATA",
};

const initialReducerState = { connected: false }

const reducer = ( state, { type, data } ) => {
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

const SocketContext = createContext( undefined )

// const socket = socketIOClient("wss://doughbot.eindhovenintelligence.nl/socket.io");
// const socket = socketIOClient( "localhost:5000", { transports: [ "websocket" ] } )
const socket = socketIOClient( "doughbot.eindhovenintelligence.nl", { transports: [ "websocket" ] } )
// const socket = socketIOClient( { transports: [ 'websocket' ], rememberUpgrade: false } );
function SocketProvider( { children } ) {
    const [ state, dispatch ] = useReducer( reducer, initialReducerState )
    const value = { state, dispatch }
    // const { addToast } = useToasts()

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connect")
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