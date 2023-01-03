import { useContext } from "react";
import { DataContext } from "../DataContext/DataContext";
import ProjectCard from "./ProjectCard";

function ProjectsComponent() {

    const {github} = useContext(DataContext);

    console.log(github);

    return (<div className="ProjectsComponent p-2 text-light">
        
        <h2 className="p-2 border-bottom border-info">Projectos</h2>

        <div className="d-flex justify-content-evenly flex-wrap">
            {
                github?.repositories.map((rep, index) => <ProjectCard name={rep.name} description={rep.description} github={rep.url} gh_pages={rep.gh_pages} key={'rep' + index}></ProjectCard>)
            }
        </div>

    </div>);
}

export default ProjectsComponent;