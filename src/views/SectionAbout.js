import ScrolldownNotice from "../components/ScrolldownNotice";

export default function SectionAbout(props) {
    return (
        <section id="aboutme" className="section">
            <h2>About me</h2>
            <div className="content">
                <p>
                    New technologies enthusiast, I always wished to become a part of its world. I started this learning journey by myself, developping little games and setting up servers to play with others.
                </p>
                <p>
                    Now, I've a two-year university degree in computer sciences, and a bachelor's degree in web development, and I'm ready to set out on new experiences.
                </p>
            </div>
            <ScrolldownNotice href="#portfolio" />
        </section>
    );
}