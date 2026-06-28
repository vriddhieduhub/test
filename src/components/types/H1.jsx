import React from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { headingAnimationConfig } from '../../whiteboard.config'; 

// ক্যানভাস দিয়ে মেমোরিতে একবারই পারফেক্ট পিক্সেল পজিশন ম্যাপ তৈরি
const calculateAbsolutePositions = (text, fontSize, fontFamily) => {
  const positions = [0]; 
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  
  if (!canvas) return positions;
  
  const context = canvas.getContext('2d');
  if (!context) return positions;
  context.font = `${fontSize}px ${fontFamily}`;

  let currentX = 0;
  for (let i = 0; i < text.length; i++) {
    const charWidth = Math.round(context.measureText(text[i]).width);
    currentX += charWidth;
    positions.push(currentX); 
  }
  return positions;
};

// ফিক্স: 'text' প্রপ্সের জায়গায় রিঅ্যাক্টের 'children' প্রপ্স নেওয়া হলো যাতে নরমাল HTML এর মতো রিড করা যায়
export const H1 = ({ children, color, progress, style }) => {
  const frame = useCurrentFrame();

  // যদি চাইল্ড হিসেবে কিছু না পাঠানো হয়, তবে সেফটি রিটার্ন
  const text = typeof children === 'string' ? children : '';

  // ==========================================================
  // 🎛️ আপনার কাস্টম হোয়াইটবোর্ড কন্ট্রোল প্যানেল (Config)
  // ==========================================================
  const animationConfig = headingAnimationConfig;

  // বাইরে থেকে স্টাইলে ফন্ট সাইজ বা ফন্ট ফ্যামিলি পাঠালে সেটা নেবে, নয়তো ডিফল্ট
  const fontSize = style?.fontSize ? parseFloat(style.fontSize) : 95;
  const fontFamily = style?.fontFamily || "'Kalam', cursive, sans-serif";

  // ১. স্পিড মাল্টিপ্লায়ার অনুযায়ী প্রগ্রেসকে রিম্যাপ করা
  const adjustedProgress = interpolate(
    progress * animationConfig.speedMultiplier, 
    [0, 100], 
    [0, 100], 
    { extrapolateRight: 'clamp' }
  );

  // টাইমলাইনের একদম শুরুতে আস্ত টেক্সট ও হাত গায়েব থাকবে
  if (adjustedProgress === 0) {
    return null;
  }

  const totalChars = text.length;
  const xPositions = calculateAbsolutePositions(text, fontSize, fontFamily);

  // ২. আপনার নিখুঁত বেস অফসেট (পেনের নিব কালির লাইনে লক করার জন্য)
  const writeOffsetX = 25;         
  const writeOffsetY = 45;          

  // 🎯 হাত এবং মাস্কিংয়ের জন্য লিনিয়ার পিক্সেল প্রগ্রেস ক্যালকুলেশন
  const totalTextWidth = xPositions[totalChars] || 0;
  
  const globalCharProgress = (adjustedProgress / 100) * totalChars;
  const currentCharIndex = Math.floor(globalCharProgress);
  const charRemainder = globalCharProgress - currentCharIndex;

  const p1 = xPositions[Math.min(currentCharIndex, totalChars)] || 0;
  const p2 = xPositions[Math.min(currentCharIndex + 1, totalChars)] || 0;
  const currentPixelX = p1 + (p2 - p1) * charRemainder;

  const handBaseX = Math.round(currentPixelX);

  // বাইরে থেকে সিএসএস-এ পাঠানো left এবং top পিক্সেল ভ্যালু এক্সট্র্যাক্ট করা
  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;

  // হাত এখন বাইরে থেকে পাঠানো পজিশনের সাপেক্ষে তার আসল কো-অর্ডিনেট খুঁজে পাবে
  const handX = handBaseX + writeOffsetX + externalLeft;

  // ==========================================================
  // 🎯 AM/FM কম্পাউন্ড সাইন-ওয়েভ ও রিয়েল র‍্যান্ডমনেস ক্যালকুলেশন
  // ==========================================================
  const isWritingActive = adjustedProgress > 0 && adjustedProgress < 100;
  
  const wave1 = Math.sin(frame * animationConfig.waveFrequency);
  const wave2 = Math.sin(frame * (animationConfig.waveFrequency * 0.47));
  const wave3 = Math.cos(frame * (animationConfig.waveFrequency * 1.63));
  
  const compoundWaveY = isWritingActive 
    ? (wave1 * 0.55 + wave2 * 0.35 + wave3 * 0.1) * animationConfig.waveAmplitude
    : 0;
  
  const humanNoiseX = isWritingActive 
    ? (Math.sin(frame * 1.35) * 2) + (Math.cos(frame * 2.67) * 1.5) + ((Math.random() - 0.5) * animationConfig.microNoise)
    : 0;

  const humanNoiseY = isWritingActive 
    ? ((Math.random() - 0.5) * animationConfig.microNoise)
    : 0;

  const handY = writeOffsetY + compoundWaveY + humanNoiseY + externalTop;

  // ಫಿಕ್ಸ್: শেষ অক্ষরের হেলানো কার্ভ যাতে না কাটে, তাই ১০০% রিভিল সেফটি ইনসেট
  const maskRightInset = adjustedProgress >= 100 ? 0 : Math.max(0, totalTextWidth - handBaseX);

  return (
    <>
      {/* ১. টেক্সট এলিমেন্ট: কোনো এক্সট্রা ডিভ ছাড়া পিউর সলিড <h1> এলিমেন্ট */}
      <h1 
        style={{ 
          ...style,
          position: 'absolute',
          top: style?.top || '0px',
          left: style?.left || '0px',
          fontSize: `${fontSize}px`, 
          color: color || style?.color || '#ce1414', 
          margin: style?.margin || 0, 
          fontFamily: fontFamily, 
          whiteSpace: 'pre',
          lineHeight: style?.lineHeight || 1.2,
          zIndex: style?.zIndex || 10,
          clipPath: `inset(0px ${maskRightInset}px 0px 0px)`,
        }}
      >
        {text}
      </h1>

      {/* ২. হাত এলিমেন্ট: হেডিং লেখা শেষ হওয়ামাত্রই একদম ক্লিনভাবে স্ক্রিন থেকে ভ্যানিশ হয়ে যাবে */}
      {isWritingActive && (
        <Img
          src={staticFile("/finaHandImg.svg")}
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

H1.animationType = 'heading';
