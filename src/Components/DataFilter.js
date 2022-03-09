import moment from "moment"
import { useEffect, useState } from "react"
import { Dropdown, Row, Col, Button, ButtonGroup } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router"
import { useLocation } from "react-router-dom"

const DATE_FORMAT = "YYYY-MM-DD"

const DataDropdown = ( { defaultValue, onSelect, values, filterKey } ) => {
    const [ selected, setSelected ] = useState( defaultValue )
    const [ isActive, setActive ] = useState( false )
    const handleSelect = ( value ) => {
        setSelected( value )
        setActive( true )
        // onSelect( value )
    }
    const handleClick = () => {
        setActive( !isActive )
    }
    const location = useLocation()
    const history = useHistory()

    useEffect( () => {
        const search = new URLSearchParams( location.search )
        if ( isActive ) {
            search.set( filterKey, selected )
        } else {
            search.delete( filterKey )
        }
        history.push( { search: search.toString() } )
    }, [ location.search, isActive, selected, filterKey, history ] )
    
    const variant = isActive ? "success" : "outline-secondary"

    return (
        <Dropdown onSelect={ handleSelect } as={ ButtonGroup }>
            <Button onClick={ handleClick } variant={ variant }>{ selected }</Button>

            <Dropdown.Toggle split variant={ variant } id="dropdown-basic" />

            <Dropdown.Menu>
                { values.map( ( value ) => (
                    <Dropdown.Item eventKey={ value }>{ value }</Dropdown.Item>
                ) ) }
            </Dropdown.Menu>
        </Dropdown>
    )
}

const DataFilter = ( { onChange, filters } ) => {
    const [ dateRange, setDateRange ] = useState( "day" )
    const [ date, setDate ] = useState( new Date() )
    const [ symbol, setSymbol ] = useState()
    const isBefore = ( date ) => moment(date).isBefore(moment())
    const history = useHistory()
    
    const handleChange = ( change, value ) => {
        if ( change === "date" ) {
            setDate( value )
        } else if ( change === "dateRange" ) {
            setDateRange( value )
        } else if ( change === "symbol" ) {
            setSymbol( value )
        }
    }
    
    useEffect( () => {
        const query = new URLSearchParams()
        const start_date = moment( date ).format( DATE_FORMAT )
        query.append("start_date", start_date)
        query.append("date_range", dateRange)
        query.append("symbol", symbol)
        history.push( { search: query.toString() } )
    }, [ history, date, dateRange, symbol ] )

    return (
        <Row>
            <Col>
                <DatePicker selected={ date } onChange={ ( value ) => handleChange( "date", value ) } filterDate={ isBefore } />
            </Col>
            <Col>
                <DataDropdown
                    filterKey={ "date_range" }
                    onSelect={ ( value ) => handleChange( "dateRange", value ) }
                    values={ [ "day", "week", "month" ] }
                    defaultValue={ dateRange }
                />
            </Col>
            { filters.map( ( { filterKey, type, values, defaultValue } ) => {
                if ( type === "select" ) {
                    return (
                        <Col>
                            <DataDropdown
                                filterKey={ filterKey }
                                onSelect={ ( value ) => handleChange( filterKey, value ) }
                                values={ values }
                                defaultValue={ defaultValue }
                            />
                        </Col>
                    )
                }
                return <></>
            } ) }
        </Row>
    )
}

export default DataFilter