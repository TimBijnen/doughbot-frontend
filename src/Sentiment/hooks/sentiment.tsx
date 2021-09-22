import { useEffect, useReducer } from 'react'
import axios from "axios"

const actions = {
    LOAD: "LOAD",
    SET_DATA: "SET_DATA",
};

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

const useOversold = () => {
    const [ state, dispatch ] = useReducer(reducer, {  })
    
    const getSentiment = async () => {
        try {
            dispatch( { type: actions.LOAD, data: {  } } )
            const { data } = await axios.get( `http://localhost:5000/sentiment` )
            dispatch( { type: actions.SET_DATA, data: { sentiment: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getSentiment()
    }, [])

    return [ state, { getSentiment }]
  }

export default useOversold