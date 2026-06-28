import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';

export const RevealElement = ({ sequenceId, duration, x, y, children }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // সিকোয়েন্স অনুযায়ী স্টার্ট টাইম ক্যালকুলেশন
  let startSecond = 0;
  if (sequenceId === 1) startSecond = 0;      
  if (sequenceId === 2) startSecond = 3;      
  if (sequenceId === 3) startSecond = 7;      
  if (sequenceId === 4) startSecond = 12;     

  const startFrame = startSecond * fps;
  const endFrame = startFrame + (duration * fps);

  if (frame < startFrame) return null;

  const isRunning = frame >= startFrame && frame <= endFrame;
  
  // ০ থেকে ১০০% অ্যানিমেশন প্রগ্রেস ট্র্যাকিং
  const progress = interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', top: y, left: x }}>
      {/* চাইল্ড কম্পোনেন্টের ভেতর প্রগ্রেস পাস করা */}
      {React.cloneElement(children, { progress })}

    </div>
  );
};