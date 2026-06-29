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
    
    // 🎯 মেইন ফিক্স ১: গ্রুপ ফ্রেম ক্যালকুলেট করার সময় আসল ভেতরের চাইল্ড নোডটি পাঠানো হচ্ছে
    const groupFrames = Math.max(
      ...group.map((element) => {
        const coreChild = element.props.children;
        return React.isValidElement(coreChild)
          ? getAnimationFrames(coreChild, fps).animationFrames
          : getAnimationFrames(element, fps).animationFrames;
      }),
    );

    timeline.set(sequenceId, {startFrame: nextStartFrame});
    nextStartFrame += groupFrames;
  }

  return elements.map((element) => {
    const sequenceTiming = timeline.get(element.props.sequenceId);
    
    // 🎯 মেইন ফিক্স ২: ক্লোনিং এবং ওন টাইমিংয়ের সময়ও আসল ভেতরের চাইল্ডের ফ্রেম পাস করা হচ্ছে
    const coreChild = element.props.children;
    const ownTiming = React.isValidElement(coreChild)
      ? getAnimationFrames(coreChild, fps)
      : getAnimationFrames(element, fps);

    // RevealElement তার নিজের progress ক্যালকুলেশনের জন্য animationFrames এবং progressEnd পাবে
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

  // প্রগ্রেস ক্যালকুলেশন - নিজস্ব স্টার্ট ফ্রেমের সাপেক্ষে (এখন animationFrames একদম নিখুঁত ভ্যালু পাবে)
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
      {/* 🎯 মেইন ফিক্স ৩: চাইল্ড কম্পোনেন্টের কাছে প্রগ্রেসের সাথে সাথে তার বরাদ্দকৃত আসল ফ্রেমও পাস করে দেওয়া হলো */}
      {React.cloneElement(children, { progress, animationFrames })}
    </div>
  );
};