import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useToasts } from "react-toast-notifications"
import styled from "styled-components"

const StatusBar = styled.div<{connected:boolean}>`
    height: 10px;
    width: 100%;
    background-color: var(--bs-${ ( { connected }: any ) => connected ? "success" : "danger" } )   
`

function App() {
    const [connected, setConnected] = useState(false);
    const { addToast } = useToasts()

        useEffect(() => {
            const socket = socketIOClient();
            socket.on("log", data => {
                const appearance = ['error', 'info', 'success', 'warning'].includes( data.status ) ? data.status : "info"
                addToast(`${data.coin} ${data.details}`, { appearance, autoDismiss: true })
            });
            socket.on("connect", () => {
                setConnected(true)
            });
    }, [addToast]);

    return (
      <StatusBar connected={ connected }/>
    );
}

export default App
