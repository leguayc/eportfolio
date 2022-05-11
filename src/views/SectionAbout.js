import Hobby from "../components/Hobby";

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
                <div className="hobbies">
                    <Hobby imgName="d20.svg" imgAlt="Dice d20" title="Roleplay" text="I started roleplaying since many years. I continue to write scenarios, and ideas regularly."/>
                    <Hobby imgName="travel.svg" imgAlt="Travel icon" title="Travel" text="I traveled to New Zealand, UK, Canary Islands, Greece, and more... I now wish to go to Iceland, Japan and go back to New Zealand."/>
                    <Hobby imgName="spaceinvaders.svg" imgAlt="Space Invaders" title="Pop culture" text="I always loved pop culture, in many form. Art, video games, mangas/comics, movies, etc..."/>
                    <Hobby imgName="metalsign.svg" imgAlt="Metal sign" title="Music" text="I love many genres of music, and love to discover new sounds. I like mainly metal/hard rock, and rap."/>
                </div>
            </div>
        </section>
    );
}