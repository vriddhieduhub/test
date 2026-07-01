import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { headingAnimationConfig } from '../../whiteboard.config'; 
import { parseClassNameToStyle } from '../../utils/styleResolver';
import { resolveFontStyles } from '../../fonts';

// ক্যারেক্টার ম্যাপ তৈরি করার পার্সার
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

export const H1 = ({ children, className = '', color, progress, style: inlineStyle }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const [charPositions, setCharPositions] = useState([]);

  const parsedStyle = useMemo(() => parseClassNameToStyle(className), [className]);
  const style = useMemo(() => ({ ...parsedStyle, ...inlineStyle }), [parsedStyle, inlineStyle]);
  const animationConfig = headingAnimationConfig;

  const fontSize = style?.fontSize ? parseFloat(style.fontSize) : 95;
  const {fontFamily, fontStyle, fontWeight} = resolveFontStyles({style, className});

  const flatChars = useMemo(() => flattenNodes(children), [children]);
  const totalChars = flatChars.length;

  // DOM পজিশন ট্র্যাকিং - useLayoutEffect ব্যবহার করা হলো যাতে রেন্ডারিং এর আগেই ক্যালকুলেশন হয়
  useLayoutEffect(() => {
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
    
    if (positions.length > 0) {
      setCharPositions(positions);
    }
  }, [flatChars, totalChars, frame]); // frame dependency ensures it updates during animation

  // প্রগ্রেস হ্যান্ডলিং
  const adjustedProgress = interpolate(
    progress,
    [0, 100],
    [0, 100],
    { extrapolateRight: 'clamp' }
  );

  const globalCharProgress = (adjustedProgress / 100) * totalChars;
  const currentCharIndex = Math.min(Math.floor(globalCharProgress), totalChars - 1);
  const charRemainder = globalCharProgress - currentCharIndex;
  const charsToShow = Math.floor(globalCharProgress);

  let handBaseX = 0;
  let handBaseY = 0;

  if (charPositions.length === totalChars && totalChars > 0) {
    const c1 = charPositions[currentCharIndex];
    const c2 = charPositions[Math.min(currentCharIndex + 1, totalChars - 1)];

    if (c2 && c1 && c2.y > c1.y) {
      handBaseX = charRemainder < 0.1 ? c1.x : c2.x - c2.width;
      handBaseY = charRemainder < 0.1 ? c1.y : c2.y;
    } else if (c1) {
      handBaseX = c1.x + ((c2 ? c2.x : c1.x) - c1.x) * charRemainder;
      handBaseY = c1.y;
    }
  }

  const writeOffsetX = -55;
  const writeOffsetY = fontSize * 0.5; 

  const externalLeft = style?.left ? parseFloat(style.left) : 0;
  const externalTop = style?.top ? parseFloat(style.top) : 0;

  const handX = handBaseX + writeOffsetX + externalLeft;
  const isWritingActive = adjustedProgress > 0 && adjustedProgress < 100;

  const wave1 = Math.sin(frame * animationConfig.waveFrequency);
  const wave2 = Math.cos(frame * (animationConfig.waveFrequency * 0.55));
  const compoundWaveY = isWritingActive 
    ? (wave1 * 0.6 + wave2 * 0.4) * animationConfig.waveAmplitude 
    : 0;

  const humanNoiseX = isWritingActive ? ((Math.random() - 0.5) * animationConfig.microNoise) : 0;
  const humanNoiseY = isWritingActive ? ((Math.random() - 0.5) * animationConfig.microNoise) : 0;

  const handY = handBaseY + writeOffsetY + compoundWaveY + humanNoiseY + externalTop;

  if (adjustedProgress <= 0) return null;

  return (
    <>
      <h1 
        ref={containerRef}
        className={className}
        style={{ 
          ...style,
          position: 'absolute',
          top: style?.top || '0px',
          left: style?.left || '0px',
          fontSize: `${fontSize}px`, 
          color: color || style?.color || '#ce1414', 
          margin: style?.margin || 0, 
          fontFamily: fontFamily, 
          fontStyle,
          fontWeight,
          whiteSpace: 'pre',
          lineHeight: style?.lineHeight || 1.2,
          zIndex: style?.zIndex || 10,
          width: style?.width === '100%' ? 'auto' : style?.width,
        }}
      >
        {flatChars.map((item, idx) => {
          const isVisible = idx < charsToShow;
          return (
            <span
              key={idx}
              className="live-char"
              style={{
                ...item.style,
                display: 'inline',
                opacity: isVisible ? 1 : 0, 
              }}
            >
              {item.char}
            </span>
          );
        })}
      </h1>

      {isWritingActive && charPositions.length === totalChars && (
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

H1.animationType = 'heading';
