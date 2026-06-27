import React from 'react';
import { useCurrentFrame } from 'remotion';

export const RevealElement = ({ sequenceId, duration, type, children }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  // ১. প্রতিটি সিকোয়েন্সের হার্ডকোডেড স্টার্ট টাইম (সেকেন্ডে)
  // আপনি জাস্ট আপনার আইডি অনুযায়ী আইডি বসিয়ে দিন, কোড নিজে ফ্রেম বের করে নেবে
  let startSecond = 0;
  
  if (sequenceId === 1) startSecond = 0;      // শুরু থেকে
  if (sequenceId === 2) startSecond = 3;      // ১ম টেক্সটের ৩ সেকেন্ড পর
  if (sequenceId === 3) startSecond = 4;      // আন্ডারলাইনের ১ সেকেন্ড পর (৩ + ১)
  if (sequenceId === 4) startSecond = 7;      // প্যারাগ্রাফের ৩ সেকেন্ড পর (৪ + ৩)
  if (sequenceId === 5) startSecond = 8.5;    // ১ম ইমেজের ১.৫ সেকেন্ড পর (৭ + ১.৫)

  const startFrame = startSecond * fps;
  const durationInFrames = duration * fps;

  // যদি এই এলিমেন্টের আসার সময় এখনো না হয়, তবে স্ক্রিনে দেখাবে না
  if (frame < startFrame) {
    return null; 
  }

  // ২. টেক্সট টাইপরাইটার অ্যানিমেশনের জন্য সাধারণ CSS ইফেক্ট
  if (type === 'text') {
    return (
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', animation: `typing ${duration}s steps(40, end)` }}>
        {children}
        <style>{`@keyframes typing { from { width: 0 } to { width: 100% } }`}</style>
      </div>
    );
  }

  // ৩. আন্ডারলাইন অ্যানিমেশন (বাম থেকে ডানে ড্র হবে)
  if (type === 'underline') {
    return (
      <div style={{ overflow: 'hidden', animation: `drawWidth ${duration}s ease-out forwards` }}>
        {children}
        <style>{`@keyframes drawWidth { from { max-width: 0% } to { max-width: 100% } }`}</style>
      </div>
    );
  }

  // ৪. ইমেজ অ্যানিমেশন (Fade/Scale Pop ইফেক্ট)
  if (type === 'image') {
    return (
      <div style={{ display: 'inline-block', animation: `popIn ${duration}s ease-out forwards` }}>
        {children}
        <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
      </div>
    );
  }

  return children;
};