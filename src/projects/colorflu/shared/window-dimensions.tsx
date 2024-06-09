'use client';

export const NAVBAR_HEIGHT = 0;

export type WindowDimensions = {
  width: number;
  height: number;
};

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
