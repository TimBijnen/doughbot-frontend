import { createContext, useReducer, useEffect } from 'react'
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

function SocketProvider( { children } ) {
    const [ state, dispatch ] = useReducer( reducer, initialReducerState )
    const value = { state, dispatch }
    // const { addToast } = useToasts()
    
    useEffect(() => {
        // const socket = socketIOClient( "doughbot.eindhovenintelligence.nl", { transports: [ "websocket" ] } )
        const socket = socketIOClient( "http://localhost:5000", { transports: [ "websocket" ] } )
        socket.on("user_authenticated", (response) => {
            console.log(response)
            dispatch( { type: actions.SET_DATA, data: { connected: true, socket } } )
        });
        socket.on("connect", (response) => {
            console.log("Connect", response)
            dispatch( { type: actions.SET_DATA, data: { connected: true, socket } } )
        });
        return () => { 
            console.log("disconnect")
            socket.disconnect()
        }
    }, [  ]);



    return (
        <SocketContext.Provider value={ value }>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider
export { SocketContext }