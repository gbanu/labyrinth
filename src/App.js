import "./App.css";
import Game from "./Game";
import React from "react";
import LabyrinthGame from "./LabyrinthGame";
import img from "./board.jpg";

function App() {
  return (
    <div
      style={{
        height: window.innerHeight + 100,
        backgroundImage: `url(${img})`,
        // "url(https://img.rawpixel.com/private/static/images/website/2022-05/rm451-bg-06.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=bd96e6486ffbd66537cb584df8ce4cb2)",
      }}
    >
      <LabyrinthGame />
    </div>
  );
}

export default App;
