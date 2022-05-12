import { useTranslation } from "react-i18next";

export default function ScrolldownNotice({href}) {
    const {t} = useTranslation();

    return (
        <a href={href} className="scrolldown"><i className="fa-solid fa-angle-down"></i><h5>{t('Scroll down')}</h5><i className="fa-solid fa-angle-down"></i></a>
    );
}