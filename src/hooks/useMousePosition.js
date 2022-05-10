import { useState, useEffect } from "react";

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

    const updateMousePosition = ev => {
        setMousePosition({ mouseX: (ev.clientX / window.innerWidth) * 2 - 1, mouseY: -(ev.clientY / window.innerHeight) * 2 + 1 });
    };

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition);

        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
};

export default useMousePosition;