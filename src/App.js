import React from 'react';
import Scene3D from './components/Scene3D';
import SinglePageMenu from './components/SinglePageMenu';
import { CarouselProvider } from './context/CarouselContext';
import SectionAbout from './views/SectionAbout';
import SectionContact from './views/SectionContact';
import SectionLanding from './views/SectionLanding';
import SectionPortfolio from './views/SectionPortfolio';

function App() {
    return (
        <CarouselProvider>
            <div className="App" >
                <Scene3D />
                <SectionLanding />
                <SectionAbout />
                <SectionPortfolio />
                <SectionContact />
                <SinglePageMenu />
            </div>
        </CarouselProvider>
    );
}

export default App;
