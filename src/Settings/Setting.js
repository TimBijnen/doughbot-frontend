const Setting = ( { key, value } ) => {
    return (
        <div>
            { key }
            { " - "}
            { value > 0 ? "True" : "False" }
        </div>
    )
}

export default Setting