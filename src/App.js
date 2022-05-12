import React, { useState } from 'react';
import { LangButton } from './components/LangButton';
import Scene3D from './components/Scene3D';
import SinglePageMenu from './components/SinglePageMenu';
import { CarouselProvider } from './context/CarouselContext';
import SectionAbout from './views/SectionAbout';
import SectionContact from './views/SectionContact';
import SectionLanding from './views/SectionLanding';
import SectionPortfolio from './views/SectionPortfolio';

function App() {
    const [is3DSceneLoaded, setIs3DSceneLoaded] = useState(false);

    return (
        <CarouselProvider>
            <div className="App" >
                <div className="langButton">
                    <LangButton />
                </div>
                <Scene3D onSceneLoaded={() => setIs3DSceneLoaded(true)} />
                {is3DSceneLoaded ?
                    <div>
                        <SectionLanding />
                        <SectionAbout />
                        <SectionPortfolio />
                        <SectionContact />
                        <SinglePageMenu />
                    </div>
                    : <></>
                }
            </div>
        </CarouselProvider>
    );
}

export default App;
