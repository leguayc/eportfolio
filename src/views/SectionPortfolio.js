import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Project } from "../components/Project";
import { CAROUSEL_SIZE, useCarousel } from "../context/CarouselContext";

export default function SectionPortfolio(props) {
    const {t} = useTranslation();
    const { state, dispatch } = useCarousel();
    const projects = useRef(null);

    const incrementCarousel = () => {
        dispatch({type: 'increment'});
    }

    const decrementCarousel = () => {
        dispatch({type: 'decrement'});
    }

    return (
        <section id="portfolio" className="section">
            <h2>{t('Projects')}</h2>
            <div className="canvasfree"></div>
            <div className="projects-control">
                {
                    state.carouselIndex > 0 &&
                    <button className="left" onClick={decrementCarousel}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                }
                {
                    state.carouselIndex < CAROUSEL_SIZE - 1 &&
                    <button className="right" onClick={incrementCarousel}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                }
            </div>
            <div ref={projects} className="projects">
                {state.carouselIndex === 0 ? 
                    <Project title={t('Eportfolio')} link={{icon: "fa-brands fa-github", name: t('Github'), url: "https://github.com/leguayc/eportfolio"}}>
                        <p>{t('Eportfolio first')}</p>
                        <p>{t('Eportfolio second')}</p>
                    </Project> : <></> 
                }
                {state.carouselIndex === 1 ? 
                    <Project title={t('MyBlazon')} link={{icon: "fa-solid fa-globe", name: t('Website'), url: "https://myblazon.com/"}}>
                        <p>{t('MyBlazon first')}</p>
                        <p>{t('MyBlazon second')}</p>
                    </Project> : <></> 
                }
                {state.carouselIndex === 2 ? 
                    <Project title={t('Endless Wander')} link={{icon: "fa-brands fa-itch-io", name: t('Itchio'), url: "https://ederia-interactive.itch.io/endless-wander"}}>
                        <p>{t('Endless Wander first')}</p>
                        <p>{t('Endless Wander second')}</p>
                    </Project> : <></> 
                }
                {state.carouselIndex === 3 ? 
                    <Project title={t('Ederia Interactive')} link={{icon: "fa-solid fa-globe", name: t('Website'), url: "https://ederia-interactive.com/"}}>
                        <p>{t('Ederia Interactive first')}</p>
                        <p>{t('Ederia Interactive second')}</p>
                    </Project> : <></>
                }
                {state.carouselIndex === 4 ? 
                    <Project title={t('ClicknBoat')}>
                        <p>{t('ClicknBoat first')}</p>
                        <p>{t('ClicknBoat second')}</p>
                    </Project> : <></>
                }
                {state.carouselIndex === 5 ? 
                    <Project title={t('Flappy bird')}>
                        <p>{t('Flappy bird first')}</p>
                        <p>{t('Flappy bird second')}</p>
                    </Project> : <></>
                }
                {state.carouselIndex === 6 ? 
                    <Project title={t('Huun')}>
                        <p>{t('Huun first')}</p>
                        <p>{t('Huun second')}</p>
                    </Project> : <></>
                }
            </div>
        </section>
    );
}