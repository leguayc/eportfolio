import { useTranslation } from 'react-i18next';
import CV_en from '../assets/CV_CorentinLeguay_en.pdf';
import CV_fr from '../assets/CV_CorentinLeguay_fr.pdf';

export default function SectionContact(props) {
    const {t, i18n} = useTranslation();

    let CV;
    switch(i18n.language.split('-')[0]) {
        case "fr" :
            CV = CV_fr;
            break;
        case "en" :
            CV = CV_en;
            break;
        default : 
            console.error("Not implemented");
    }

    return (
        <section id="contact" className="section">
            <h2>{t('Contact me')}</h2>
            <div className="canvasfree"></div>
            <div className='content-wrapper'>
                <div className="content">
                    <p>{t('Contact question')}</p>
                    <div className="linkList">
                        <a className="link" href="mailto:corentin.leguay@gmail.com"><i className="fa-solid fa-envelope"></i> {t('Send email')}</a>
                        <a className="link" href="https://www.linkedin.com/in/corentin-leguay/"><i className="fa-brands fa-linkedin"></i> {t('Linkedin')}</a>
                    </div>
                </div>
                <div className="content">
                    <p>{t('If resume')}</p>
                    <div className="linkList">
                        <a className="link" href={CV} target='_blank' rel='noopener noreferrer'><i className="fa-solid fa-download"></i> {t('Download resume')}</a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p><i className="fa-regular fa-copyright"></i> 2022 Corentin Leguay</p>
                <div className="credits">
                    <p>
                        {t('Credits to')} <a className="colored" href="https://sketchfab.com/shedmon">shedmon</a> {t('Credits phone')}, <a className='colored' href="https://poly.pizza/u/Jarlan%20Perez">Jarlan Perez</a> {t('Credits envelopes')}, <a className="colored" href="https://github.com/FortAwesome/Font-Awesome">FortAwesome</a> {t('Credits D20')}, {t('and')} <a className='colored' href="https://www.wishforge.games/">wishforge.games</a> {t('Credits metal')}.
                    </p>
                </div>
            </div>
        </section>
    );
}