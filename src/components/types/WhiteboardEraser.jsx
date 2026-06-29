import React from 'react';
import { useCurrentFrame, Img, staticFile } from 'remotion';
import { parseClassNameToStyle } from '../../utils/styleResolver';

const PINK_OVERLAY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" preserveAspectRatio="none"><rect width="1920" height="1080" fill="#ff8ad8" /></svg>',
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

  // Strict diagonal: top-left -> bottom-right corner
  const travelProgress = progress / 100;
  const handX = externalLeft + travelProgress * (width - 180);
  const handY = externalTop + travelProgress * (height - 180);

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

  const isWritingActive = progress > 0 && progress < 100;
  const microNoiseX = isWritingActive ? (Math.random() - 0.5) * 1.5 : 0;
  const microNoiseY = isWritingActive ? (Math.random() - 0.5) * 1.5 : 0;

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

      {isWritingActive && (
        <Img
          src={staticFile('/finalHandEraser.png')}
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
