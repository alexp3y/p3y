'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect } from 'react';

interface Props {
  engine: ColorfluEngine;
  resume: () => void;
}

const ColorfluPauseMenu: React.FC<Props> = ({ engine, resume }) => {
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
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={() => resume()}
    >
      <div className="border-p3y-gunmental border-2 rounded-3xl text-p3y-gunmetal w-60 h-60 left-0 flex justify-center items-center anta text-4xl bg-p3y-grey bg-opacity-30">
        PAUSED
      </div>
    </div>
  );
};

export default ColorfluPauseMenu;
