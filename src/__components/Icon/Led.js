const style = {
    borderRadius: "50%",
    width: 12,
    minWidth: 12,
    height: 12,
    border: '2px solid white',
}

const Led = ( { isOn, title, disabled, type = "success", ...props } ) => {
    let className = `bg-${ isOn ? type : "danger" } ${ props.className } d-inline-block`

    return disabled ? null :(
        <div { ...props } title={ title } style={ style } className={ className } />
    )
}

export default Led