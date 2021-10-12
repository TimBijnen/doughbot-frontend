import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useToasts } from "react-toast-notifications"


const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  // const [response, setResponse] = useState("");
  const { addToast } = useToasts()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("log", data => {
      const appearance = ['error', 'info', 'success', 'warning'].includes( data.status ) ? data.status : "info"
        addToast(`${data.coin} ${data.details}`, { appearance, autoDismiss: true })
    });
  }, [addToast]);

  return (
    <span />
  );
}

export default App;
