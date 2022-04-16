
const style = {
    borderRadius: "50%",
    width: 12,
    minWidth: 12,
    height: 12,
    border: '2px solid white',
}

const Led = ( { isOn, title, disabled, type = "success", ...props } ) => {
    
    return disabled ? null :(
        <div { ...props } title={ title } style={ style } className={ `bg-${ isOn ? type : "danger" } ${ props.className } d-inline-block` } />
    )
}

export default Led