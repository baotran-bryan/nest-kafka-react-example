import logo from './logo.svg';
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
      <div>Hello WebSockets!</div>
    </div>
  );
}

export default App;
