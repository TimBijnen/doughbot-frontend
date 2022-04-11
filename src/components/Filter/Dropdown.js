import { useEffect, useState } from "react"
import { Dropdown, Button, ButtonGroup } from "react-bootstrap"
import { useLocation } from "react-router-dom"


const FilterDropdown = ( { defaultValue, onSelect, values, filterKey } ) => {
    const [ selected, setSelected ] = useState( defaultValue )
    const [ isActive, setActive ] = useState( false )
    const location = useLocation()
    useEffect( () => {
        const search = new URLSearchParams( location.search )
        if ( search.get( filterKey ) ) {
            setActive( true )
        }
    }, [ location.search, filterKey, setActive ] )

    const handleSelect = ( value ) => {
        setSelected( value )
        setActive( true )
        onSelect( value )
    }
    const handleClick = () => {
        onSelect( isActive ? "" : selected )
        setActive( !isActive )
    }
    
    const variant = isActive ? "success" : "outline-secondary"

    return (
        <Dropdown onSelect={ handleSelect } as={ ButtonGroup }>
            <Button onClick={ handleClick } variant={ variant }>{ selected || filterKey }</Button>

            <Dropdown.Toggle split variant={ variant } id="dropdown-basic" />

            <Dropdown.Menu>
                { values.map( ( value ) => (
                    <Dropdown.Item eventKey={ value }>{ value }</Dropdown.Item>
                ) ) }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default FilterDropdown