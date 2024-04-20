'use client';

import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect } from 'react';

interface Props {
  engine: ColorfluEngine;
  resume: () => void;
}

const ColorfluMenu: React.FC<Props> = ({ engine, resume }) => {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === ' ') {
        resume();
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return <div className="bg-p3y-blue w-60 h-60 left-0">MENU</div>;
};

export default ColorfluMenu;
