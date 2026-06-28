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
        (element) => getAnimationFrames(element.props.children, fps).animationFrames,
      ),
    );

    timeline.set(sequenceId, {startFrame: nextStartFrame});
    nextStartFrame += groupFrames;
  }

  return elements.map((element) => {
    const ownTiming = getAnimationFrames(element.props.children, fps);
    const sequenceTiming = timeline.get(element.props.sequenceId);
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

  if (frame < startFrame) {
    return null;
  }

  const progress = interpolate(
    frame,
    [startFrame, startFrame + animationFrames],
    [0, progressEnd],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <div style={{position: 'absolute', top: y, left: x}}>
      {React.cloneElement(children, {progress})}
    </div>
  );
};
