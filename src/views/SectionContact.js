import CV from '../assets/CV_CorentinLeguay.pdf';

export default function SectionContact(props) {
    return (
        <section id="contact" className="section">
            <h2>Contact me</h2>
            <div className="canvasfree"></div>
            <div className='content-wrapper'>
                <div className="content">
                    <p>Do you have a question or do you want to work together ? Send me an email, or contact me on Linkedin.</p>
                    <div className="linkList">
                        <a className="link" href="mailto:corentin.leguay@gmail.com"><i className="fa-solid fa-envelope"></i> Send me an email</a>
                        <a className="link" href="https://www.linkedin.com/in/corentin-leguay/"><i className="fa-brands fa-linkedin"></i> Linkedin</a>
                    </div>
                </div>
                <div className="content">
                    <p>If you want to look at my resume, you can also download it here.</p>
                    <div className="linkList">
                        <a className="link" href={CV} target='_blank' rel='noopener noreferrer'><i className="fa-solid fa-download"></i> Download my resume</a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p><i className="fa-regular fa-copyright"></i> 2022 Corentin Leguay</p>
                <div className="credits">
                    <p>
                        Credits to <a className="colored" href="https://sketchfab.com/shedmon">shedmon</a> for the phone model, <a className='colored' href="https://poly.pizza/u/Jarlan%20Perez">Jarlan Perez</a> for the envelopes model, <a className="colored" href="https://github.com/FortAwesome/Font-Awesome">FortAwesome</a> for the D20 icon, and <a className='colored' href="https://www.wishforge.games/">wishforge.games</a> for the metal sign icon.
                    </p>
                </div>
            </div>
        </section>
    );
}