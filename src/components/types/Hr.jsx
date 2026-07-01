import React from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { underlineAnimationConfig } from '../../whiteboard.config';
import { parseClassNameToStyle } from '../../utils/styleResolver';

export const Hr = ({ color, progress, style: inlineStyle, className = '' }) => {
  const frame = useCurrentFrame();
  const animationConfig = underlineAnimationConfig;

  const parsedStyle = parseClassNameToStyle(className);
  const style = { ...parsedStyle, ...inlineStyle };

  // বাইরে থেকে সিএসএস-এ পাঠানো লেআউট প্রপ্স রিড করা হচ্ছে (ডিফল্ট ফুল উইডথ ৩০০ পিক্সেল)
  const externalWidth = style?.width === '100%' ? '100%' : (style?.width ? parseFloat(style.width) : 300);
  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;
  const lineHeight = style?.height ? parseFloat(style.height) : 6;

  // ১. স্পিড মাল্টিপ্লায়ার অনুযায়ী আন্ডারলাইনের প্রগ্রেস রিম্যাপ করা
  const adjustedProgress = interpolate(
    progress * animationConfig.speedMultiplier,
    [0, 100],
    [0, 100],
    { extrapolateRight: 'clamp' }
  );

  // টাইমলাইনের শুরুতে সেফটি লক (কিচ্ছু রেন্ডার হবে না)
  if (adjustedProgress === 0) {
    return null;
  }

  // ২. পিক্সেল পজিশন ও হাত ট্র্যাকিং ক্যালকুলেশন
  // লাইনটি বাইরে থেকে আসা টোটাল উইডথ অনুযায়ী সাব-ফ্রেমে মসৃণভাবে বাড়বে
  const currentLineWidth = interpolate(adjustedProgress, [0, 100], [0, externalWidth]);
  const handBaseX = Math.round(currentLineWidth);

  // পেনের নিব একদম লাইনের কালির ডগায় লক করার নিখুঁত অফসেট
  const writeOffsetX = -25;
  const writeOffsetY = -10; // লাইনের থিকনেস কম হওয়ায় পজিশন একটু ওপরে সেট করা হলো
  
  const handX = handBaseX + writeOffsetX + externalLeft;

  // ==========================================================
  // 🌊 আন্ডারলাইনের জন্য ডেডিকেটেড সাইন-ওয়েভ ও রিয়েল র‍্যান্ডমনেস
  // ==========================================================
  const isWritingActive = adjustedProgress > 0 && adjustedProgress < 100;

  const wave1 = Math.sin(frame * animationConfig.waveFrequency);
  const wave2 = Math.cos(frame * (animationConfig.waveFrequency * 0.53));
  
  // আন্ডারলাইনের ক্ষেত্রে হাত সোজা যাবে তবে হালকা রিয়েলিস্টিক হিউম্যান ভাইব্রেশন থাকবে
  const compoundWaveY = isWritingActive 
    ? (wave1 * 0.7 + wave2 * 0.3) * animationConfig.waveAmplitude 
    : 0;

  const humanNoiseX = isWritingActive 
    ? (Math.sin(frame * 1.5) * 1.5) + ((Math.random() - 0.5) * animationConfig.microNoise)
    : 0;

  const humanNoiseY = isWritingActive ? ((Math.random() - 0.5) * animationConfig.microNoise) : 0;

  const handY = writeOffsetY + compoundWaveY + humanNoiseY + externalTop;

  return (
    <>
      {/* 🟢 ১. পিউর আলাদা গ্রিন আন্ডারলাইন এলিমেন্ট (কোনো টেক্সটের সাথে যুক্ত নয়) */}
      <div
        className = {className}
        style={{
          ...style,
          position: 'absolute',
          top: `${externalTop}px`,
          left: `${externalLeft}px`,
          width: `${currentLineWidth}px`, // প্রগ্রেস অনুযায়ী বাম থেকে ডানে বাড়বে
          height: `${lineHeight}px`,
          backgroundColor: color || style?.backgroundColor || style?.color || '#10b981', // ডিফল্ট আপনার সেই গ্রিন কালার
          borderRadius: style?.borderRadius || '4px',
          zIndex: style?.zIndex || 9,
          willChange: 'width',
        }}
      />

      {/* ২. ডেডিকেটেড হাত এলিমেন্ট: লাইন শেষ হওয়া মাত্রই ক্লিয়ার উধাও হয়ে যাবে */}
      {isWritingActive && (
        <Img
          src={staticFile("/images/hand/finaHandImg.png")}
          alt="Hand with pen"
          style={{
            position: 'absolute',
            left: `${handX + humanNoiseX}px`,
            top: `${handY}px`,
            width: '180px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

Hr.animationType = 'underline';
