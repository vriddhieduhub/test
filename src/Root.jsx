import React from 'react';
import { Composition } from 'remotion';
import { MainVideoEngine, mainVideoSequence } from './MainVideoEngine';
import { getSequenceDurationInFrames } from './whiteboard.config';

const FPS = 30;
const END_HOLD_IN_FRAMES = FPS;

export const RemotionRoot = () => {
  return (
    <Composition
      id="WhiteboardEngine"
      component={MainVideoEngine}
      durationInFrames={getSequenceDurationInFrames(mainVideoSequence, FPS) + END_HOLD_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
