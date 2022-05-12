import { useTranslation } from "react-i18next";
import ScrolldownNotice from "../components/ScrolldownNotice";

export default function SectionLanding(props) {
    const {t} = useTranslation();

    return (
        <section id="landing" className="section">
            <div className="logo"><img src="./assets/img/avatar.svg" alt="Avatar" /></div>
            <div className="content txtc">
                <h3>{t('Landing hi')}</h3>
                <h1>{t('Fullstack dev')}</h1>
                <h3>{t('Welcome portfolio')}</h3>
            </div>
            <ScrolldownNotice href="#aboutme"/>
        </section>
    );
}