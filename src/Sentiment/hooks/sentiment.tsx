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

const useSentiment = () => {
    const [ state, dispatch ] = useReducer(reducer, {})
    
    const getSentiment = async () => {
        try {
            dispatch( { type: actions.LOAD, data: {} } )
            const { data } = await axios.get( `${ API }/sentiment` )
            dispatch( { type: actions.SET_DATA, data: { sentiment: data.data } } )
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
        getSentiment()
        setTimeout(
            () => {
                interval = setInterval( getSentiment, 60000 )
            },
            timeout * 1000
        )
        return () => interval && clearInterval( interval )
    }, [])

    return [ state, { getSentiment }]
  }

export default useSentiment