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

const useHealth = () => {
    const [ state, dispatch ] = useReducer(reducer, { health: {} })
    
    const getHealth = async () => {
        try {
            dispatch( { type: actions.LOAD, data: { health: {} } } )
            const { data } = await axios.get( `${ API }/health` )
            dispatch( { type: actions.SET_DATA, data: { health: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getHealth()
    }, [])

    return [ state, { getHealth }]
  }

export default useHealth