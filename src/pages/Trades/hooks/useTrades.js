import { useEffect, useReducer } from 'react'
import axios from "axios"
import { baseActions, baseReducer } from "../../../api"
import { useLocation } from 'react-router-dom'

const useTrades = ( date ) => {
    const [ state, dispatch ] = useReducer(baseReducer, { trades: [], filters: [] })
    const location = useLocation()

    const getFilters = async () => {
        const { data } = await axios.get( `/api/trades/filters`)
        const filters = data.data
        dispatch( { type: baseActions.SET_DATA, data: { filters } } )
    }
    
    const getTrades = async ( search = {} ) => {
        try {
            dispatch( { type: baseActions.LOAD, data: { trades: [] } } )
            let trades
            const { data } = await axios.get( `/api/trades?${ search.toString() }`)
            trades = data
            dispatch( { type: baseActions.SET_DATA, data: { trades } } )
        } catch ( error ) {
            console.log(error)
        }
    }

    useEffect( () => {
        getFilters()
    }, [] )

    useEffect( () => {
        const search = new URLSearchParams( location.search )
        getTrades( search )
    }, [ date, location.search ])

    return [ state, { getTrades } ]
  }

export default useTrades
