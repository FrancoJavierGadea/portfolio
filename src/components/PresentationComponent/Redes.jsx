import { useContext } from "react";
import { DataContext } from "../DataContext/DataContext";

function Redes() {

    const {github, email, whatsapp, linkedin} = useContext(DataContext);


    return (<div className="d-flex justify-content-evenly">

        <a className="btn fs-4 btn-outline-secondary border-0" href={github?.url} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
        </a>

        <a className="btn fs-4 btn-outline-secondary border-0" href={linkedin?.url} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
        </a>

        <a className="btn fs-4 btn-outline-secondary border-0" href={email?.url} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-envelope"></i>
        </a>

        <a className="btn fs-4 btn-outline-secondary border-0" href={whatsapp?.url} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp"></i>
        </a>

    </div>);
}

export default Redes;