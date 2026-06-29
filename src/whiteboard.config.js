import React from 'react';
import { parseClassNameToStyle } from './utils/styleResolver';

export const headingAnimationConfig = {
 speedMultiplier: 1.0,   // 🚀 হেডিং লেখার স্পিড মাল্টিপ্লায়ার
  waveAmplitude: 16,      // 🌊 হেডিং লেখার সময় হাতের উপর-নিচ ঢেউয়ের সাইজ (পিক্সেলে)
  waveFrequency: 0.8,     // ⚡ হেডিং এর জন্য হাত নাচার ফ্রিকোয়েন্সি 
  microNoise: 1.5,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

export const underlineAnimationConfig = {
  speedMultiplier: 0.6,   // 🚀 আন্ডারলাইন ড্র বা রিভিল হওয়ার মেইন স্পিড চাবি
  waveAmplitude: 8,       // 🌊 লাইন টানার সময় হাত কতটা উপর-নিচ কাঁপবে (হেডিংয়ের চেয়ে একটু কম হবে)
  waveFrequency: 1.2,     // ⚡ লাইনের সময় হাত কত ঘনঘন কাঁপবে
  microNoise: 1.2,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

export const paragraphAnimationConfig = {
  speedMultiplier: 1.0,
 framesPerCharacter: 1.5, // প্রতি character লিখতে গড়ে ১.৫ frame
  waveAmplitude: 6,       // 🌊 ছোট ফন্টের জন্য হাতের ঢেউয়ের সাইজ ছোট (পিক্সেলে)
  waveFrequency: 1.0,     // ⚡ ফাস্ট রাইটিংয়ের জন্য হালকা ফ্রিকোয়েন্সি 
  microNoise: 1.0,        // ✒️ পেনের ডগার রিয়েলিস্টিক ভাইব্রেশন
};

export const imageAnimationConfig = {
  speedMultiplier: 1.0,   // 🚀 হেডিং লেখার স্পিড মাল্টিপ্লায়ার
  waveAmplitude: 16,      // 🌊 হেডিং লেখার সময় হাতের উপর-নিচ ঢেউয়ের সাইজ (পিক্সেলে)
  waveFrequency: 0.8,     // ⚡ হেডিং এর জন্য হাত নাচার ফ্রিকোয়েন্সি 
  microNoise: 1.5,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

export const eraserAnimationConfig = {
  durationInFrames: 50,     // white erase overlay animation duration[cite: 1]
  speedMultiplier: 1.0,     // শুধু erase animation speed control[cite: 1]
  handSweepSpeed: 1.0,      // rubber hand left-right movement speed[cite: 1]
  handAmplitudeRatio: 0.5,  // 0-1 এর মধ্যে: board width জুড়ে hand swing range[cite: 1]
  scrubFrequency: 1.6,      // ⚡ কনফিগ থেকে: হাত কত দ্রুত এদিক-ওদিক ঘষবে
  scrubAmplitude: 220,      // ↔️ কনফিগ থেকে: হাত কত বড় এরিয়া নিয়ে ঘষবে
};

const textLength = (node) => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).length;
  }
  if (!React.isValidElement(node)) {
    return 0;
  }
  return React.Children.toArray(node.props.children).reduce(
    (total, child) => total + textLength(child),
    0,
  );
};

export const getAnimationFrames = (element, fps) => {
  const props = element?.props || {};
  const parsedStyle = parseClassNameToStyle(props.className || '');
  const style = { ...parsedStyle, ...props.style };

  // 🎯 ফিক্স: RevealElement এর ভেতরকার কম্পোনেন্ট খুঁজে বের করা
  let targetElement = element;
  if (element?.type?.name === 'RevealElement' || props.children?.type?.animationType) {
    targetElement = props.children;
  }

  const animationType = targetElement?.type?.animationType;

  let baseFrames;
  let speedMultiplier = 1;

  switch (animationType) {
    case 'heading':
      baseFrames = Math.max(Math.round(fps * 0.6), textLength(targetElement) * 4);
      speedMultiplier = headingAnimationConfig.speedMultiplier;
      break;

    case 'underline': {
      const width = Number.parseFloat(style?.width) || 300;
      baseFrames = Math.max(Math.round(fps * 0.4), Math.ceil(width / 35));
      speedMultiplier = underlineAnimationConfig.speedMultiplier;
      break;
    }

    case 'paragraph':
      baseFrames = Math.max(
        fps,
        Math.ceil(textLength(targetElement) * paragraphAnimationConfig.framesPerCharacter),
      );
      speedMultiplier = paragraphAnimationConfig.speedMultiplier;
      break;

    case 'image': 
      baseFrames = Math.round(fps * 3.0);
      speedMultiplier = imageAnimationConfig.speedMultiplier;
      break;

    case 'eraser':
      baseFrames = Math.round(fps * 3.0);
      speedMultiplier = eraserAnimationConfig.speedMultiplier;
      break;

    default:
      baseFrames = fps;
  }

  return {
    animationFrames: Math.max(1, Math.ceil(baseFrames / speedMultiplier)),
    progressEnd: 100 / speedMultiplier,
  };
};

export const getSequenceDurationInFrames = (children, fps) => {
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const sequenceIds = [...new Set(elements.map((element) => element.props.sequenceId))].sort((a, b) => a - b);

  return sequenceIds.reduce((totalFrames, sequenceId) => {
    const sequenceFrames = elements
      .filter((element) => element.props.sequenceId === sequenceId)
      .map((element) => getAnimationFrames(element, fps).animationFrames);

    return totalFrames + Math.max(...sequenceFrames);
  }, 0);
};
