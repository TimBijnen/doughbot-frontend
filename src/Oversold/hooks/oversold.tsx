import { useEffect, useReducer } from 'react'
import axios from "axios"
import moment from "moment"


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
            const { data } = await axios.get( `${ API?.replace("5000", "5001") }/oversold`, {withCredentials: true} )
            const { data: trades } = await axios.get( `${ API }/trades` )
            dispatch( { type: actions.SET_DATA, data: { items: data.data, trades: trades.data, updateTime: moment.now() } } )
        } catch ( error: any ) {
        }
    }

    useEffect( () => {
        const secondsPastMinute = moment.now() / 1000 % 60
        let timeout = 40 - secondsPastMinute
        let interval: any
        if ( secondsPastMinute > 40 ) {
            timeout = 60 - secondsPastMinute + 40
        } 
        getOversoldData()
        setTimeout(
            () => {
                interval = setInterval( getOversoldData, 60000 )
            },
            timeout * 1000
        )
        return () => interval && clearInterval( interval )
    }, [])

    return [ state, { getOversoldData }]
  }

export default useOversold