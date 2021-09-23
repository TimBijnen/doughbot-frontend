import useSettings from "./hooks/settings"
import Setting from "./Setting"

const Settings = () => {
    const [ { settings, isLoading } ] = useSettings()

    if ( isLoading ) {
        return <div>Loading</div>
    }

    return (
        <div>
            { settings.map( Setting ) }
        </div>
    )
}

export default Settings