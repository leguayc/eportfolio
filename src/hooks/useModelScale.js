import { useThree } from "@react-three/fiber";
import { useState } from "react";

const useModelScale = (base, medium, large) => {
    const [modelScale, setModelScale] = useState(1);
    const { size } = useThree();

    if (size.width < 800) {
        if (modelScale !== base) {
            setModelScale(base);
        }  
    } else if (size.width < 1200) {
        if (modelScale !== medium) {
            setModelScale(medium);
        }
    } else {
        if (modelScale !== large) {
            setModelScale(large);
        }
    }

    return modelScale;
};

export default useModelScale;