type indicator = {
    label: string,
    value: number,
}

const style = {
    width: "100%",
    height: "32px",
    lineHeight: "32px",
    textAlign: "center" as const,
}

const Indicator = ( { label, value }: indicator ) => {
    if ( !value ) {
        <div key={ label } title="indicator" style={ style } className="bg-secondary" />
    }
    let isNegative = value < 1
    let className = `text-white bg-${ isNegative ? "danger" : "success" }`

    const displayValue = ( ( value - 1 ) * 100 ).toFixed(4)
    return (
        <div key={ label } title="indicator" style={ style } className={ className }>
            { label }
            { ' ' }
            { displayValue }%
        </div>
    )    
}

export default Indicator