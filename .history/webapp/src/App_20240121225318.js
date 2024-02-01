import useWebSocket from "react-use-websocket";
import './App.css';

const WS_URL = "ws://localhost:3000";

function App() {
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });
  return (
    <div className="App">
      <h2>Hello WebSockets!</h2>
    </div>
  );
}

export default App;
