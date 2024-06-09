import { ColorfluEngine } from '@/projects/colorflu/engine';
import React, { useEffect, useState } from 'react';

interface Props {
  engine: ColorfluEngine;
  pause: () => void;
}

const CONTROLLER_AXIS_BUFFER = 15;

const ColorfluOnscreenControls: React.FC<Props> = ({ engine, pause }) => {
  const [moveControllerX, setMoveControlX] = useState(0);
  const [moveControllerY, setMoveControlY] = useState(0);

  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    const rect = document
      .getElementById('move-controls')
      ?.getBoundingClientRect();
    setMoveControlX(rect!.x + 40);
    setMoveControlY(rect!.y + 40);
  }, []);

  const getPos = () => {
    const rect = document
      .getElementById('move-controls')
      ?.getBoundingClientRect();
    console.log(moveControllerX + ' : ' + moveControllerY);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchEnd = () => {
    engine.stopCellMotion();
  };
  const handleTouchCancel = () => {
    engine.stopCellMotion();
  };

  const handleTouch = (touch: Touch) => {
    // console.log(`(${touch.pageX}, ${touch.pageY})`);
    // getPos();
    engine.stopCellMotion();
    if (touch.pageX < moveControllerX) {
      if (touch.pageY < moveControllerY) {
        // return 'Q1';
        if (Math.abs(touch.pageX - moveControllerX) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowleft');
        }
        if (Math.abs(touch.pageY - moveControllerY) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowup');
        }
      } else {
        // return 'Q4';
        if (Math.abs(touch.pageX - moveControllerX) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowleft');
        }
        if (Math.abs(touch.pageY - moveControllerY) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowdown');
        }
      }
    } else {
      if (touch.pageY < moveControllerY) {
        // return 'Q2';
        if (Math.abs(touch.pageX - moveControllerX) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowright');
        }
        if (Math.abs(touch.pageY - moveControllerY) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowup');
        }
      } else {
        // return 'Q3';
        if (Math.abs(touch.pageX - moveControllerX) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowright');
        }
        if (Math.abs(touch.pageY - moveControllerY) > CONTROLLER_AXIS_BUFFER) {
          engine.applyKey('arrowdown');
        }
      }
    }
  };

  return (
    <div className="flex lg:hidden h-full justify-between flex-col">
      <div className="flex width-full justify-end p-8" id="top-controls">
        <button
          className="rounded-xl border-p3y-gunmetal border-2 p-3 bg-p3y-grey text-p3y-gunmetal anta bg-opacity-35"
          onClick={() => pause()}
        >
          PAUSE
        </button>
      </div>
      <div id="bottom-controls" className="flex width-full justify-between p-4">
        <div
          id="move-controls"
          className="rounded-full bg-p3y-gunmetal h-20 aspect-square bg-opacity-45  border-p3y-gunmetal border-2 m-2 ml-4"
          onTouchStart={handleTouchStart as any}
          onTouchMove={handleTouchMove as any}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          onClick={getPos}
        />
        <div className="flex gap-x-2 items-end mb-2">
          <button
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onClick={() => engine.applyKey('a')}
          />
          <button
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onMouseDown={() => engine.applyKey('s')}
            onTouchStart={() => engine.applyKey('s')}
            onMouseUp={() => engine.releaseKey('s')}
            onTouchEnd={() => engine.releaseKey('s')}
          />
          <button
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onClick={() => engine.applyKey('d')}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorfluOnscreenControls;
