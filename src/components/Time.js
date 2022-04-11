const Time = ( { start, end, className } ) => {
    const secondsDiff = end.diff(start, 'seconds')
    const minutes = parseInt( secondsDiff / 60 )
    const seconds = secondsDiff % 60
    return (
        <div className={ className }>
            { minutes }m { seconds }s
        </div>
    )
}

export default Time