import { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../DataContext/DataContext";

const StyledDiv = styled.div`
    padding: 20px;

    img {
        display: block;
        margin: auto;
        height: 250px;
        max-width: 250px;
        width: 100%;
        border-radius: 50%;
        object-fit: scale-down;
        box-shadow: 0px 0px 10px 0px #9e9e9ebf;
    }
`;

function PerfilImage() {

    const {github} = useContext(DataContext);

    return (<StyledDiv>
        <img src={github?.perfilImage} alt="Foto de Perfil"/>
    </StyledDiv>);
}

export default PerfilImage;