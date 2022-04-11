import moment from "moment"
import { useState } from "react"
import { Col } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router"
import { useLocation } from "react-router-dom"
import FilterDropdown from "./Dropdown"

const DATE_FORMAT = "YYYY-MM-DD"

const Filter = ( { type, filterKey, values, defaultValue } ) => {
    const history = useHistory()
    const location = useLocation()
    let format = ( v ) => v
    let parse = ( v ) => v
    if ( type === "datepicker" ) {
        format = ( v ) => moment( v ).format( DATE_FORMAT )
        parse = ( v ) => v ? moment( v, DATE_FORMAT ).toDate() : null
    }
    const search = new URLSearchParams( location.search )
    const [ value, setValue ] = useState( parse( search.get( filterKey ) ) )
    
    const handleChange = ( value ) => {
        const search = new URLSearchParams( location.search )
        if ( value ) {
            search.set( filterKey, format( value ) )
        } else {
            search.delete( filterKey )
        }
        setValue( value )
        history.push( { search: search.toString() } )
    }

    if ( type === "select" ) {
        return (
            <Col>
                <FilterDropdown
                    filterKey={ filterKey }
                    onSelect={ handleChange }
                    values={ values }
                    defaultValue={ value }
                />
            </Col>
        )
    } else if ( type === "datepicker" ) {
        const isBefore = ( date ) => moment(date).isBefore(moment())
        return (
            <Col>
                <DatePicker
                    selected={ value }
                    onChange={ ( v ) => handleChange( v ) }
                    filterDate={ isBefore }
                />
            </Col>
        )
    }
    return null
}

export default Filter