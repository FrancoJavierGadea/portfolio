import { useContext } from "react";
import { DataContext } from "../DataContext/DataContext";
import SkillChart from "./SkillChart";

function SkillsComponent() {

    const {skills} = useContext(DataContext);

    return (<div className="SkillsComponent p-2 text-light">

        <h2 className="p-2 border-bottom border-info">Skills</h2>

        <div className="d-flex justify-content-evenly flex-wrap">
            {
                skills.map((skill, index) => <SkillChart name={skill.name} value={skill.value} logo={skill.logo} key={'skill-' + index}></SkillChart>)
            }
        </div>

    </div>);
}

export default SkillsComponent;