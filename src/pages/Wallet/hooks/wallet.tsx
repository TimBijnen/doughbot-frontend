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

const useWallet = () => {
    const [ state, dispatch ] = useReducer(reducer, { items: [] })
    
    const getAccountData = async () => {
        try {
            dispatch( { type: actions.LOAD } )
            const { data } = await axios.get( `${ API }/account` )
            let items = data.sort((a:any, b:any) => parseFloat(a['free']) + parseFloat(a['locked']) < parseFloat(b['free']) + parseFloat(b['locked']) ? 1 : -1)
            items = [...items.filter((a:any) => a['asset'] === 'BNB' || a['asset'] === 'BTC'), ...items.filter((a:any) => a['asset'] !== 'BNB' && a['asset'] !== 'BTC')]
            dispatch( { type: actions.SET_DATA, data: { items } } )
        } catch ( error: any ) {
        }
    }

    const createSellOrder = async ( coin: string ) => {
        try {
            const { data } = await axios.post( `${ API }/trades/new`, { coin: `${ coin }BTC`, type: "SELL", order_type: "MARKET"} )
            if ( data === "Success") {
                getAccountData()
            }
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        getAccountData()
        const interval = setInterval( getAccountData, 20000 )
        return () => clearInterval( interval )
    }, [])

    return [ state, { getAccountData, createSellOrder }]
  }

export default useWallet