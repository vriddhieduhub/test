import React from 'react';
import { Composition } from 'remotion';
import { MainVideoEngine, scene01Sequence, scene02Sequence, scene03Sequence,
   scene04Sequence, mcpBasicFlowSequence } from './MainVideoEngine';
import { getSequenceDurationInFrames } from './whiteboard.config';

const FPS = 30;
const END_HOLD_IN_FRAMES = FPS * 3;

export const RemotionRoot = () => {
  // প্রতিটি সিনের আসল ডিউরেশন ক্যালকুলেট করা
  const scene01Duration = getSequenceDurationInFrames(scene01Sequence, FPS);
  const scene02Duration = getSequenceDurationInFrames(scene02Sequence, FPS);
  const scene03Duration = getSequenceDurationInFrames(scene03Sequence, FPS);
  const scene04Duration = getSequenceDurationInFrames(scene04Sequence, FPS);
  const scene05Duration = getSequenceDurationInFrames(mcpBasicFlowSequence, FPS);


  // মোট ডিউরেশন = Scene01 + Scene02 + Scene03 + End Hold
  const totalDuration = 
    scene01Duration + 
    scene02Duration + 
    scene03Duration + 
    scene04Duration +
    scene05Duration +
    END_HOLD_IN_FRAMES;

  return (
    <Composition
      id="WhiteboardEngine"
      component={MainVideoEngine}
      durationInFrames={totalDuration}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
