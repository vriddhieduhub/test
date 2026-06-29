import React from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { parseClassNameToStyle } from '../../utils/styleResolver';

export const Image = ({ src, alt = "Whiteboard Image", progress, className = '', style: inlineStyle }) => {
  const frame = useCurrentFrame();

  const parsedStyle = parseClassNameToStyle(className);
  const style = { ...parsedStyle, ...inlineStyle };

  const width = style?.width ? parseFloat(style.width) : 380;
  const height = style?.height ? parseFloat(style.height) : 380;
  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;

  if (progress === 0) return null;

  // কোণাকুণি বেস পাথ ক্যালকুলেশন
  const basePathX = (progress / 100) * width;
  const basePathY = (progress / 100) * height;

  const swingAngle = frame * 0.45;
  const swing = Math.sin(swingAngle) * 45; 

  const writeOffsetX = -25; 
  const writeOffsetY = 15;

  const handX = basePathX + swing + writeOffsetX + externalLeft;
  const handY = basePathY - swing + writeOffsetY + externalTop;

  // clip-path logic
  let clipPathString = `polygon(0% 0%, 0% 0%, 0% 0%)`;
  if (progress > 0) {
    if (progress <= 50) {
      const p = progress * 2;
      clipPathString = `polygon(0% 0%, ${p}% 0%, 0% ${p}%)`;
    } else {
      const p = (progress - 50) * 2;
      clipPathString = `polygon(0% 0%, 100% 0%, 100% ${p}%, ${p}% 100%, 0% 100%)`;
    }
  }

  const isWritingActive = progress > 0 && progress < 100;
  const microNoiseX = isWritingActive ? (Math.random() - 0.5) * 1.5 : 0;
  const microNoiseY = isWritingActive ? (Math.random() - 0.5) * 1.5 : 0;

  // 🎯 সেফটি ফিক্স: যদি src-এর শুরুতে '/' না থাকে, তবে সেটা অটোমেটিক যোগ করে নেওয়া হচ্ছে
  const imagePath = src.startsWith('/') ? src : `/${src}`;

  return (
    <>
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
        }}
      >
        {/* 🚀 এখানে staticFile() ব্যবহার করা হলো যাতে রেমোশন পাথ মিস না করে */}
        <Img 
          src={staticFile(imagePath)} 
          alt={alt} 
          style={{ width: '100%', height: '100%', objectFit: style?.objectFit || 'contain' }} 
        />
      </div>

      {isWritingActive && (
        <Img
          src={staticFile("/finalHandImgArt.png")}
          alt="Hand drawing image"
          style={{
            position: 'absolute',
            left: `${handX + microNoiseX}px`,
            top: `${handY + microNoiseY}px`,
            width: '180px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

Image.animationType = 'image';