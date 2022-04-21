import React, { useRef, useState } from 'react';
import Scene3D from './components/Scene3D';
import SectionAbout from './views/SectionAbout';
import SectionContact from './views/SectionContact';
import SectionLanding from './views/SectionLanding';
import SectionPortfolio from './views/SectionPortfolio';

function App() {
    return (
        <div className="App" >
            <Scene3D />
            <SectionLanding />
            <SectionAbout />
            <SectionPortfolio />
            <SectionContact />
        </div>
    );
}

export default App;
