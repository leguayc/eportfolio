import { useRef } from "react";
import { Project } from "../components/Project";
import { CAROUSEL_SIZE, useCarousel } from "../context/CarouselContext";

export default function SectionPortfolio(props) {
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
            <h2>Projects</h2>
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
                    <Project title="MyBlazon (2021-2022)" link={{icon: "fa-solid fa-globe", name: "Website", url: "https://myblazon.com/"}}>
                        <p>I worked as a full-stack developer for one year on MyBlazon.com, a website that generates blazon online. It's developed in .NET 6, and HTML, LESS, and JS (with Jquery) for the front.</p>
                        <p>I had many tasks, to tell a few : I refactored and migrated the website to .NET 6 (it was in .NET 4.5 before), I improved the website design, and the blazon generator by developing new features for it, and finally, I also trained other interns.</p>
                    </Project> : <></> 
                }
                {state.carouselIndex === 1 ? 
                    <Project title="Endless Wander (2020-2022)" link={{icon: "fa-brands fa-itch-io", name: "Itch.io", url: "https://ederia-interactive.itch.io/endless-wander"}}>
                        <p>Endless Wander is an RPG (RolePlaying Game) I worked on with Ederia Interactive, my video game studio. It’s developed with Unreal Engine, in C++. </p>
                        <p>Working on this big project with a small team made me take on many jobs : UI/UX designer, developer (AI, UI, and many more), scriptwriter, etc...</p>
                    </Project> : <></> 
                }
                {state.carouselIndex === 2 ? 
                    <Project title="Ederia Interactive (2020-2021)" link={{icon: "fa-solid fa-globe", name: "Website", url: "https://ederia-interactive.com/"}}>
                        <p>I worked on Ederia Interactive's website. It's developed in Angular 10, the news system was done with Markdown, and the website is deployed with Docker. </p>
                        <p>I was alone on this project. I had to design a mock-up, develop the website and its news system.</p>
                    </Project> : <></>
                }
                {state.carouselIndex === 3 ? 
                    <Project title="Click & Boat (2019)">
                        <p>As an intern for 3 months at Click & Boat, I developed a monitoring tool that was destined to run on Raspberry Pi, and displayed on screens in the office of each team. It was done in Angular, and HighchartsJS.</p>
                        <p>I had to talk with each team to figure out their needs, and then develop the web application.</p>
                    </Project> : <></>
                }
                {state.carouselIndex === 4 ? 
                    <Project title="Huun (2018-2019)">
                        <p>I developed Huun in a team of 10 for a PhD student. The mobile application was developed in React Native, and the website (back-office) with HTML, CSS, PHP and MySQL.</p>
                        <p>My tasks were to program the settings related views (settings, about, credits), and the notification system (a key feature needed for the study).</p>
                    </Project> : <></>
                }
            </div>
        </section>
    );
}