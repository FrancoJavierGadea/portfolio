import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../DataContext/DataContext";
import ProjectsComponent from "../ProjectsComponent/ProjectsComponent";
import SkillsComponent from "../SkillsComponent/SkillsComponent";
import PerfilImage from "./PerfilImage";
import Redes from "./Redes";
import TitleAnimated from "./TitleAnimated";

function PresentationComponent() {

    const {name, description} = useContext(DataContext);

    return (<>

        <Row>
            <Col className="p-0" xs={12} xl={4}>
                <PerfilImage></PerfilImage>
            </Col>

            <Col className="p-0 pt-xl-4" xs={12} xl={8}>

                <TitleAnimated text={name} fs_xxl={18} fs_xl={16} fs_sm={12} distance={5.5} connectDistance={7}></TitleAnimated>

            </Col>
        </Row>

        <Row>
            <Col className="p-0" xs={12} xl={4}>
                <Redes></Redes>

                <div className="py-2 px-4 text-light">
                    {
                        description.split('\n').map((value, index) => <p key={'p' + index}>{value}</p>)
                    }
                </div>
                
            </Col>

            <Col className="p-0" xs={12} xl={8}>
                <SkillsComponent></SkillsComponent>
            </Col>
        </Row>
    
    </>);
}

export default PresentationComponent;