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
    <div className="w-full h-2/3 left-0 flex justify-center items-center flex-col text-p3y-gunmetal pt-20">
      <div className="text-[60px] md:text-[80px] mb-8">
        <ColorfluTitleBar />
      </div>
      <div className="flex anta flex-col text-[24px] gap-y-2">
        <button
          className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0"
          onClick={() => start()}
        >
          NEW GAME
        </button>
        <button className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0">
          OPTIONS
        </button>
        <button className="border border-black rounded-lg md:border-none md:hover:underline px-2 bg-p3y-grey bg-opacity-40 md:bg-opacity-0">
          CONTROLS
        </button>
      </div>
      <div className="mt-20" />
    </div>
  );
};

export default ColorfluStartMenu;
