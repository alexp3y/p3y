'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect, useState } from 'react';
import ColorfluControlsMenu from './ColorfluControlsMenu';

interface Props {
  engine: ColorfluEngine;
  resume: () => void;
  endGame: () => void;
}

const ColorfluPauseMenu: React.FC<Props> = ({ engine, resume, endGame }) => {
  const [showControlMenu, setShowControlMenu] = useState(false);

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
    <div className="w-full h-full flex items-center justify-center flex-col px-8">
      <div className="border-p3y-gunmental border-2 rounded-3xl text-p3y-gunmetal flex flex-col justify-center items-center anta bg-[#f28cb8] bg-opacity-10 pb-8 p-4 gap-y-4 mt-6 w-4/5 max-w-[700px]">
        {showControlMenu ? (
          <ColorfluControlsMenu close={() => setShowControlMenu(false)} />
        ) : (
          <>
            <span className="text-4xl md:text-5xl p-4">PAUSED</span>
            <button
              className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
              onClick={() => resume()}
            >
              RESUME
            </button>
            <button
              className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
              onClick={() => setShowControlMenu(true)}
            >
              CONTROLS
            </button>
            <button
              className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
              onClick={() => endGame()}
            >
              END GAME
            </button>
          </>
        )}
      </div>
      <div className="h-1/6"></div>
    </div>
  );
};

export default ColorfluPauseMenu;
