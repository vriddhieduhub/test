/* eslint-disable no-debugger */
/* eslint-disable no-undef */
import React from 'react';
import { parseClassNameToStyle } from './utils/styleResolver';




// 🎯 শুধুমাত্র হেডার টেক্সটের (Heading) জন্য স্পেসিফিক কনফিগ
export const headingAnimationConfig = {
  speedMultiplier: 1.0,   // 🚀 হেডিং লেখার স্পিড মাল্টিপ্লায়ার
  waveAmplitude: 16,      // 🌊 হেডিং লেখার সময় হাতের উপর-নিচ ঢেউয়ের সাইজ (পিক্সেলে)
  waveFrequency: 0.8,     // ⚡ হেডিং এর জন্য হাত নাচার ফ্রিকোয়েন্সি 
  microNoise: 1.5,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

// 🟢 সম্পূর্ণ আলাদা আন্ডারলাইন এলিমেন্টের জন্য ডেডিকেটেড কনфিগ
export const underlineAnimationConfig = {
  speedMultiplier: 1.0,   // 🚀 আন্ডারলাইন ড্র বা রিভিল হওয়ার মেইন স্পিড চাবি
  waveAmplitude: 8,       // 🌊 লাইন টানার সময় হাত কতটা উপর-নিচ কাঁপবে (হেডিংয়ের চেয়ে একটু কম হবে)
  waveFrequency: 1.2,     // ⚡ লাইনের সময় হাত কত ঘনঘন কাঁপবে
  microNoise: 1.2,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

// 🎯 শুধুমাত্র প্যারাগ্রাফ টেক্সটের (Paragraph) রাইটিং কনফিগ
export const paragraphAnimationConfig = {
  speedMultiplier: 1.0,
  framesPerCharacter: 1.5, // প্রতি character লিখতে গড়ে ১.৫ frame
  waveAmplitude: 6,       // 🌊 ছোট ফন্টের জন্য হাতের ঢেউয়ের সাইজ ছোট (পিক্সেলে)
  waveFrequency: 1.0,     // ⚡ ফাস্ট রাইটিংয়ের জন্য হালকা ফ্রিকোয়েন্সি 
  microNoise: 1.0,        // ✒️ পেনের ডগার রিয়েলিস্টিক ভাইব্রেশন
};


// 🎯 শুধুমাত্র হেডার টেক্সটের (Heading) জন্য স্পেসিফিক কনফিগ
export const imageAnimationConfig = {
  speedMultiplier: 1.0,   // 🚀 হেডিং লেখার স্পিড মাল্টিপ্লায়ার
  waveAmplitude: 16,      // 🌊 হেডিং লেখার সময় হাতের উপর-নিচ ঢেউয়ের সাইজ (পিক্সেলে)
  waveFrequency: 0.8,     // ⚡ হেডিং এর জন্য হাত নাচার ফ্রিকোয়েন্সি 
  microNoise: 1.5,        // ✒️ পেনের ডগার সূক্ষ্ম রিয়েলিস্টিক ভাইব্রেশন
};

// 🧼 ERASER AND TIMING CONFIGURATION (নতুন নাম এবং প্রপার স্ট্রাকচার)
export const eraserAnimationConfig = {
  eraserDuration: 45,       // স্ক্রিন মুছতে টোটাল ফ্রেম সংখ্যা (১.৫ সেকেন্ড)
  sceneDelay: 15,          // সিনের এলিমেন্ট শেষ হওয়ার পর ইরেজার কল করার আগের হোল্ড গ্যাপ ফ্রেম
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

// Content এবং config থেকে একটি element-এর natural animation timing বের করে।
export const getAnimationFrames = (element, fps) => {
  const props = element?.props || {};
  const parsedStyle = parseClassNameToStyle(props.className || '');
  const style = { ...parsedStyle, ...props.style };


  let baseFrames;
  let speedMultiplier = 1;

  switch (element?.type?.animationType) {

    case 'heading':
      baseFrames = Math.max(Math.round(fps * 0.6), textLength(element) * 4);
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
        Math.ceil(textLength(element) * paragraphAnimationConfig.framesPerCharacter),
      );
      speedMultiplier = paragraphAnimationConfig.speedMultiplier;
      break;

    case 'image': 
      baseFrames = Math.round(fps * 3.0);
      speedMultiplier = imageAnimationConfig.speedMultiplier;
      break;

    case 'eraser':
      // বোর্ডটি উপর থেকে নিচে মুছতে ২.৫ সেকেন্ড বা ৭৫ ফ্রেম বরাদ্দ করা হলো (smooth & elegant)
      baseFrames = Math.round(fps * 2.5);
      speedMultiplier = 1.0;
      break;

    default:
      baseFrames = fps;
  }

  return {
    animationFrames: Math.max(1, Math.ceil(baseFrames / speedMultiplier)),
    progressEnd: 100 / speedMultiplier,
  };
};





export const getSequenceDurationInFrames_Backup = (children, fps) => {
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const sequenceIds = [...new Set(elements.map((element) => element.props.sequenceId))];

  return sequenceIds.reduce((totalFrames, sequenceId) => {
    const sequenceFrames = elements
      .filter((element) => element.props.sequenceId === sequenceId)
      .map((element) => getAnimationFrames(element.props.children, fps).animationFrames);

    return totalFrames + Math.max(...sequenceFrames);
  }, 0);
};


export const getSequenceDurationInFrames = (children, fps) => {
  // রিঅ্যাক্ট চাইল্ড নোড ফিল্টারিং
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const sequenceIds = [...new Set(elements.map((element) => element.props.sequenceId))];

  return sequenceIds.reduce((totalFrames, sequenceId) => {
    const sequenceFrames = elements
      .filter((element) => element.props.sequenceId === sequenceId)
      .map((element) => {
        // 🎯 ম্যাজিক সেফটি ফিক্স: 
        // যদি element নিজেই সরাসরি H1/Image/Hr হয় তবে সেটাই পাঠাবে, 
        // আর যদি RevealElement দিয়ে মোড়ানো থাকে, তবে তার পেটের children-কে পাঠাবে।
        const innerTarget = element.props.sequenceId && element.props.children ? element.props.children : element;
        
        return getAnimationFrames(innerTarget, fps).animationFrames;
      });

    return totalFrames + Math.max(...sequenceFrames);
  }, 0);
};
