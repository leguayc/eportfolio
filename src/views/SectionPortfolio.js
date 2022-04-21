import ScrolldownNotice from "../components/ScrolldownNotice";

export default function SectionPortfolio(props) {
    return (
        <section id="portfolio" className="section">
            <h2>Projects</h2>
            <div className="canvasfree"></div>
            <div className="project">
                <h3>Endless Wander - 2020</h3>
                <p>Endless Wander is an RPG (RolePlaying Game) I worked on with Ederia Interactive, my video game studio. It’s developed with Unreal Engine, in C++. </p>
                <p>Working on this big project with a small team made me take on many jobs : UI/UX designer, developer (AI, UI, and many more), scriptwriter, etc...</p>
                <div className="linkList">
                    <a href="#" className="link"><i className="fa-solid fa-globe"></i> Website</a>
                    <a href="#" className="link"><i className="fa-brands fa-itch-io"></i> Itch.io</a>
                </div>
            </div>
            <ScrolldownNotice href="#contact"/>
        </section>
    );
}