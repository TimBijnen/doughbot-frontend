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
    // const [ isTraderActive, setIsTraderActive ] = useReducer(reducer, { settings: [] })
    
    const getSettings = async () => {
        try {
            dispatch( { type: actions.LOAD, data: { settings: [] } } )
            const { data } = await axios.get( `${ API }/settings` )
            const isTraderActive = !!data.data.find( ( { key, value }: any ) => (key === "trader_active" && value) )
            dispatch( { type: actions.SET_DATA, data: { settings: data.data, isTraderActive } } )
        } catch ( error: any ) {
        }
    }
    
    const updateSetting = async (key: any, value: any) => {
        const rule = key === "trader_active" ? 40 : 0
        const { data } = await axios.post( `${ API }/settings`, { key, value, rule } )
        if ( data === "Success" ) {
            dispatch( { type: actions.SET_DATA, data: { settings: state.settings.map( ( s: any ) => s.key === key ? { key, value, rule } : s ) } } )
        }
    }

    useEffect( () => {
        getSettings()
    }, [])

    return [ state, { updateSetting }]
  }

export default useSettings