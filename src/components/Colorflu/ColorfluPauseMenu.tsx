'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect } from 'react';

interface Props {
  engine: ColorfluEngine;
  resume: () => void;
  endGame: () => void;
}

const ColorfluPauseMenu: React.FC<Props> = ({ engine, resume, endGame }) => {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'enter') {
        resume();
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-start flex-col">
      <div className="h-1/5"></div>
      <div className="border-p3y-gunmental border-2 rounded-3xl text-p3y-gunmetal w-60 h-60 left-0 flex flex-col justify-start items-center anta bg-p3y-grey bg-opacity-30 p-8 gap-y-4">
        <span className="text-4xl">PAUSED</span>
        <button
          className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0 text-[20px]"
          onClick={() => resume()}
        >
          RESUME
        </button>
        <button className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0 text-[20px]">
          CONTROLS
        </button>
        <button
          className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0 text-[20px]"
          onClick={() => endGame()}
        >
          END GAME
        </button>
      </div>
    </div>
  );
};

export default ColorfluPauseMenu;
