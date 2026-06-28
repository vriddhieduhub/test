import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { paragraphAnimationConfig } from '../../whiteboard.config';

// চাইল্ড নোড বা নেস্টেড স্প্যানগুলোকে ভেঙে তাদের নিজস্ব className ও style অক্ষুণ্ণ রেখে ফ্ল্যাট ক্যারেক্টার ম্যাপ তৈরি করার পিউর পার্সার
const flattenNodes = (children) => {
  const result = [];
  const traverse = (node, inheritedProps = { style: {}, className: '' }) => {
    if (typeof node === 'string' || typeof node === 'number') {
      const str = String(node);
      for (let char of str) {
        result.push({ 
          char, 
          style: inheritedProps.style, 
          className: inheritedProps.className,
          type: inheritedProps.type 
        });
      }
    } else if (React.isValidElement(node)) {
      const nodeProps = node.props || {};
      
      // প্যারেন্ট এবং চাইল্ডের স্টাইল ও ক্লাসনেম একদম ক্লিনলি মার্জ করা হচ্ছে
      let combinedStyle = { ...inheritedProps.style, ...nodeProps.style };
      let combinedClassName = [inheritedProps.className, nodeProps.className].filter(Boolean).join(' ');

      React.Children.forEach(nodeProps.children, (child) => 
        traverse(child, { style: combinedStyle, className: combinedClassName, type: node.type })
      );
    }
  };
  React.Children.forEach(children, (child) => traverse(child));
  return result;
};

export const P = ({ children, progress, style, color }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const [charPositions, setCharPositions] = useState([]);

  const animationConfig = paragraphAnimationConfig;
  const fontSize = style?.fontSize ? parseFloat(style.fontSize) : 48;
  const fontFamily = style?.fontFamily || "'Kalam', cursive, sans-serif";

  // ১. ইনলাইন চাইল্ড স্ট্রাকচারকে ভেঙে ক্যারেক্টার অ্যারে তৈরি করা
  const flatChars = useMemo(() => flattenNodes(children), [children]);
  const totalChars = flatChars.length;

  // ২. রি-রেন্ডার হওয়ার পর ব্রাউজারের ডম (DOM) লেআউট থেকে অক্ষরের নিখুঁত X-Y পজিশন ম্যাপ বের করা
  useEffect(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.querySelectorAll('.live-char');
    const positions = [];
    
    spans.forEach((span) => {
      positions.push({
        x: span.offsetLeft + span.offsetWidth, 
        y: span.offsetTop,                     
        width: span.offsetWidth,
        height: span.offsetHeight
      });
    });
    setCharPositions(positions);
  }, [flatChars, totalChars]);

  // ৩. স্পিড মাল্টিপ্লায়ার প্রগ্রেস রিম্যাপ
  const adjustedProgress = interpolate(
    progress * animationConfig.speedMultiplier,
    [0, 100],
    [0, 100],
    { extrapolateRight: 'clamp' }
  );

  if (adjustedProgress === 0) return null;

  // ৪. রিয়েল-টাইম ক্যারেক্টার পজিশন ট্র্যাকিং
  const globalCharProgress = (adjustedProgress / 100) * totalChars;
  const currentCharIndex = Math.min(Math.floor(globalCharProgress), totalChars - 1);
  const charRemainder = globalCharProgress - currentCharIndex;
  const charsToShow = Math.floor(globalCharProgress);

  let handBaseX = 0;
  let handBaseY = 0;

  if (charPositions.length === totalChars && totalChars > 0) {
    const c1 = charPositions[currentCharIndex];
    const c2 = charPositions[Math.min(currentCharIndex + 1, totalChars - 1)];

    // যদি c2 এলিমেন্টটি নিচের লাইনে র‍্যাপ হয়, তবে হাত এক ঝটকায় ২য় লাইনের শুরুতে নেমে আসবে
    if (c2.y > c1.y) {
      handBaseX = charRemainder < 0.2 ? c1.x : c2.x - c2.width;
      handBaseY = charRemainder < 0.2 ? c1.y : c2.y;
    } else {
      handBaseX = c1.x + (c2.x - c1.x) * charRemainder;
      handBaseY = c1.y + (c2.y - c1.y) * charRemainder;
    }
  }

  // পেনের নিবের রাইটিং অফসেট
  const writeOffsetX = -18;
  const writeOffsetY = fontSize * 0.75; 

  // বাইরে থেকে আসা সিএসএস পজিশন প্লাগ-ইন
  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;

  const handX = handBaseX + writeOffsetX + externalLeft;

  // ==========================================================
  // 🌊 প্যারাগ্রাফের জন্য লাইট-অ্যামপ্লিচিউড সাইন-ওয়েভ ও র্যান্ডমনেস
  // ==========================================================
  const isWritingActive = adjustedProgress > 0 && adjustedProgress < 100;

  const wave1 = Math.sin(frame * animationConfig.waveFrequency);
  const wave2 = Math.cos(frame * (animationConfig.waveFrequency * 0.55));
  
  const compoundWaveY = isWritingActive 
    ? (wave1 * 0.6 + wave2 * 0.4) * animationConfig.waveAmplitude 
    : 0;

  const humanNoiseX = isWritingActive ? ((Math.random() - 0.5) * animationConfig.microNoise) : 0;
  const humanNoiseY = isWritingActive ? ((Math.random() - 0.5) * animationConfig.microNoise) : 0;

  const handY = handBaseY + writeOffsetY + compoundWaveY + humanNoiseY + externalTop;

  return (
    <>
      {/* ১. প্যারাগ্রাফ রেন্ডারার নোড বক্স (পিউর পি ট্যাগ লেআউট) */}
      <p
        ref={containerRef}
        style={{
          ...style,
          position: 'absolute',
          top: style?.top || '0px',
          left: style?.left || '0px',
          fontSize: `${fontSize}px`,
          color: color || style?.color || '#000000',
          fontFamily: fontFamily,
          margin: style?.margin || 0,
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word',
          lineHeight: style?.lineHeight || 1.6,
          width: style?.width || '1200px', 
        }}
      >
        {flatChars.map((item, idx) => {
          const isVisible = idx < charsToShow;
          
          // স্ট্রং, ইটালিক বা আন্ডারলাইন ট্যাগের জেনুইন রিঅ্যাক্ট রি-বিল্ডার ব্যাকআপ
          let Tag = 'span';
          if (item.type === 'strong' || item.type === 'b') Tag = 'strong';
          if (item.type === 'i' || item.type === 'em') Tag = 'i';
          if (item.type === 'u') Tag = 'u';

          return (
            <Tag
              key={idx}
              className={`live-char ${item.className}`}
              style={{
                ...item.style,
                display: 'inline-block',
                whiteSpace: 'pre',
                visibility: isVisible ? 'visible' : 'hidden',
              }}
            >
              {item.char}
            </Tag>
          );
        })}
      </p>

      {/* ২. হাত এলিমেন্ট */}
      {isWritingActive && charPositions.length === totalChars && (
        <Img
          src={staticFile("/finaHandImg.svg")}
          alt="Hand with pen"
          style={{
            position: 'absolute',
            left: `${handX + humanNoiseX}px`,
            top: `${handY}px`,
            width: '140px', 
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};