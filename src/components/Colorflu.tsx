'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import { getWindowDimensions } from '@/projects/colorflu/shared/window-dimensions';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ColorfluDevStats from './Colorflu/ColorfluDevStats';
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

  const endGame = () => {
    engine!.endGame();
    setPaused(false);
  };

  useEffect(() => {
    if (engine) {
      console.log('yes engine');
    } else {
      console.log('no enigne');
    }
    function preventDefault(e) {
      e.preventDefault();
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'enter' || e.key.toLowerCase() === 'escape') {
        enj.pause();
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
    setEngine(enj);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    document.addEventListener('touchmove', preventDefault, { passive: false });
    animationRequestId.current = requestAnimationFrame(animate);
    // monitor ƒor game over status
    const interval = setInterval(() => {
      if (enj?.game?.gameOver) {
        console.log('Ending game');
        setStarted(false);
      }
      // ensure pause status is synced
      if (enj.paused && !paused) {
        setPaused(true);
      }
    }, 500);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
      document.removeEventListener('touchmove', preventDefault);
      cancelAnimationFrame(animationRequestId.current);
      clearInterval(interval);
    };
  }, []);

  return (
    <main>
      <div className="absolute w-screen h-screen overflow-y-clip touch-manipulation">
        {engine && !started && (
          <ColorfluStartMenu
            engine={engine!}
            start={() => {
              engine!.start();
              engine!.resume();
              setStarted(true);
            }}
          />
        )}
        {/* {engine && engine.game && process.env.NODE_ENV === 'development' && (
          <ColorfluDevStats engine={engine} />
        )} */}
        {paused && (
          <ColorfluPauseMenu
            engine={engine!}
            resume={resumeGame}
            endGame={endGame}
          />
        )}
        {engine?.game && !engine?.paused && started && (
          <ColorfluOnscreenControls engine={engine!} pause={pauseGame} />
        )}
      </div>
      <canvas ref={canvasRef} />
    </main>
  );
};

export default ColorFlu;
