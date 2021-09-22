const style = {
    borderRadius: "50%",
    width: 20,
    height: 20,
}

const Led = ( { isOn } ) => {
    let className = `bg-${ isOn ? "success" : "danger" }`

    return (
        <div style={ style } className={ className } />
    )
}

export default Led