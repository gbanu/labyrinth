import React, { useEffect, useState } from "react";
import useGyroscope from "react-hook-gyroscope";

const Game = () => {
  //   const gyroscope = useGyroscope();
  const [score, setScore] = useState(0);
  const [platforms, setPlatform] = useState(<Platform />);
  const [{ alpha, beta, gamma }, setPosition] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    const handleMotionEvent = (event) => {
      requestAnimationFrame(() =>
        setPosition({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        })
      );
    };

    window.addEventListener("deviceorientation", handleMotionEvent, true);
    return () =>
      window.removeEventListener("deviceorientation", handleMotionEvent);
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <p>Game</p>
        <p>{score}</p>
      </div>

      <ul>
        <li>X: {alpha}</li>
        <li>Y: {beta}</li>
        <li>Z: {gamma}</li>
      </ul>

      <Doodler left={gamma} />
    </>
  );
};

const Doodler = ({ left }) => {
  return (
    <div
      style={{
        height: 50,
        width: 50,
        backgroundColor: "red",
        position: "absolute",
        left: left * 50,
      }}
    ></div>
  );
};

const Platform = () => {
  return (
    <div
      style={{
        height: 10,
        width: 80,
        backgroundColor: "green",
        position: "absolute",
      }}
    ></div>
  );
};

export default Game;
