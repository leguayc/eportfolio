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

    const projectList = [
        {
            title: t("Eportfolio"),
            link: {
                icon: "fa-brands fa-github", 
                name: t('Github'), 
                url: "https://github.com/leguayc/eportfolio"
            },
            paragraphs: [
                t("Eportfolio first"),
                t("Eportfolio second")
            ]
        }, {
            title: t("MyBlazon"),
            link: {
                icon: "fa-solid fa-globe", 
                name: t('Website'), 
                url: "https://myblazon.com/"
            },
            paragraphs: [
                t("MyBlazon first"),
                t("MyBlazon second"),
            ]
        }, {
            title: t("Endless Wander"),
            link: {
                icon: "fa-brands fa-itch-io", 
                name: t('Itchio'), 
                url: "https://ederia-interactive.itch.io/endless-wander"
            },
            paragraphs: [
                t("Endless Wander first"),
                t("Endless Wander second"),
            ]
        }, {
            title: t("Ederia Interactive"),
            link: {
                icon: "fa-solid fa-globe", 
                name: t('Website'), 
                url: "https://ederia-interactive.com/"
            },
            paragraphs: [
                t("Ederia Interactive first"),
                t("Ederia Interactive second"),
            ]
        }, {
            title: t("ClicknBoat"),
            paragraphs: [
                t("ClicknBoat first"),
                t("ClicknBoat second"),
            ]
        }, {
            title: t("Flappy bird"),
            paragraphs: [
                t("Flappy bird first"),
                t("Flappy bird second"),
            ]
        }, {
            title: t("Huun"),
            paragraphs: [
                t("Huun first"),
                t("Huun second"),
            ]
        }
    ];

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
                {projectList.map((item, index) => 
                    state.carouselIndex === index &&
                    <Project title={item.title} link={item.link}>
                        {item.paragraphs.map((text, textIndex) => 
                            <p key={textIndex}>{text}</p>
                        )}
                    </Project>
                )}
            </div>
        </section>
    );
}