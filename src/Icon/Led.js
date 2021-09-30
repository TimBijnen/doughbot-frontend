const style = {
    borderRadius: "50%",
    width: 12,
    minWidth: 12,
    height: 12,
    margin: 'auto 4px auto auto',
    border: '2px solid white',
}

const Led = ( { isOn, title } ) => {
    let className = `bg-${ isOn ? "success" : "danger" }`

    return (
        <div title={ title } style={ style } className={ className } />
    )
}

export default Led