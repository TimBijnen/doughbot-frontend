import { useEffect, useReducer } from 'react'
import { useSocket } from '../../Socket';

const actions = {
    LOAD: "LOAD",
    SET_DATA: "SET_DATA",
};

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

const useSentiment = () => {
    const [ state, dispatch ] = useReducer(reducer, {})
    const [ { socket } ] = useSocket()
    
    useEffect( () => {
        const onUpdateSentiment = async ( data ) => {
            try {
                dispatch( { type: actions.SET_DATA, data: { sentiment: data } } )
            } catch ( error ) {
                console.log(error)
            }
        }
        if ( socket ) {
            if ( socket.connected ) {
                console.log("Connected")
                socket.on( "update_sentiment", onUpdateSentiment )
            }
            return () => socket.off( "update_sentiment", onUpdateSentiment )
        }
      
    }, [ socket, socket?.connected ])

    return [ state ]
  }

export default useSentiment