import { Container } from "react-bootstrap"
import useSettings from "./hooks/settings"
import Setting from "./Setting"

const Settings = ( { setIsTraderActive } ) => {
    const [ { settings, isLoading }, { updateSetting } ] = useSettings()
    
    // setIsTraderActive(settings.find( ( { key, value } ) => (key === "trader_active" && value) ))

    const update = (label, value) => {
        updateSetting(label, value)
        setIsTraderActive( value )
    }

    if ( isLoading ) {
        return <div>Loading</div>
    }

    return (
        <Container className="bg-light">
            { settings.map( ( { key, value, rule } ) => (
                <Setting label={ key } value={ value } rule={ rule } updateSetting={ update } />
            ) ) }
        </Container>
    )
}

export default Settings