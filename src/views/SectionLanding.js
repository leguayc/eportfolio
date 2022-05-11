import ScrolldownNotice from "../components/ScrolldownNotice";

export default function SectionLanding(props) {
    return (
        <section id="landing" className="section">
            <div className="logo"><img src="./assets/img/avatar.svg" alt="Avatar" /></div>
            <div className="content txtc">
                <h3>Hi, I'm Corentin Leguay,</h3>
                <h1>a full-stack developer.</h1>
                <h3>Welcome to my portfolio</h3>
            </div>
            <ScrolldownNotice href="#aboutme"/>
        </section>
    );
}