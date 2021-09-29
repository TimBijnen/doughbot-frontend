const style = {
    borderRadius: "50%",
    width: 20,
    height: 20,
    border: '2px solid white',
}

const Led = ( { isOn, title } ) => {
    let className = `bg-${ isOn ? "success" : "danger" }`

    return (
        <div title={ title } style={ style } className={ className } />
    )
}

export default Led