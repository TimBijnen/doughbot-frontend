const style = {
    borderRadius: "50%",
    width: 16,
    minWidth: 16,
    height: 16,
    margin: 'auto 4px auto auto',
    border: '2px solid white',
}

const Dot = ( { type = "secondary", ...props } ) => {
    let className = `${ props.className } d-inline-block bg-${ type }`

    return (
        <div { ...props } style={ style } className={ className } />
    )
}

export default Dot