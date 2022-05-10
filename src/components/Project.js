import { useState } from "react";

export function Project({title, children, link}) {
    const [classList, setClassList] = useState('project');
    
    const setFadeIn = () => {
        setClassList('project show')
    }

    setTimeout(setFadeIn, 230);

    return (
        <div className={classList}>
            <h3>{title}</h3>
            {children}
            {link &&
                <a href={link.url} className="link"><i className={link.icon}></i> {link.name}</a>
            }
        </div>
    );
}