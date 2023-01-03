
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { TextAnimation } from "./TextAnimation";

const mouseInitialState = {x: undefined, y: undefined, radius: 30};

function TitleAnimated({text, fontSize, fs_xxl, fs_sm, fs_xl, distance, connectDistance}) {
    
    const canvasRef = useRef(null);


    //? Breakpoints
    const isXXL = useMediaQuery({query: '(min-width: 1400px)'});
    const isXL = useMediaQuery({query: '(min-width: 1200px)'});
    //const isLG = useMediaQuery({query: '(min-width: 992px)'});
    //const isMD = useMediaQuery({query: '(min-width: 768px)'});
    const isSM = useMediaQuery({query: '(min-width: 576px)'});


    //? Calcular dinamicamente el width del canvas
    const canvasContainerRef = useRef(null);

    const [width, setWidth] = useState(undefined);

    useEffect(() => {
        
        setWidth(canvasContainerRef.current.offsetWidth);

        window.addEventListener('resize', () => {

            setWidth(canvasContainerRef.current.offsetWidth);
        });

    }, []);


    
    //? Mouse data
    const mouseRef = useRef(mouseInitialState);
    
    const mouseMove = ({nativeEvent: {offsetX, offsetY}}) => {
        
        mouseRef.current = {...mouseInitialState, x: offsetX, y: offsetY};
    }
    
    const mouseLeave = () => {
        
        mouseRef.current = mouseInitialState;
    }
    

    //? Animacion
    const animationIdRef = useRef(null);

    useEffect(() => {
        
        if(canvasRef.current !== null){

            const animation = TextAnimation(canvasRef.current, text, {
                fontSize: fontSize || (isXXL && fs_xxl) || (isXL && fs_xl) || (isSM && fs_sm) || 10,
                distance: distance || 5,
                connectDistance: connectDistance || 10
            });

            function animate() {

                animation.draw(mouseRef);

                animationIdRef.current = requestAnimationFrame(animate);
            }

            animate();
        }

        return () => {

            if(animationIdRef.current !== null){

                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
        }

    }, [width, text, fontSize, distance, connectDistance, isSM, isXL, isXXL, fs_xxl, fs_xl, fs_sm]);

    return (<div ref={canvasContainerRef}>

        <canvas width={width} onMouseMove={mouseMove} onMouseLeave={mouseLeave} ref={canvasRef}></canvas>

    </div>);
    
}

export default TitleAnimated;