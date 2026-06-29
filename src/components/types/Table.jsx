import React, { createContext, useContext, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { useCurrentFrame, Img, staticFile, interpolate } from 'remotion';
import { tableAnimationConfig } from '../../whiteboard.config';
import { parseClassNameToStyle } from '../../utils/styleResolver';

const TableSequenceContext = createContext(null);

const flattenCellNodes = (children) => {
  const result = [];
  const traverse = (node) => {
    if (!node) return;
    if (typeof node === 'string' || typeof node === 'number') {
      const str = String(node);
      for (let char of str) {
        result.push({ type: 'char', value: char });
      }
    } else if (React.isValidElement(node)) {
      if (node.type === 'img' || node.type === Img) {
        result.push({ type: 'image', props: node.props });
      } else {
        React.Children.forEach(node.props.children, traverse);
      }
    }
  };
  React.Children.forEach(children, traverse);
  return result;
};

// ১. মূল টেবিল র্যাপার কম্পোনেন্ট
export const Table = ({ children, progress, className = '', style: inlineStyle }) => {
  const parsedStyle = parseClassNameToStyle(className);
  const style = { ...parsedStyle, ...inlineStyle };
  const tableWidth = style?.width ? parseFloat(style.width) : 1700;

  const cellElements = useMemo(() => {
    const flatCells = [];
    const collectCells = (node) => {
      if (!node) return;
      if (React.isValidElement(node)) {
        if (node.type === 'td' || node.type === 'th' || node.type === Td || node.type === Th) {
          flatCells.push(node);
        } else {
          React.Children.forEach(node.props.children, collectCells);
        }
      } else if (Array.isArray(node)) {
        node.forEach(collectCells);
      }
    };
    collectCells(children);
    return flatCells;
  }, [children]);

  const totalCells = cellElements.length || 1;

  // টেবিল কাঠামো হুট করে পড়া বন্ধ করতে clip-path লজিক (প্রথম ১০% প্রগ্রেসে খালি টেবিল ড্র হবে)
  let clipPathString = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
  if (progress < 10) {
    const p = (progress / 10) * 100;
    if (p <= 50) {
      clipPathString = `polygon(0% 0%, ${p * 2}% 0%, 0% ${p * 2}%)`;
    } else {
      clipPathString = `polygon(0% 0%, 100% 0%, 100% ${(p - 50) * 2}%, ${(p - 50) * 2}% 100%, 0% 100%)`;
    }
  }

  return (
    <TableSequenceContext.Provider value={{ globalProgress: progress, totalCells, tableWidth }}>
      <div
        className={className}
        style={{
          ...style,
          position: 'absolute',
          top: style?.top || '0px',
          left: style?.left || '0px',
          width: `${tableWidth}px`,
          zIndex: style?.zIndex || 10,
          clipPath: clipPathString,
          willChange: 'clip-path',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '3px solid #000', tableLayout: 'fixed' }}>
          {children}
        </table>
      </div>
    </TableSequenceContext.Provider>
  );
};

// ২. কাস্টম Td কম্পোনেন্ট (NO FLEX, অরিজিনাল P.jsx ট্র্যাকিং আর্কিটেকচার)
export const Td = ({ children, cellIndex, className = '', style: cellInlineStyle, ...props }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null); 
  const context = useContext(TableSequenceContext);
  const [charPositions, setCharPositions] = useState([]);

  const parsedClasses = parseClassNameToStyle(className);
  const combinedStyle = { ...parsedClasses, ...cellInlineStyle };

  if (!context) return <td style={combinedStyle} {...props}>{children}</td>;

  const { globalProgress, totalCells, tableWidth } = context;

  // ১০% টেবিল ছক আঁকার পর বাকি ৯০% প্রগ্রেস সমানভাবে সেলগুলোর মধ্যে বন্টন হবে
  const cellStartPercent = 10 + (cellIndex / totalCells) * 90;
  const cellEndPercent = 10 + ((cellIndex + 1) / totalCells) * 90;

  const localProgress = interpolate(
    globalProgress,
    [cellStartPercent, cellEndPercent],
    [0, 100],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isCellStarted = globalProgress >= cellStartPercent;
  const isCellWriting = globalProgress > cellStartPercent && globalProgress < cellEndPercent;

  const flatNodes = useMemo(() => flattenCellNodes(children), [children]);
  const totalSteps = flatNodes.length || 1;

  const globalCharProgress = (localProgress / 100) * totalSteps;
  const currentCharIndex = Math.min(Math.floor(globalCharProgress), totalSteps - 1);
  const charRemainder = globalCharProgress - currentCharIndex;
  const charsToShow = Math.floor(globalCharProgress);

  // 🎯 আপনার ইঞ্জিনের মেইন ক্লাস '.live-char' ধরে পিউর DOM অফসেট ট্র্যাকিং
  useLayoutEffect(() => {
    if (!containerRef.current || !isCellStarted) return;
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
    
    // কেবল পজিশন কাউন্ট চেঞ্জ হলেই স্টেট আপডেট হবে, যা ডেডলক লুপ চিরতরে বন্ধ করবে
    if (positions.length > 0 && positions.length !== charPositions.length) {
      setCharPositions(positions);
    }
  }, [flatNodes, totalSteps, frame, charsToShow, isCellStarted, charPositions.length]); 

  // আপনার ইঞ্জিনের কোর রাইটিং পজিশন গাইডলাইন
  let handBaseX = 0;
  let handBaseY = 0;

  if (charPositions.length > 0) {
    const activeIdx = Math.min(currentCharIndex, charPositions.length - 1);
    const c1 = charPositions[activeIdx];
    const c2 = charPositions[Math.min(activeIdx + 1, charPositions.length - 1)];

    if (c2 && c1 && c2.y > c1.y) {
      handBaseX = charRemainder < 0.1 ? c1.x : c2.x - c2.width;
      handBaseY = charRemainder < 0.1 ? c1.y : c2.y;
    } else if (c1) {
      handBaseX = c1.x + ((c2 ? c2.x : c1.x) - c1.x) * charRemainder;
      handBaseY = c1.y;
    }
  } else {
    // 🎯 সেফটি ব্যাকআপ লক: ডম পজিশন লোড হতে দেরি হলেও হাত যাতে লিনিয়ারলি এগিয়ে লেখা শুরু করে দেয়
    const colIndex = cellIndex % 3;
    const fixedWidthPercent = colIndex === 0 ? 25 : 37.5;
    const fixedWidthPx = (fixedWidthPercent / 100) * tableWidth;
    handBaseX = (localProgress / 100) * (fixedWidthPx - 60);
    handBaseY = localProgress > 60 ? 95 : 35; 
  }

  // পেনের নিবের পারফেক্ট ইউনিভার্সাল অফসেট
  const writeOffsetX = -45;
  const writeOffsetY = 24;

  const handX = handBaseX + writeOffsetX;
  const handY = handBaseY + writeOffsetY;

  const colIndex = cellIndex % 3;
  const fixedWidthPercent = colIndex === 0 ? 25 : 37.5;

  return (
    <td 
      style={{ 
        position: 'relative', 
        padding: '30px 20px', 
        width: `${fixedWidthPercent}%`,
        height: '180px', 
        minHeight: '180px',
        verticalAlign: 'top', 
        overflow: 'hidden',
        fontSize: '45px', 
        lineHeight: '1.4',
        visibility: isCellStarted ? 'visible' : 'hidden', // 🚀 কন্টেন্ট ডেডলক এড়াতে নেটিভ CSS কন্ট্রোল
        ...combinedStyle
      }} 
      {...props}
    >
      {/* 🚀 কোনো FLEX নেই। পিউর ব্লক ফ্লো যা টেক্সটকে ২ লাইনে সুন্দরভাবে র‍্যাপ করবে */}
      <div 
        ref={containerRef} 
        style={{ 
          display: 'block', 
          width: '100%',
          wordBreak: 'keep-all',   
          wordWrap: 'break-word',  
        }}
      >
        {flatNodes.map((node, idx) => {
          const isVisible = idx < charsToShow;

          if (node.type === 'image') {
            const imagePath = node.props.src.startsWith('/') ? node.props.src : `/${node.props.src}`;
            const userWidth = node.props.width || '60px';
            return (
              <span 
                key={`img-${idx}`} 
                className="live-char"
                style={{ display: 'inline-block', width: userWidth, height: 'auto', marginRight: '12px', verticalAlign: 'middle', opacity: isVisible ? 1 : 0 }}
              >
                <Img src={staticFile(imagePath)} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} alt="" />
              </span>
            );
          }

          return (
            <span 
              key={`char-${idx}`} 
              className="live-char"
              style={{ 
                display: 'inline', 
                whiteSpace: 'pre-wrap', 
                fontFamily: "'Kalam', cursive", 
                opacity: isVisible ? 1 : 0 
              }}
            >
              {node.value}
            </span>
          );
        })}
      </div>

      {/* ✒️ পিউর সিঙ্কড রাইটিং হ্যান্ড */}
      {isCellWriting && (
        <Img
          src={staticFile("/finaHandImg.png")}
          alt="Hand writing cell"
          style={{
            position: 'absolute',
            left: `${handX}px`,
            top: `${handY}px`,
            width: '180px', 
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </td>
  );
};

// ৩. কাস্টম Th (Table Header Cell) কম্পোনেন্ট
export const Th = ({ children, cellIndex, className = '', style: cellInlineStyle, ...props }) => {
  const colIndex = cellIndex % 3;
  const fixedWidthPercent = colIndex === 0 ? 25 : 37.5;
  
  const parsedClasses = parseClassNameToStyle(className);
  const combinedStyle = { ...parsedClasses, ...cellInlineStyle };

  return (
    <th 
      style={{ 
        backgroundColor: '#f3f4f6', 
        fontWeight: 'bold', 
        borderBottom: '3px solid #000',
        padding: '25px 20px',
        width: `${fixedWidthPercent}%`,
        height: '110px',
        minHeight: '110px',
        textAlign: 'left',
        verticalAlign: 'middle',
        fontSize: '45px',
        ...combinedStyle 
      }} 
      {...props}
    >
      {children}
    </th>
  );
};

// ৪. কাস্টম Tr (Table Row) কম্পোনেন্ট
export const Tr = ({ children, className = '', style, ...props }) => {
  const parsedClasses = parseClassNameToStyle(className);
  const combinedStyle = { ...parsedClasses, ...style };

  return (
    <tr style={{ borderBottom: '2px solid #000', height: '180px', ...combinedStyle }} {...props}>
      {children}
    </tr>
  );
};

Table.animationType = 'table';
Table.getTargetElement = (props) => props.children;