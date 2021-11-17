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

const useTrades = ( date: any ) => {
    const [ state, dispatch ] = useReducer(reducer, { trades: [] })
    
    const getTrades = async ( date: any ) => {
        try {
            dispatch( { type: actions.LOAD, data: { trades: [] } } )
            const { data } = await axios.get( `api/trades`)
            dispatch( { type: actions.SET_DATA, data: { trades: data.data } } )
        } catch ( error: any ) {
            console.log(error)
        }
    }

    const getSettings = async () => {
        const { data } = await axios.get( `/api/trades/settings` )
        dispatch( { type: actions.SET_DATA, data: { settings: data.settings } } )
    }
    
    const toggleActive = async () => {
        const { data } = await axios.post( `/api/trades/settings`, { is_active: !state.settings?.is_active } )
        dispatch( { type: actions.SET_DATA, data: { settings: data.settings } } )
    }

    useEffect( () => {
        getSettings()
        getTrades( date )
    }, [ date ])

    return [ state, { getTrades, toggleActive }]
  }

export default useTrades