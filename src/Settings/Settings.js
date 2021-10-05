import { Container } from "react-bootstrap"
import useSettings from "./hooks/settings"
import Setting from "./Setting"

const Settings = () => {
    const [ { settings, isLoading }, { updateSetting } ] = useSettings()

    if ( isLoading ) {
        return <div>Loading</div>
    }

    return (
        <Container className="bg-light">
            { settings.map( ( { key, value } ) => (
                <Setting label={ key } value={ value } updateSetting={ updateSetting } />
            ) ) }
        </Container>
    )
}

export default Settings