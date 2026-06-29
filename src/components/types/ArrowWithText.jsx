import React, { useRef, useState, useLayoutEffect } from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { parseClassNameToStyle } from '../../utils/styleResolver';

export const ArrowWithText = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  text, 
  textPosition = 'top', // 'top' অথবা 'bottom'
  progress, 
  className = '', 
  color = '#000000', 
  thickness = 4,
  style: inlineStyle
}) => {
  const frame = useCurrentFrame();
  const pathRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);

  const parsedStyle = parseClassNameToStyle(className);

  useLayoutEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  const pathData = `M ${startX} ${startY} L ${endX} ${endY}`;

  // ⏱️ প্রগ্রেস বন্টন: প্রথম ৫০% সময়ে তীর আঁকা হবে, পরের ৫০% সময়ে টেক্সট লেখা হবে
  const arrowProgress = interpolate(progress, [0, 50], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textProgress = interpolate(progress, [50, 100], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // তীরের কালি রিভিল লজিক
  const strokeDashoffset = totalLength - (arrowProgress / 100) * totalLength;

  // তীরের এঙ্গেল ক্যালকুলেশন (Arrow Head এর জন্য)
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  // টেক্সট ক্যারেক্টার হ্যান্ডলিং
  const chars = text.split("");
  const charsToShow = Math.floor((textProgress / 100) * chars.length);

  // ✒️ পেনের নিব ট্র্যাকিং (হাত কোথায় থাকবে)
  let handX = startX;
  let handY = startY;
  const isWritingActive = progress > 0 && progress < 100;

  if (progress <= 50) {
    // তীর আঁকার সময় পেনের পজিশন
    if (pathRef.current && totalLength > 0) {
      const currentPoint = (arrowProgress / 100) * totalLength;
      const point = pathRef.current.getPointAtLength(currentPoint);
      handX = point.x;
      handY = point.y;
    }
  } else {
    // টেক্সট লেখার সময় পেনের পজিশন (লিনিয়ার ব্যাকআপ মুভমেন্ট)
    const textWidthEstimate = chars.length * 16; 
    const textStartX = startX + (endX - startX) / 2 - textWidthEstimate / 2;
    handX = textStartX + (textProgress / 100) * textWidthEstimate;
    handY = textPosition === 'top' ? startY - 40 : startY + 40;
  }

  // টেক্সটের পজিশন ঠিক করা (তীরের ওপরে না নিচে)
  const textTopPos = textPosition === 'top' ? startY - 70 : startY + 20;
  const textLeftPos = startX + (endX - startX) / 2;

  return (
    <>
      {/* 🏹 SVG Arrow Part */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '1920px', height: '1080px', pointerEvents: 'none', zIndex: 8 }}>
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        {arrowProgress === 100 && (
          <polygon
            points={`${endX},${endY} ${endX - 15},${endY - 7} ${endX - 15},${endY + 7}`}
            fill={color}
            transform={`rotate(${angle}, ${endX}, ${endY})`}
          />
        )}
      </svg>

      {/* 📝 Text Part (Kalam হরফে রিয়েল হ্যান্ডরাইটিং লুক) */}
      {progress > 50 && (
        <div
            className={className} // 👈 যাতে বাইরে থেকে পাঠানো text-3xl বা text-2xl ক্লাস কাজ করে
            style={{
                ...parsedStyle, // 👈 master.css এর ফন্ট সাইজ স্টাইল ইমপোর্ট করার জন্য
                ...inlineStyle,
                position: 'absolute',
                top: `${textTopPos}px`,
                left: `${textLeftPos}px`,
                transform: 'translateX(-50%)',
                color: color || parsedStyle?.color || '#000000',
                whiteSpace: 'nowrap',
                zIndex: 9,
                textAlign: 'center'
            }}
            >
          {chars.map((char, idx) => (
            <span key={idx} style={{ opacity: idx < charsToShow ? 1 : 0 }}>
              {char}
            </span>
          ))}
        </div>
      )}

      {/* ✒️ অ্যানিমেশন রাইটিং হ্যান্ড */}
      {isWritingActive && (
        <Img
          src={staticFile("/finaHandImg.png")}
          alt="Hand drawing arrow with text"
          style={{
            position: 'absolute',
            left: `${handX - 25}px`,
            top: `${handY - 15}px`,
            width: '180px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

ArrowWithText.animationType = 'paragraph'; // existing duration architecture এ খাপ খাওয়ানোর জন্য