import React, { useEffect } from "react";
import styled from 'styled-components';
import anime from 'animejs';

const HeroSection = () => {

    useEffect(() => {
        const animateBlocks = () => {
            anime({
                targets: ".",
                translateX: () => anime.random(-70, 70),
                translateY: () => anime.random(-50, 50),
                scale: () => anime.random(1, 5),
                easing: "linear",
                duration: 3000,
                delay: anime.stagger(10),
                complete: animateBlocks
            });
        };

        animateBlocks();

        return () => {
            // Clean up animation when component unmounts
            anime.remove(".block");
        };
    }, []);

    return (
        <>
            <div className="background">
                <h1>
                    <span>My first background on</span>
                    <br />
                    Animejs
                </h1>
            </div>
        </>
    );
};

const Wrapper = styled.div`
    .background {
        height: 100%;
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    h1 {
        color: white;
        text-align: center;
        font-size: 10vw;
        z-index: 999;
        font-weight: 700;
        line-height: 0.6em;
    }
  
    h1 span {
        font-size: 0.2em;
        letter-spacing: 0.2em;
        font-weight: 400;
        text-transform: uppercase;
    }
  
    .block {
        position: absolute;
        height: 60px;
        width: 60px;
        background: #901ed2;
        box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.2);
    }
`;

export default HeroSection;
