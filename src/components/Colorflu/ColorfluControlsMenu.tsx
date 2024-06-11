import React from 'react';
import ColorfluControlsMenuKey from './ControlsMenu/ColorfluControlsMenuKey';

interface Props {
  close: () => void;
}

const ColorfluControlsMenu: React.FC<Props> = ({ close }) => {
  return (
    <>
      <span className="text-4xl md:text-5xl py-4">CONTROLS</span>
      <div className="flex flex-wrap w-full justify-center gap-y-4">
        {/* Move controls */}
        <div className="flex flex-col text-center gap-2 w-72 justify-center">
          <div className="flex gap-2 justify-center">
            <div className="w-1/3"></div>
            <ColorfluControlsMenuKey>
              <span className="">UP</span>
            </ColorfluControlsMenuKey>
            <div className="w-1/3"></div>
          </div>
          <div className="flex gap-2 justify-center">
            <ColorfluControlsMenuKey>
              <span className="">LEFT</span>
            </ColorfluControlsMenuKey>
            <ColorfluControlsMenuKey>
              <span className="">DOWN</span>
            </ColorfluControlsMenuKey>
            <ColorfluControlsMenuKey>
              <span className="">RIGHT</span>
            </ColorfluControlsMenuKey>
          </div>
          <span className="w-full text-center">Move Cell</span>
        </div>
        {/* Action controls */}
        <div className="flex flex-col w-72 text-center justify-center">
          <div className="flex gap-2 justify-center">
            <ColorfluControlsMenuKey>
              <span className="text-2xl">A</span>
            </ColorfluControlsMenuKey>
            <ColorfluControlsMenuKey>
              <span className="text-2xl">S</span>
            </ColorfluControlsMenuKey>
            <ColorfluControlsMenuKey>
              <span className="text-2xl">D</span>
            </ColorfluControlsMenuKey>
          </div>
          <div className="flex gap-x-2 justify-center">
            <span className="w-14">Fire</span>
            <span className="w-14">Shield</span>
            <span className="w-14">Fire</span>
          </div>
        </div>
      </div>

      <button
        className="border border-black rounded-lg md:border-none md:hover:underline px-3 py-1 bg-p3y-grey bg-opacity-60 md:bg-opacity-0 text-[24px]"
        onClick={close}
      >
        BACK
      </button>
    </>
  );
};

export default ColorfluControlsMenu;
