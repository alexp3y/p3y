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
    // document.addEventListener('gesturestart', function (e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   document.body.style.zoom = 0.99;
    // });

    // document.addEventListener('gesturechange', function (e) {
    //   e.stopPropagation();
    //   e.preventDefault();

    //   document.body.style.zoom = 0.99;
    // });
    // document.addEventListener('gestureend', function (e) {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   document.body.style.zoom = 1;
    // });
    document.addEventListener(
      'touchstart',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('stopping');
      },
      { passive: false }
    );
    document.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('stopping');
      },
      { passive: false }
    );
    const rect = document
      .getElementById('move-controls')
      ?.getBoundingClientRect();
    setMoveControlX(rect!.x + 32);
    setMoveControlY(rect!.y + 32);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    // e.preventDefault();
    e.stopPropagation();
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    // e.preventDefault();
    e.stopPropagation();
    if (e.touches) {
      handleTouch(e.touches[0]);
    }
  };
  const handleTouchEnd = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    engine.stopCellMotion();
  };
  const handleTouchCancel = (e) => {
    // e.preventDefault();
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
    <div className="flex lg:hidden h-full max-h-screen overflow-y-none justify-between flex-col">
      <div className="flex width-full justify-end p-8" id="top-controls">
        <button
          className="rounded-xl border-p3y-gunmetal border-2 p-3 bg-p3y-grey text-p3y-gunmetal anta bg-opacity-35"
          onClick={() => pause()}
        >
          PAUSE
        </button>
      </div>
      <div id="bottom-controls" className="flex width-full justify-between p-6">
        <div
          id="move-controls"
          className="rounded-full bg-p3y-gunmetal h-16 aspect-square bg-opacity-45  border-p3y-gunmetal border-2 m-2 ml-4"
          onTouchStart={handleTouchStart as any}
          onTouchMove={handleTouchMove as any}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        />
        <div className="flex gap-x-3 items-end pb-2">
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              engine.applyKey('a');
            }}
          />
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              engine.applyKey('s');
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              engine.releaseKey('s');
            }}
          />
          <div
            className="rounded-full border-p3y-gunmetal border aspect-square h-14 bg-p3y-red bg-opacity-70"
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              engine.applyKey('d');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorfluOnscreenControls;
