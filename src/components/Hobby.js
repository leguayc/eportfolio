export default function SectionAbout({imgName, imgAlt, title, text}) {
    return (
        <div className="hobby">
            <img src={"./assets/img/" + imgName} alt={imgAlt} />
            <div>
                <p className="title">{title}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}