import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';

export const MainVideoEngine = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* ০ থেকে ১২০ ফ্রেম পর্যন্ত হেডিং দেখাবে */}
      <Sequence from={0} durationInFrames={120}>
        <h1 style={{ fontSize: '80px', fontFamily: 'sans-serif', color: '#ce1414' }}>
          Welcome to Scene 01 Heading
        </h1>
      </Sequence>

      {/* ১২০ থেকে ২৪০ ফ্রেম পর্যন্ত প্যারাগ্রাফ দেখাবে */}
      <Sequence from={120} durationInFrames={120}>
        <p style={{ fontSize: '50px', fontFamily: 'sans-serif', color: '#333' }}>
          This is a normal paragraph entering at frame 120.
        </p>
      </Sequence>

      {/* ২৪০ থেকে ৩৬০ ফ্রেম পর্যন্ত নেক্সট সিন দেখাবে */}
      <Sequence from={240} durationInFrames={120}>
        <h1 style={{ fontSize: '70px', fontFamily: 'sans-serif', color: 'blue' }}>
          Scene 02: Next Content Loading...
        </h1>
      </Sequence>

    </AbsoluteFill>
  );
};