import { useEffect, useRef, useState } from 'react';
import Typing from '../util/Typing.js';

export default function Board() {
    const boardCanvas = useRef();
    const [typoList, setTypoList] = useState([]);

    useEffect(() => {
        boardCanvas.current.width = window.innerWidth;
        boardCanvas.current.height = window.innerHeight;
        window.addEventListener('keypress', handleKeyPress);
        window.requestAnimationFrame(render);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
            window.cancelAnimationFrame(render);
        }
    });

    const handleKeyPress = (e) => {
        setTypoList([...typoList, new Typing(e.key, boardCanvas.current)]);
        
        if (typoList.length > 100) {
            typoList.splice(0, 50);
        }
    }

    const clear = () => {
        boardCanvas.current.getContext('2d').clearRect(0, 0, boardCanvas.current.width, boardCanvas.current.height);
    }

    const render = () => {
        clear();
        typoList.forEach(typo => { typo.draw() });
        window.requestAnimationFrame(render);
    }

    return <canvas ref={boardCanvas}></canvas>
}