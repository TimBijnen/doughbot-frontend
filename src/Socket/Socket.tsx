import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useToasts } from "react-toast-notifications"



function App() {
  // const [response, setResponse] = useState("");
  const { addToast } = useToasts()

  useEffect(() => {
    const socket = socketIOClient();
    socket.on("log", data => {
      const appearance = ['error', 'info', 'success', 'warning'].includes( data.status ) ? data.status : "info"
        addToast(`${data.coin} ${data.details}`, { appearance, autoDismiss: true })
    });
    socket.on("connect", () => {
        console.log("Connected")
        addToast(`Connected!`, { appearance: "info", autoDismiss: true })
    });
  }, [addToast]);

  return (
    <span />
  );
}

export default App;
