const style = {
    borderRadius: "50%",
    width: 12,
    minWidth: 12,
    height: 12,
    margin: 'auto 4px auto auto',
    border: '2px solid white',
}

const Led = ( { isOn, title, disabled, type = "success" } ) => {
    let className = `bg-${ isOn ? type : "danger" }`

    return disabled ? null :(
        <div title={ title } style={ style } className={ className } />
    )
}

export default Led