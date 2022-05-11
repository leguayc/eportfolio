import { Html, useProgress } from "@react-three/drei";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function LoadingScreen(props) {
    const {progress} = useProgress();

    return (
        <Html center className="loading-screen">
            <div className="logo"><img src="./assets/img/avatar.png" alt="Avatar" /></div>
            <div className="content">
                <ProgressBar bgcolor="#65C9FF" completed={progress} />
                <p>Loading... {Math.round(progress * 100) / 100}%</p>
            </div>
        </Html>
    );
}