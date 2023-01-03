
//? Bootstrap y Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Col, Container, Row } from "react-bootstrap";

import BackgroundComponent from "./components/BackgroundComponent/BackgroundComponent";
import PresentationComponent from "./components/PresentationComponent/PresentationComponent";
import DataProvider from "./components/DataContext/DataContext";
import styled from "styled-components";
import Redes from "./components/PresentationComponent/Redes";
import SkillsComponent from "./components/SkillsComponent/SkillsComponent";
import ProjectsComponent from "./components/ProjectsComponent/ProjectsComponent";


const StyledContainer = styled(Container)`

  position: relative;
  z-index: 10;
  background-color: black;
  min-height: 95vh;
  box-shadow: 0px 0px 10px 0px #9e9e9ebf;
`;

function App() {

  	return (
		<div className="App">
			<BackgroundComponent></BackgroundComponent>

			<StyledContainer className="my-2 rounded">

				<PresentationComponent></PresentationComponent>

				<Row>
					<Col>
						<ProjectsComponent></ProjectsComponent>
					</Col>
				</Row>

			</StyledContainer>

		</div>
  	);
}

export default () => {

  return (
    <DataProvider>
      <App />
    </DataProvider>
  );
};
