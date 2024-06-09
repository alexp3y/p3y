'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import { getWindowDimensions } from '@/projects/colorflu/shared/window-dimensions';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ColorfluOnscreenControls from './Colorflu/ColorfluOnscreenControls';
import ColorfluPauseMenu from './Colorflu/ColorfluPauseMenu';
import ColorfluStartMenu from './Colorflu/ColorfluStartMenu';

const ColorFlu: React.FC = () => {
  const canvasRef = useRef(null);
  const animationRequestId: MutableRefObject<any> = useRef();
  const [engine, setEngine] = useState<ColorfluEngine | null>(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const pauseGame = () => {
    setPaused(true);
    engine!.pause();
  };

  const resumeGame = () => {
    setPaused(false);
    engine!.resume();
  };

  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    document.body.style.overflowY = 'none';
    document.body.style.touchAction = 'manipulation';
    if (engine) {
      console.log('yes engine');
    } else {
      console.log('no enigne');
    }
    function handleResize(e: Event) {
      enj.handleResize(getWindowDimensions());
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'enter' || e.key.toLowerCase() === 'escape') {
        setPaused(!paused);
      }
      enj.applyKey(e.key);
    }
    function handleKeyup(e: KeyboardEvent) {
      e.preventDefault();
      enj.releaseKey(e.key);
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
      <div className="absolute w-screen h-screen overflow-y-clip touch-manipulation">
        {engine && !started && (
          <ColorfluStartMenu
            engine={engine}
            start={() => {
              engine.start();
              setStarted(true);
            }}
          />
        )}
        {/* {engine && engine.game && process.env.NODE_ENV === 'development' && (
          <ColorfluHUD engine={engine} />
        )} */}
        {engine?.paused && (
          <ColorfluPauseMenu engine={engine!} resume={resumeGame} />
        )}
        {engine?.game && !engine?.paused && (
          <ColorfluOnscreenControls engine={engine!} pause={pauseGame} />
        )}
      </div>
      <canvas ref={canvasRef} />
    </main>
  );
};

export default ColorFlu;
