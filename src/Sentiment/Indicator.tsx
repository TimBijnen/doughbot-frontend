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
    let isNegative = value < 100
    let className = `text-white bg-${ isNegative ? "danger" : "success" }`

    const displayValue = value?.toFixed(4).replace(/.+\./i, isNegative ? '-.' : '+.')
    return (
        <div key={ label } title="indicator" style={ style } className={ className }>
            { label }
            { ' ' }
            { displayValue }%
        </div>
    )    
}

export default Indicator