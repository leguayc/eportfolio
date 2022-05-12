import { useTranslation } from "react-i18next";

export function LangButton() {
    const {t, i18n} = useTranslation();
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    const imgSrc = './assets/img/flag-' + nextLang + '.svg';
    const altImg = t('Change lang') + ' ' + nextLang.toUpperCase();

    return (
        <button onClick={() => {i18n.changeLanguage(nextLang)}}>
            <img src={imgSrc} alt={altImg} />
        </button>
    );
}