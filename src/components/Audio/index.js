import { useState, useEffect } from "react"
import YouTube from 'react-youtube';
import { useSocket } from "../Socket";

const Audio = () => {
    const [ { connected, socket } ] = useSocket()

    const [ isPlaying, setIsPlaying ] = useState( false )

    const ready = ( event ) => {
        const { target} = event
        target.playVideo();
    }
    const done = () => setIsPlaying( false )

    useEffect(() => {
        if ( connected ) {
            socket.on( "successfull_sell_client", () => {
                setIsPlaying( true )
            } )
            return () => {
                socket.off( "successfull_sell_client" )
            }
        }
    }, [socket, connected])

    return isPlaying ? (
        <div className="d-none">
            <YouTube id="YT" videoId="4fsQk27HCVM" opts={ { playerVars: { start: 1 } } } onReady={ ready } onEnd={ done } />
        </div>
    ) : null
}

export default Audio