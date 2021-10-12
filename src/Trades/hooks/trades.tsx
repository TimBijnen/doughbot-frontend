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

const useTrades = () => {
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getTrades = async () => {
        try {
            dispatch( { type: actions.LOAD, data: { items: [] } } )
            const { data } = await axios.get( `/api/trades` )
            dispatch( { type: actions.SET_DATA, data: { items: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getTrades()
    }, [])

    return [ state, { getTrades }]
  }

export default useTrades