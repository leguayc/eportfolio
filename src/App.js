import React, { useRef, useState } from 'react';
import Scene3D from './components/Scene3D';
import SectionAbout from './views/SectionAbout';
import SectionContact from './views/SectionContact';
import SectionPortfolio from './views/SectionPortfolio';

function App() {
    return (
        <div className="App">
            <Scene3D></Scene3D>
            <SectionAbout></SectionAbout>
            <SectionPortfolio></SectionPortfolio>
            <SectionContact></SectionContact>
        </div>
    );
}

export default App;
