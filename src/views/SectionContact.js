import CV from '../assets/CV_CorentinLeguay.pdf';

export default function SectionContact(props) {
    return (
        <section id="contact" className="section">
            <h2>Contact me</h2>
            <div className="content">
                <p>Do you have a question or do you want to work together ? Come say hi !</p>
                <p>
                    <a className="btn" href="mailto:corentin.leguay@gmail.com"><i className="fa-solid fa-envelope"></i> Send Email</a>
                    <a className="btn" href={CV} target='_blank' rel='noopener noreferrer'><i className="fa-solid fa-download"></i> Download CV</a>
                    <a className="btn" href="https://www.linkedin.com/in/corentin-leguay/"><i className="fa-brands fa-linkedin"></i> Linkedin</a>
                </p>
            </div>
        </section>
    );
}