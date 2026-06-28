import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';

export const HandPen = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // আপনার দেওয়া কোডের অফসেট লজিক অনুযায়ী পজিশন লক করা
  const startX = 50 + (-25); // text1Pos.left + writeOffsetX
  const startY = 40 + 35;    // text1Pos.top + writeOffsetY
  
  // ক্যারেক্টার প্রতি আনুমানিক উইডথ অনুযায়ী শেষ পজিশন
  const totalChars = "Welcome to MCP Tutorial".length;
  const estimatedTextWidth = totalChars * 32; 
  const endX = startX + estimatedTextWidth;

  // ০ থেকে ৯০ ফ্রেম (৩ সেকেন্ড) পর্যন্ত হাতটি বাম থেকে ডানে মুভ করবে
  const currentX = interpolate(frame, [0, 90], [startX, endX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ৯০ ফ্রেম (৩ সেকেন্ড) লেখা শেষ হলে হাতটি অপাসিটি ০ হয়ে হাইড হয়ে যাবে
  const opacity = interpolate(frame, [90, 95], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // লেখার সময় হাতের স্বাভাবিক কাঁপাকাঁপি (Human Wave Effect)
  let humanWaveY = 0;
  let humanWaveX = 0;
  if (frame <= 90) {
    humanWaveY = Math.sin(frame * 0.4) * 5 + (Math.random() - 0.5) * 2;
    humanWaveX = Math.cos(frame * 0.3) * 2;
  }

  return (
    <>
      <Img
        src={staticFile("/finaHandImg.svg")}
        alt="Hand with pen"
        style={{
          position: 'absolute',
          left: `${currentX + humanWaveX}px`,
          top: `${startY + humanWaveY}px`,
          width: '180px',
          zIndex: 999,
          pointerEvents: 'none',
          opacity: opacity,
          display: frame > 95 ? 'none' : 'block',
        }}
      />
    </>
  );
};