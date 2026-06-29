import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {getAnimationFrames} from '../whiteboard.config';

export const RevealSequence = ({children}) => {
  const {fps} = useVideoConfig();
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const sequenceIds = [...new Set(elements.map((element) => element.props.sequenceId))].sort(
    (a, b) => a - b,
  );

  const timeline = new Map();
  let nextStartFrame = 0;

  for (const sequenceId of sequenceIds) {
    const group = elements.filter((element) => element.props.sequenceId === sequenceId);
    const groupFrames = Math.max(
      ...group.map(
        (element) => getAnimationFrames(element, fps).animationFrames,
      ),
    );

    timeline.set(sequenceId, {startFrame: nextStartFrame});
    nextStartFrame += groupFrames;
  }

  return elements.map((element) => {
    const sequenceTiming = timeline.get(element.props.sequenceId);
    const ownTiming = getAnimationFrames(element, fps);
    return React.cloneElement(element, {...sequenceTiming, ...ownTiming});
  });
};

export const RevealElement = ({
  startFrame = 0,
  animationFrames = 1,
  progressEnd = 100,
  x,
  y,
  children,
}) => {
  const frame = useCurrentFrame();

  // প্রগ্রেস ক্যালকুলেশন - নিজস্ব স্টার্ট ফ্রেমের সাপেক্ষে
  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationFrames],
    [0, progressEnd],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  // এলিমেন্টটি মাউন্ট থাকা দরকার যাতে রিফ কাজ করে, কিন্তু স্টার্ট ফ্রেমের আগে হাইড থাকবে
  const isStarted = frame >= startFrame;

  return (
    <div style={{position: 'absolute', top: y, left: x, visibility: isStarted ? 'visible' : 'hidden'}}>
      {React.cloneElement(children, {progress})}
    </div>
  );
};
