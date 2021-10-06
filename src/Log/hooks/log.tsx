import { useEffect, useReducer } from 'react'
import axios from "axios"

const API = process.env.REACT_APP_API_URL

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

const useLog = () => {
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getLog = async () => {
        try {
            dispatch( { type: actions.LOAD } )
            const { data } = await axios.get( `${ API }/logs` )
            dispatch( { type: actions.SET_DATA, data: { items: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getLog()
        const interval = setInterval( getLog, 20000 )
        return () => clearInterval( interval )
    }, [])

    return [ state, { getLog }]
  }

export default useLog