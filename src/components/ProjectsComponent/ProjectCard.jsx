import styled from "styled-components";


const StyledDiv = styled.div`

    background-color: #838484;
    border-radius: 10px;

    position: relative;
    width: fit-content;

    min-width: 170px;

    min-height: 100px;

    max-width: 300px;
    max-height: 200px;




    display: flex;
    flex-direction: column;


    p {
        max-height: 95px;
        overflow: hidden;
    }

    .links {
        margin-top: auto;
        width: 100%;
        display: flex;
        justify-content: end;
    }

`;

function ProjectCard({name, description, github, gh_pages}) {

    return (<StyledDiv className="ProjectCard p-2 m-2">

        <div>

            <h6 className="p-1 border-bottom">{name}</h6>

            <p className="m-0">{description}</p>

        </div>

        <div className="links pt-2">
            <a className="mx-1 btn btn-outline-light border-0" href={github} target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
            </a>
            {
                gh_pages ? 
                    <a className="mx-1 btn btn-outline-light border-0" href={gh_pages} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-link-45deg"></i>
                    </a>
                : ''
            }
        </div>

    </StyledDiv>);
}

export default ProjectCard;