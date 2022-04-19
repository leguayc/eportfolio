import { useState, useEffect } from "react";

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;

        var h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';

        setScrollPercentage((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { scrollY: scrollPosition, scrollPercentage: scrollPercentage };
};

export default useScrollPosition;