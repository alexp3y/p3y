'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect } from 'react';
import ColorfluTitleBar from './ColorfluTitleBar';

interface Props {
  engine: ColorfluEngine;
  start: () => void;
}

const ColorfluStartMenu: React.FC<Props> = ({ engine, start }) => {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'arrowdown') {
        console.log('move down');
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="w-full h-full left-0 flex justify-center items-center flex-col text-p3y-gunmetal">
      <div className="text-[60px] md:text-[80px] my-12">
        <ColorfluTitleBar />
      </div>
      <div className="flex anta flex-col text-[24px]">
        <button onClick={() => start()}>▶ NEW GAME ◀</button>
        <button onClick={() => start()}>OPTIONS</button>
        <button onClick={() => start()}>CONTROLS</button>
      </div>
    </div>
  );
};

export default ColorfluStartMenu;
