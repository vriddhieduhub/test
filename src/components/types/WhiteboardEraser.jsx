import React, { useEffect } from 'react';
import { useCurrentFrame, Img, staticFile } from 'remotion';

export const WhiteboardEraser = ({ progress, onEraseProgress }) => {
  const frame = useCurrentFrame();

  const boardWidth = 1920;
  const boardHeight = 1080;

  useEffect(() => {
    if (onEraseProgress) {
      onEraseProgress(progress);
    }
  }, [progress, onEraseProgress]);

  if (progress === 0) return null;
  if (progress >= 100) return null;

  // 🎯 উপর থেকে নিচে নামার মেইন Y কো-অর্ডিনেট
  const currentY = (progress / 100) * boardHeight;

  // 🌊 আল্ট্রা-রিয়ালিস্টিক সুইং: হাতটি এমাথা থেকে ওমাথা (বাম থেকে ডানে) দ্রুত ঘষবে
  // ফ্রিকোয়েন্সি একটু বাড়ানো হলো যাতে হাতটি স্পিডে ঘষে
  const sweepSpeedAngle = frame * 0.6; 
  const sweepX = (Math.sin(sweepSpeedAngle) * 0.5 + 0.5) * (boardWidth - 250);

  const eraserOffsetX = -40;
  const eraserOffsetY = -60;
  const eraserLeft = sweepX + eraserOffsetX;
  const eraserTop = currentY + eraserOffsetY;

  return (
    <Img
      src={staticFile("/finalHandEraser.png")}
      alt="Hand with eraser"
      style={{
        position: 'absolute',
        left: `${eraserLeft}px`,
        top: `${eraserTop}px`,
        width: '240px', // হাতটি দেখতে একটু স্পষ্ট ও বড় করা হলো
        zIndex: 999,
        pointerEvents: 'none',
      }}
    />
  );
};

WhiteboardEraser.animationType = 'eraser';