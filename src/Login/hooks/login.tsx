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

const useLogin = () => {
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getLogin = async () => {
        try {
            dispatch( { type: actions.LOAD } )
            const { data } = await axios.get( `${ API }/login` )
            dispatch( { type: actions.SET_DATA, data: { items: data.data } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getLogin()
        // const interval = setInterval( getLogin, 20000 )
        // return () => clearInterval( interval )
    }, [])

    return [ state, { getLogin }]
  }

export default useLogin