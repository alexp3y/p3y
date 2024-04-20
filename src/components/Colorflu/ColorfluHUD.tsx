'use client';
import { ColorfluEngine } from '@/projects/colorflu/engine';
import { LEVEL_LENGTH } from '@/projects/colorflu/shared/level';
import React, { useEffect, useState } from 'react';

interface Props {
  engine: ColorfluEngine;
}

const ColorfluHUD: React.FC<Props> = ({ engine }) => {
  const [counter, setCounter] = useState(0);
  const [showHUD, setShowHUD] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [startShade, setStartShade] = useState(0);
  const [endShade, setEndShade] = useState(0);
  const [shieldPower, setShieldPower] = useState(0);
  const [shieldLevel, setShieldLevel] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCounter(engine.game!.clock);
      setX(engine.game!.cell.xPos);
      setY(engine.game!.cell.yPos);
      setWidth(engine.screenWidth);
      setProgress(engine.game!.cell.progress);
      setStartShade(engine.graphics!.bgStartShade);
      setEndShade(engine.graphics!.bgEndShade);
      setShieldPower(engine.game!.cell.shield.power);
      setShieldLevel(engine.game!.cell.shield.activeLevel);
    }, 100);
  }, [engine]);
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center justify-between w-[280px]">
        <span className="text-2xl text-p3y-red">Clock: {counter}</span>
        <button
          className="border text-p3y-gunmetal rounded-md bg-p3y-red p-0.5 px-1.5 opacity-80"
          onClick={() => setShowHUD(!showHUD)}
        >
          STATS
        </button>
      </div>
      {showHUD && (
        <div className="flex flex-col">
          <span className="text-2xl text-p3y-red">X: {x}</span>
          <span className="text-2xl text-p3y-red">Y: {y}</span>
          <span className="text-2xl text-p3y-red">BG-start: {startShade}</span>
          <span className="text-2xl text-p3y-red">BG-end: {endShade}</span>
          <span className="text-2xl text-p3y-red">
            Screen: {width} ({width / 2})
          </span>
          <span className="text-2xl text-p3y-red">
            Progress: {progress} ({LEVEL_LENGTH - progress})
          </span>
          <span className="text-2xl text-p3y-red">
            Level Length: {LEVEL_LENGTH}
          </span>
          <span className="text-2xl text-p3y-red">
            Shield Power: {shieldPower}
          </span>
          <span className="text-2xl text-p3y-red">
            Shield Level: {shieldLevel}
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorfluHUD;
