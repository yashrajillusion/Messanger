import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SingleChat } from "./Components/SingleChat";

function App() {
  const [count, setCount] = useState(0);

  return <SingleChat />;
}

export default App;
