import React from 'react';
import { useCurrentFrame, Img, staticFile } from 'remotion';
import { parseClassNameToStyle } from '../../utils/styleResolver';
import { eraserAnimationConfig } from '../../whiteboard.config'; // 👈 কনফিগ ইমপোর্ট করা হলো

const PINK_OVERLAY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" preserveAspectRatio="none"><rect width="1920" height="1080" fill="#fff" /></svg>',
)}`;

export const WhiteboardEraser = ({
  alt = 'Whiteboard Eraser Overlay',
  progress,
  className = '',
  style: inlineStyle,
}) => {
  const frame = useCurrentFrame();

  const parsedStyle = parseClassNameToStyle(className);
  const style = { ...parsedStyle, ...inlineStyle };

  const width = style?.width ? parseFloat(style.width) : 1920;
  const height = style?.height ? parseFloat(style.height) : 1080;
  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;

  if (progress === 0) return null;

  // ১. বেস ডায়াগোনাল পাথ
  const travelProgress = progress / 100;
  const baseHandX = externalLeft + travelProgress * (width - 180);
  const baseHandY = externalTop + travelProgress * (height - 180);

  // ==========================================================
  // 🧼 🎯 কনফিগ থেকে ডাইনামিক ঘষামাজা লজিক
  // ==========================================================
  const isWritingActive = progress > 0 && progress < 100;

  // 🚀 এখন সরাসরি আপনার whiteboard.config.js থেকে ভ্যালু দুটি আসছে
  const scrubFrequency = eraserAnimationConfig.scrubFrequency || 1.6;  
  const scrubAmplitude = eraserAnimationConfig.scrubAmplitude || 220;  

  // সাইন ওয়েভ মোশন
  const scrubOffset = isWritingActive 
    ? Math.sin(frame * scrubFrequency) * scrubAmplitude 
    : 0;

  const handX = baseHandX + scrubOffset;
  const handY = baseHandY - (scrubOffset * 0.5); 

  // মাইক্রো ভাইব্রেশন
  const microNoiseX = isWritingActive ? (Math.random() - 0.5) * 3 : 0;
  const microNoiseY = isWritingActive ? (Math.random() - 0.5) * 3 : 0;

  // Clip-path লজিক
  let clipPathString = 'polygon(0% 0%, 0% 0%, 0% 0%)';
  if (progress > 0) {
    if (progress <= 50) {
      const p = progress * 2;
      clipPathString = `polygon(0% 0%, ${p}% 0%, 0% ${p}%)`;
    } else {
      const p = (progress - 50) * 2;
      clipPathString = `polygon(0% 0%, 100% 0%, 100% ${p}%, ${p}% 100%, 0% 100%)`;
    }
  }

  return (
    <>
      {/* ১. বোর্ড ইরেজার ওভারলে */}
      <div
        className={className}
        style={{
          ...style,
          position: 'absolute',
          top: `${externalTop}px`,
          left: `${externalLeft}px`,
          width: `${width}px`,
          height: `${height}px`,
          overflow: 'hidden',
          clipPath: clipPathString,
          willChange: 'clip-path',
          zIndex: 9998,
        }}
      >
        <Img
          src={PINK_OVERLAY_SVG}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
        />
      </div>

      {/* ২. ঘষতে থাকা হাতের এলিমেন্ট */}
      {isWritingActive && (
        <Img
          src={staticFile('/images/hand/finalHandEraser.png')}
          alt="Rubber hand erasing"
          style={{
            position: 'absolute',
            left: `${handX + microNoiseX}px`,
            top: `${handY + microNoiseY}px`,
            width: '180px',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

WhiteboardEraser.animationType = 'eraser';