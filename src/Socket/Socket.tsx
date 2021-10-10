import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("log", data => {
        console.log(data)
        setResponse(`${data.coin} ${data.details}`)

    });
  }, []);

  return (
    <p>
      {response}
    </p>
  );
}

export default App;
