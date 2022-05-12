import React from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

export default function SinglePageMenu() {
    const {scrollPercentage} = useScrollPosition();

    return (
        <nav>
            <a href="#landing" className={scrollPercentage < 30 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#aboutme" className={scrollPercentage > 30 && scrollPercentage < 60 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#portfolio" className={scrollPercentage > 60 && scrollPercentage < 90 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
            <a href="#contact" className={scrollPercentage > 90 ? 'colored' : ''}><i className="fa-solid fa-diamond"></i></a>
        </nav>
    );
}