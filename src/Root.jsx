import React from 'react';
import { Composition } from 'remotion';
import { MainVideoEngine } from './MainVideoEngine';

export const RemotionRoot = () => {
  return (
    <Composition
      id="WhiteboardEngine"
      component={MainVideoEngine}
      durationInFrames={360} // ১২ সেকেন্ডের ভিডিও = ৩৬০ ফ্রেম
      fps={30}
      width={1920}
      height={1080}
    />
  );
};