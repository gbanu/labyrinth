import React, { useEffect, useState } from "react";
// import NoSleep from 'nosleep.js';

import useDedale from "./useDedale";
import Labyrinth from "./Labyrinth";

const debug = false;

// const width = 600;
// const height = 800;

const Button = ({ label, onClick }) => {
  return (
    <button
      style={{
        width: 80,
        height: 40,
        backgroundColor: "white",
        borderRadius: 30,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const LabyrinthGame = () => {
  useEffect(() => {
    if (debug) {
      return;
    }
  }, []);

  const width = Math.floor(window.innerWidth / 100) * 100;
  const height = Math.floor((window.innerHeight - 50) / 100) * 100;

  const [{ xAcceleration, yAcceleration }, setMotion] = useState({
    xAcceleration: 0,
    yAcceleration: 0,
  });
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!window.DeviceMotionEvent) {
      setSupported(false);
    }
    const handleMotionEvent = (event) => {
      requestAnimationFrame(() =>
        setMotion({
          xAcceleration: -event.accelerationIncludingGravity.x * 5,
          yAcceleration: event.accelerationIncludingGravity.y * 5,
        })
      );
    };

    window.addEventListener("devicemotion", handleMotionEvent, true);

    return () => window.removeEventListener("devicemotion", handleMotionEvent);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      requestAnimationFrame(() =>
        setMotion({
          xAcceleration: event.movementX * 10,
          yAcceleration: event.movementY * 10,
        })
      );
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { safe, go, level, lost, retry, ...dedaleProps } = useDedale({
    width,
    height,
    xAcceleration,
    yAcceleration,
  });

  if (!supported && !debug) {
    return <p>Not supported</p>;
  }

  const LevelBoard = ({ level }) => {
    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "#f4a261",
          fontSize: 40,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <div>Level: {level}</div>

        {safe && <Button label={"GO"} onClick={go}></Button>}
      </div>
    );
  };

  return (
    <div
      onClick={dedaleProps.go}
      style={{
        //   width,
        //   height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#e9c46a",
      }}
    >
      {lost && (
        <div
          style={{
            position: "fixed",
            top: 200,
            left: window.innerWidth / 2 - 120,
            width: 200,
            borderRadius: 30,
            backgroundColor: "#e9c46a",
            zIndex: 10,
            border: "solid",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <p>You lose after {level} level</p>
          <Button label={"Retry"} onClick={retry}></Button>
        </div>
      )}

      <LevelBoard level={level} />

      <Labyrinth {...dedaleProps} width={width} height={height} />

      {safe && (
        <button
          style={{
            width: 200,
            height: 200,
            zIndex: 100000,
            position: "fixed",
            top: window.innerHeight / 2 - 100,
            left: window.innerWidth / 2 - 100,
            borderRadius: 40,
            fontSize: 30,
          }}
          onClick={go}
        >
          Tap to start
        </button>
      )}
    </div>
  );
};

export default LabyrinthGame;
