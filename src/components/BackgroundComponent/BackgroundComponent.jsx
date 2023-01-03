import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { BackgroundAnimation } from "./BackgroudAnimation";

const StyledContainer = styled.div`

    background-color: black;

    max-width: 100vw;
    min-height: 100vh;

    overflow: hidden;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
`;

function getSize(){

    const body = document.body
    const html = document.documentElement;

    const size = {
        width: html.offsetWidth,
        height: html.offsetHeight
    }

    return size;

}

function BackgroundComponent() {

    const canvasRef = useRef();

    const animationIdRef = useRef();

    const sizeRef = useRef({width: 1920, height: 1080});

    useEffect(() => {
        
        if(canvasRef.current !== null){

            console.log('star');

            const animation = BackgroundAnimation();

            function animate() {

                sizeRef.current = getSize();

                canvasRef.current.width = sizeRef.current.width;

                canvasRef.current.height = sizeRef.current.height;

                animation.draw(canvasRef.current);

                animationIdRef.current = requestAnimationFrame(animate);
            }

            animate();
        }


        return () => {

            if(animationIdRef.current !== null){

                console.log('stop');
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;  
            }
        }

    }, []);

    return (<StyledContainer>
        <canvas ref={canvasRef}></canvas>
    </StyledContainer>);
}

export default BackgroundComponent;