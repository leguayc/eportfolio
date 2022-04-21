import ScrolldownNotice from "../components/ScrolldownNotice";

export default function SectionLanding(props) {
    return (
        <section id="landing" className="section">
            <div className="logo"><img src="./avatar.png" alt="Avatar" /></div>
            <div className="content txtc">
                <h3>Hi, I'm Corentin Leguay, a</h3>
                <h1>full-stack developer.</h1>
                <h3>Welcome to my portfolio</h3>
            </div>
            
            
            <ScrolldownNotice href="#aboutme"/>
        </section>
    );
}