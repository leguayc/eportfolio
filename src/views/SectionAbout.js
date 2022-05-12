import { useTranslation } from "react-i18next";
import Hobby from "../components/Hobby";

export default function SectionAbout(props) {
    const { t } = useTranslation();

    return (
        <section id="aboutme" className="section">
            <h2>{t('About me')}</h2>
            <div className="content">
                <p>
                    {t('About me first')}
                </p>
                <p>
                    {t('About me second')}
                </p>
                <div className="hobbies">
                    <Hobby imgName="d20.svg" imgAlt={t('Roleplay alt')} title={t('Roleplay')} text={t('Roleplay text')}/>
                    <Hobby imgName="travel.svg" imgAlt={t('Voyage alt')} title={t('Travel')} text={t('Travel text')}/>
                    <Hobby imgName="spaceinvaders.svg" imgAlt={t('Pop culture alt')} title={t('Pop culture')} text={t('Pop culture text')}/>
                    <Hobby imgName="metalsign.svg" imgAlt={t('Music alt')} title={t('Music')} text={t('Music text')}/>
                </div>
            </div>
        </section>
    );
}