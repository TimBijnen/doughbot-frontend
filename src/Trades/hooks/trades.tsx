import { useEffect, useReducer } from 'react'
import axios from "axios"
import moment from "moment"

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
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getTrades = async ( date: any ) => {
        try {
            dispatch( { type: actions.LOAD, data: { items: [] } } )
            // let { start, end } = date
            // start = moment.utc( start ).format("YYYY-MM-DD HH:mm")
            // end = moment.utc( end ).format("YYYY-MM-DD HH:mm")
            // const { data: sentiment } = await axios.get( `/api/reporting/sentiment-trades?start_date=${ start }&end_date=${ end }` )
            const { data } = await axios.get( `api/trades`)
            dispatch( { type: actions.SET_DATA, data: { trades: data } } )
        } catch ( error: any ) {
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