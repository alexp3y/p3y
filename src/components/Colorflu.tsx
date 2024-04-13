'use client';

import { ColorfluEngine } from '@/projects/colorflu/colorflu-engine';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { getWindowDimensions } from '@/projects/colorflu/shared/window-dimensions';
import ColorfluHUD from './Colorflu/ColorfluHUD';

const ColorFlu: React.FC = () => {
  const canvasRef = useRef(null);
  const animationRequestId: MutableRefObject<any> = useRef();
  const [engine, setEngine] = useState<ColorfluEngine | null>(null);

  useEffect(() => {
    function handleResize(e: Event) {
      enj.handleResize(getWindowDimensions());
    }
    function handleKeydown(e: KeyboardEvent) {
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
    enj.start();
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
      <div className="absolute right-0">
        {engine && <ColorfluHUD engine={engine} />}
      </div>
      <canvas ref={canvasRef} />
    </main>
  );
};

export default ColorFlu;
