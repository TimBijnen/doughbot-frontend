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
        console.log(data.data)
        dispatch( { type: baseActions.SET_DATA, data: { filters } } )
    }

    const getTrades = async ( { startDate, dateRange, symbol } = {} ) => {
        let queries = []
        if ( startDate ) {
            queries = [ ...queries, `start_date=${ startDate }` ]
        }
        if ( dateRange ) {
            queries = [ ...queries, `date_range=${ dateRange }` ]
        }
        if ( symbol ) {
            queries = [ ...queries, `symbol=${ symbol }` ]
        }
        try {
            dispatch( { type: baseActions.LOAD, data: { trades: [] } } )
            let trades
            const { data } = await axios.get( `/api/trades?${ queries.join( "&" ) }`)
            trades = data.data
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
        const startDate = search.get( 'start_date' )
        const dateRange = search.get( 'date_range' )
        const symbol = search.get( 'symbol' )
        getTrades( { startDate, dateRange, symbol } )
    }, [ date, location.search ])

    return [ state, { getTrades } ]
  }

export default useTrades