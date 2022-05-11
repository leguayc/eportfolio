import { useState, useEffect } from "react";

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;

        var h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';

        let scrollPercentageRes = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        if (isNaN(scrollPercentageRes)) {
            scrollPercentageRes = 0;
        }

        setScrollPercentage(scrollPercentageRes);
        setScrollPosition(position);
    };

    if (!isInitialized) {
        handleScroll();
        setIsInitialized(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { scrollY: scrollPosition, scrollPercentage: scrollPercentage };
};

export default useScrollPosition;