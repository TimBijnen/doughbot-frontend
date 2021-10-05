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

const useSettings = () => {
    const [ state, dispatch ] = useReducer(reducer, { settings: [] })
    
    const getSettings = async () => {
        try {
            dispatch( { type: actions.LOAD, data: { settings: [] } } )
            const { data } = await axios.get( `${ API }/settings` )
            dispatch( { type: actions.SET_DATA, data: { settings: data.data } } )
        } catch ( error: any ) {
        }
    }
    
    const updateSetting = async (key: any, value: any) => {
        const { data } = await axios.post( `${ API }/settings`, { key, value } )
        if ( data === "Success" ) {
            dispatch( { type: actions.SET_DATA, data: { settings: state.settings.map( ( s: any ) => s.key === key ? { key, value } : s ) } } )
        }
    }

    useEffect( () => {
        getSettings()
    }, [])

    return [ state, { updateSetting }]
  }

export default useSettings