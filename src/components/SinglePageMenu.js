import React from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

export default function SinglePageMenu() {
    const {scrollPercentage} = useScrollPosition();

    return (
        <nav>
            <a href="#landing" className={scrollPercentage < 33 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#aboutme" className={scrollPercentage > 33 && scrollPercentage < 66 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#portfolio" className={scrollPercentage > 66 && scrollPercentage < 99 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#contact" className={scrollPercentage > 99 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
        </nav>
    );
}