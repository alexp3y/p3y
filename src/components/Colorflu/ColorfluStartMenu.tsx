'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect, useState } from 'react';
import ColorfluTitleBar from './ColorfluTitleBar';
import ColorfluControlsMenu from './ColorfluControlsMenu';

interface Props {
  engine: ColorfluEngine;
  start: () => void;
}

const ColorfluStartMenu: React.FC<Props> = ({ engine, start }) => {
  const [showControls, setShowControls] = useState(false);

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
    <div className="w-full h-2/3 left-0 flex justify-center items-center flex-col text-p3y-gunmetal pt-20 px-4 my-4">
      <div className="border-p3y-gunmental border-2 rounded-3xl text-p3y-gunmetal flex flex-col justify-start items-center anta bg-[#f28cb8] bg-opacity-10 pb-8 p-4 gap-y-4 mt-6 w-4/5 max-w-[700px]">
        {showControls ? (
          <ColorfluControlsMenu close={() => setShowControls(false)} />
        ) : (
          <>
            <div className="text-[50px] md:text-[80px] md:px-4">
              <ColorfluTitleBar />
            </div>
            <button
              className="border border-black rounded-lg md:border-none md:hover:underline px-3 py-1 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
              onClick={() => start()}
            >
              NEW GAME
            </button>
            <button
              className="border border-black rounded-lg md:border-none md:hover:underline px-3 py-1 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
              onClick={() => setShowControls(true)}
            >
              CONTROLS
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorfluStartMenu;
