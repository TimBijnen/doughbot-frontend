const Setting = ( { key, value } ) => {
    return (
        <div>
            <label>
                { key }
            </label>
            <p>
                { value > 0 ? "True" : "False" }
            </p>
        </div>
    )
}

export default Setting