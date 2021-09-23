import useHealth from "./hooks/health"

const Health = ( { key, value } ) => {
    const [ { health } ] = useHealth()
    
    return (
        <div>
            { health.status }
        </div>
    )
}

export default Health