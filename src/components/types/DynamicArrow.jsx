// src/components/types/DynamicArrow.jsx
import React, { useRef, useState, useLayoutEffect } from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';

export const DynamicArrow = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  controlX, // যদি বাঁকা (Curved) তীর বানাতে চাও, তবে এটি লাগবে (ঐচ্ছিক)
  controlY, 
  progress, 
  color = '#1d4ed8', 
  thickness = 4 
}) => {
  const frame = useCurrentFrame();
  const pathRef = useRef(null);
  const [totalLength, setTotalLength] = useState(0);

  // SVG Path এর টোটাল পিক্সেল লেন্থ বের করার জন্য
  useLayoutEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  // যদি control point থাকে তবে কার্ভ (Bezier) লাইন হবে, নাহলে সোজা কোণাকুণি লাইন
  const pathData = controlX && controlY 
    ? `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`
    : `M ${startX} ${startY} L ${endX} ${endY}`;

  // প্রগ্রেস অনুযায়ী লাইনের কালি কতটা রিভিল হবে
  const strokeDashoffset = totalLength - (progress / 100) * totalLength;

  // রিয়েল-টাইম পেনের নিবের পজিশন ক্যালকুলেট করা (হাতের জন্য)
  let handX = startX;
  let handY = startY;

  if (pathRef.current && totalLength > 0) {
    const currentPointIndex = (progress / 100) * totalLength;
    const point = pathRef.current.getPointAtLength(currentPointIndex);
    handX = point.x;
    handY = point.y;
  }

  // পেনের নিবের ইউনিভার্সাল অফসেট
  const writeOffsetX = -25;
  const writeOffsetY = -10;

  const isWritingActive = progress > 0 && progress < 100;

  // তীরের মাথার (Arrow Head) কোণ বা অ্যাঙ্গেল ক্যালকুলেট করা (যাতে তীরটি যেদিকে যাচ্ছে সেদিকেই ঘুরে থাকে)
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  return (
    <>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '1920px', height: '1080px', pointerEvents: 'none', zIndex: 8 }}>
        {/* মূল অ্যানিমেটেড রেখা */}
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

        {/* তীরের মাথা (অ্যানিমেশন ১০০% শেষ হলে নিখুঁত অ্যাঙ্গেলে ভেসে উঠবে) */}
        {progress === 100 && (
          <polygon
            points={`${endX},${endY} ${endX - 15},${endY - 8} ${endX - 15},${endY + 8}`}
            fill={color}
            transform={`rotate(${angle}, ${endX}, ${endY})`}
          />
        )}
      </svg>

      {/* হাত দিয়ে ড্র করার অ্যানিমেশন */}
      {isWritingActive && (
        <Img
          src={staticFile("/images/hand/finaHandImg.png")}
          alt="Hand drawing dynamic arrow"
          style={{
            position: 'absolute',
            left: `${handX + writeOffsetX}px`,
            top: `${handY + writeOffsetY}px`,
            width: '180px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

DynamicArrow.animationType = 'underline'; // তোমার ইঞ্জিনের কনফিগ চাবি