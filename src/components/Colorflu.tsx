'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { getWindowDimensions } from '@/projects/colorflu/shared/window-dimensions';
import ColorfluHUD from './Colorflu/ColorfluHUD';
import ColorfluPauseMenu from './Colorflu/ColorfluPauseMenu';
import { ColorfluSavedGame } from '@/projects/colorflu/saved-game';
import ColorfluStartMenu from './Colorflu/ColorfluStartMenu';

const ColorFlu: React.FC = () => {
  const canvasRef = useRef(null);
  const animationRequestId: MutableRefObject<any> = useRef();
  const [engine, setEngine] = useState<ColorfluEngine | null>(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const resumeGame = () => {
    setPaused(false);
    engine!.resume();
  };

  useEffect(() => {
    function handleResize(e: Event) {
      enj.handleResize(getWindowDimensions());
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'enter' || e.key.toLowerCase() === 'escape') {
        setPaused(!paused);
      }
      enj.handleKeydown(e.key);
    }
    function handleKeyup(e: KeyboardEvent) {
      e.preventDefault();
      enj.handleKeyup(e.key);
    }
    function animate() {
      enj!.render();
      animationRequestId.current = requestAnimationFrame(animate);
    }
    // Start game engine
    const enj = new ColorfluEngine(canvasRef.current!, getWindowDimensions());
    let savedGame = localStorage.getItem('COLORFLU_DATA');
    // enj.start(savedGame ? JSON.parse(savedGame) : null);
    setEngine(enj);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    animationRequestId.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
      cancelAnimationFrame(animationRequestId.current);
    };
  }, []);

  return (
    <main>
      <NavBar />
      <div className="absolute right-0 w-screen h-fit">
        {engine && !started && (
          <ColorfluStartMenu
            engine={engine}
            start={() => {
              engine.start();
              setStarted(true);
            }}
          />
        )}
        {engine && engine.game && <ColorfluHUD engine={engine} />}
        {paused && <ColorfluPauseMenu engine={engine!} resume={resumeGame} />}
      </div>
      <canvas ref={canvasRef} />
    </main>
  );
};

export default ColorFlu;
