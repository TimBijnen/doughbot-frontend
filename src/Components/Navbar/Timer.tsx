import { useState, useEffect } from "react"
import moment from 'moment'

const Timer = () => {
    const [ now, setNow ] = useState( moment().format("HH:mm:ss") )

    useEffect(() => {
        const interval = setInterval( () => setNow( moment().format("HH:mm:ss") ), 1000 )
        return () => clearInterval( interval )
    }, [])

    return (
        <div className="pull-right text-white">{ now }</div>
    )
}

export default Timer