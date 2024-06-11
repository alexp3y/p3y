'use client';
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
    const rect = document
      .getElementById('move-controls')
      ?.getBoundingClientRect();
    setMoveControlX(rect!.x + 48);
    setMoveControlY(rect!.y + 48);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation();
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    engine.stopCellMotion();
  };
  const handleTouchCancel = (e) => {
    e.stopPropagation();
    engine.stopCellMotion();
  };

  const handleTouch = (touch: Touch) => {
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
    <div className="flex  h-full max-h-screen overflow-y-none justify-between flex-col">
      <div className="flex width-full justify-end p-8" id="top-controls">
        <div
          className="rounded-xl border-p3y-gunmetal border-2 py-1 px-2 bg-[#f28cb8] bg-opacity-20 text-p3y-gunmetal anta cursor-pointer text-[18px]"
          onClick={() => pause()}
        >
          PAUSE
        </div>
      </div>
      <div
        id="bottom-controls"
        className="flex width-full justify-between px-6 lg:hidden pb-10"
      >
        <div
          id="move-controls"
          className="rounded-full bg-p3y-gunmetal h-24 aspect-square bg-opacity-45  border-p3y-gunmetal border-2 m-2 ml-3 flex flex-col"
          onTouchStart={handleTouchStart as any}
          onTouchMove={handleTouchMove as any}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div className="h-1/3 flex">
            <div className="w-1/3" />
            <div className="w-1/3 rounded-t-full bg-p3y-gunmetal bg-opacity-60" />
            <div className="w-1/3" />
          </div>
          <div className="h-1/3 flex">
            <div className="w-1/3 rounded-l-full bg-p3y-gunmetal bg-opacity-60" />
            <div className="w-1/3 rounded-full bg-p3y-gunmetal bg-opacity-30" />
            <div className="w-1/3 rounded-r-full bg-p3y-gunmetal bg-opacity-60" />
          </div>
          <div className="h-1/3 flex">
            <div className="w-1/3" />
            <div className="w-1/3 rounded-b-full bg-p3y-gunmetal bg-opacity-60" />
            <div className="w-1/3" />
          </div>
        </div>
        <div className="flex gap-x-3 items-end pb-2">
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-gunmetal bg-opacity-45 flex justify-center items-center"
            onTouchStart={(e) => {
              engine.applyKey('a');
            }}
          >
            <span className="text-2xl text-p3y-ivory">A</span>
          </div>
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-gunmetal bg-opacity-45 flex justify-center items-center"
            onTouchStart={(e) => {
              engine.applyKey('s');
            }}
            onTouchEnd={(e) => {
              engine.releaseKey('s');
            }}
          >
            <span className="text-2xl text-p3y-ivory">S</span>
          </div>
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-gunmetal bg-opacity-45 flex justify-center items-center"
            onTouchStart={(e) => {
              engine.applyKey('d');
            }}
          >
            <span className="text-2xl text-p3y-ivory">D</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorfluOnscreenControls;
