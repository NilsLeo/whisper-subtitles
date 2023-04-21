import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Video from "./components/Video";
import MainLayout from "./components/MainLayout";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="text-red-500">Hello World</div>
      <MainLayout></MainLayout>
    </>
  );
}

export default App;
