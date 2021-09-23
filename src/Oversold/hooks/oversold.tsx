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

const useOversold = () => {
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getOversoldData = async () => {
        try {
            dispatch( { type: actions.LOAD, data: { items: [] } } )
            const { data } = await axios.get( `${ API }/oversold` )
            dispatch( { type: actions.SET_DATA, data: { items: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getOversoldData()
    }, [])

    return [ state, { getOversoldData }]
  }

export default useOversold