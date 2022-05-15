import { useState } from "react";
import "./App.css";
import { AllRoutes } from "./Components/AllRoutes";
import { RegisterComp } from "./Components/Auth/Registration";
import { SingleChat } from "./Components/SingleChat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
