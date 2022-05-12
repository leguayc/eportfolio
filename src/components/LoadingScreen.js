import { Html, useProgress } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "./ProgressBar";

export default function LoadingScreen({onCompleteLoad, ...props}) {
    const {active, progress} = useProgress();
    const {t} = useTranslation();
    const {viewport} = useThree();

    if (!active) {
        onCompleteLoad();
    }

    return (
        <Html className="loading-screen" position={[-viewport.width/2, viewport.height/2, 0]}>
            <div className="logo"><img src="./assets/img/avatar.svg" alt="Avatar" /></div>
            <div className="content">
                <ProgressBar bgcolor="#65C9FF" progress={progress} />
                <p>{t('Loading')} {Math.round(progress * 100) / 100}%</p>
            </div>
        </Html>
    );
}