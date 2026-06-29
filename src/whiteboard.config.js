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


// 📊 টেবিল অ্যানিমেশনের জন্য সম্পূর্ণ আলাদা ও ডেডিকেটেড কনফিগ
export const tableAnimationConfig = {
  speedMultiplier: 1.0,        // 🚀 টেবিল লেখার মেইন স্পিড চাবি
  framesPerCharacter: 1.2,     // প্রতি ক্যারেক্টার লিখতে ফ্রেম বরাদ্দ (টেবিলে একটু ফাস্ট লেখার জন্য ১.২ দেওয়া হলো)
  imageVirtualCharacters: 25,  // টেবিলে প্রতিটা ইমেজ বা আইকন ড্র করার জন্য ২৫ ক্যারেক্টারের সমপরিমাণ বাফার টাইম
};



// টেবিল বা অন্য যেকোনো ডিপ নেস্টেড এলিমেন্টের ক্যারেক্টার কাউন্ট করার নিখুঁত রিকার্সিভ ফাংশন
const textLength = (node) => {
  if (!node) return 0;
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).length;
  }
  
  if (node.props && node.props.children) {
    return React.Children.toArray(node.props.children).reduce(
      (sum, child) => sum + textLength(child),
      0
    );
  }
  
  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + textLength(child), 0);
  }

  // আমাদের নতুন tableAnimationConfig থেকে ইমেজ বাফারিং টাইম রিড করবে
  if (node.type === 'img' || node.type === 'Image') {
    return tableAnimationConfig.imageVirtualCharacters; 
  }

  return 0;
};

export const getAnimationFrames = (element, fps) => {
  if (!element) return { animationFrames: fps, progressEnd: 100 };

  const props = element.props || {};
  
  // 🎯 মেইন ফিক্স: RevealElement বা অন্য কোনো র্যাপার থাকলে তার ভেতরের আসল কোর চাইল্ডকে এক্সট্র্যাক্ট করা
  let targetElement = element;
  if (props.children && React.isValidElement(props.children)) {
    targetElement = props.children;
  } else if (element.type?.name === 'RevealElement') {
    targetElement = props.children;
  }

  const targetProps = targetElement?.props || {};
  const parsedStyle = parseClassNameToStyle(targetProps.className || '');
  const style = { ...parsedStyle, ...targetProps.style };
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

    // 📊 টেবিল টাইপের জন্য এখন কাস্টম নোড ট্রাভার্সাল ১০০% কাজ করবে
    case 'table': {
      const target = targetElement.type?.getTargetElement 
        ? targetElement.type.getTargetElement(targetProps) 
        : targetElement;

      baseFrames = Math.max(
        fps,
        Math.ceil(textLength(target) * tableAnimationConfig.framesPerCharacter),
      );
      speedMultiplier = tableAnimationConfig.speedMultiplier;
      break;
    }

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
