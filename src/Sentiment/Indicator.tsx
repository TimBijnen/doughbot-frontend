type indicator = {
    label: string,
    value: number,
}

const Indicator = ( { label, value }: indicator ) => {
    let className = ""

    if ( value < 90 ) {
        className = "text-white bg-danger"
    } else if ( value < 100 ) {
        className = "text-dark bg-warning"
    } else if ( value < 110 ) {
        className = "text-white bg-info"
    } else {
        className = "text-white bg-success"
    }

    return (
        <div key={ label } title="indicator" style={ { width: "100%" } } className={ className }>
            { label }
            { value.toFixed(0) }%
        </div>
    )    
}

export default Indicator