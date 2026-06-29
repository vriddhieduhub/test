import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { RevealElement, RevealSequence } from './components/RevealElement';
import { WhiteboardEraser } from './components/types/WhiteboardEraser';
import { getSequenceDurationInFrames } from './whiteboard.config';

import { H1 } from './components/types/H1';
import { Hr } from './components/types/Hr';
import { P } from './components/types/P';
import {Image} from './components/types/Image';

// ==========================================
// SCENE 01: মূল সিন - হেডিং, প্যারাগ্রাফ, ইমেজ ইত্যাদি
// ==========================================
export const scene01Sequence = [
  <RevealElement key="heading" sequenceId={1}>
    <H1 className="font-kalam top-80 left-100 text-8xl text-blue w-full">
      Welcome to MCP Thank you
    </H1>
  </RevealElement>,

  <RevealElement key="second-heading" sequenceId={2}>
    <H1 className="font-marker top-180 left-100 text-5xl text-orange w-full">
      Different fonts, same animation
    </H1>
  </RevealElement>,

  <RevealElement key="underline" sequenceId={3}>
    <Hr className="top-250 left-100 w-1200 h-10 text-green w-1350" />
  </RevealElement>,

  <RevealElement key="mcp-hub-image" sequenceId={4}>
    <Image 
      src="/mcpimg.png" 
      alt="MCP Hub Diagram"
      className="top-250 left-100 w-380 h-380 object-contain" 
    />
  </RevealElement>,

  <RevealElement key="paragraph" sequenceId={5}>
    <P className="font-kalam top-350 left-700 text-4xl w-1100 leading-relaxed">
      <strong>MCP (Model Context Protocol)</strong> is a{' '}
      <span className="text-red">new standard</span>{' '}
      that enables AI models to{' '}
      <span className="bg-yellow rounded px-2">communicate with external tools</span>{' '}
      in a <u className="underline-green">secure and structured way</u>. It eliminates{' '}
      <span className="text-blue font-bold">custom integrations</span>, improves{' '}
      <span className="text-emerald italic">developer productivity</span>, and makes AI agents{' '}
      <span className="bg-purple rounded px-2"><strong className="font-bold">more reliable</strong></span> for{' '}
      <span className="underline-thick-red">real-world applications</span>.
    </P>
  </RevealElement>,

  <RevealElement key="eraser-scene01" sequenceId={6}>
    <WhiteboardEraser />
  </RevealElement>,
];

// ==========================================
// SCENE 02: দ্বিতীয় সিন - হেডার এবং ইমেজ
// ==========================================
export const scene02Sequence = [
  <RevealElement key="scene2-heading" sequenceId={1}>
    <H1 className="font-kalam top-100 left-100 text-7xl text-purple w-1350">
      Scene 02: Advanced Features
    </H1>
  </RevealElement>,

  <RevealElement key="scene2-image" sequenceId={2}>
    <Image 
      src="/mcpclients.png" 
      alt="Advanced Features"
      className="top-300 left-100 w-500 h-500 object-contain w-1350" 
    />
  </RevealElement>,

  <RevealElement key="scene2-description" sequenceId={3}>
    <P className="font-kalam top-700 left-700 text-3xl w-1100 leading-relaxed text-gray-700">
      Explore the powerful capabilities and integrations available in the MCP ecosystem.
    </P>
  </RevealElement>,

  <RevealElement key="eraser-scene02" sequenceId={4}>
    <WhiteboardEraser />
  </RevealElement>,
];

// ==========================================
// SCENE 03: তৃতীয় সিন - ধন্যবাদ স্লাইড
// ==========================================
export const scene03Sequence = [
  <RevealElement key="scene3-thank-you" sequenceId={1}>
    <H1 className="font-kalam top-400 left-100 text-9xl text-blue font-bold w-1350">
      Thank You!
    </H1>
  </RevealElement>,

  <RevealElement key="scene3-subtitle" sequenceId={2}>
    <P className="font-marker top-600 left-100 text-5xl text-orange w-1350">
      Keep building amazing things with MCP
    </P>
  </RevealElement>,
];

// ব্যাকওয়ার্ড কম্প্যাটিবিলিটির জন্য
export const mainVideoSequence = scene01Sequence;

const Scene01Container = () => (
  <AbsoluteFill id="scene-01">
    <RevealSequence>
      {scene01Sequence}
    </RevealSequence>
  </AbsoluteFill>
);

const Scene02Container = () => (
  <AbsoluteFill id="scene-02">
    <RevealSequence>
      {scene02Sequence}
    </RevealSequence>
  </AbsoluteFill>
);

const Scene03Container = () => (
  <AbsoluteFill id="scene-03">
    <RevealSequence>
      {scene03Sequence}
    </RevealSequence>
  </AbsoluteFill>
);

export const MainVideoEngine = () => {
  const FPS = 30;

  // Scene 01 ডিউরেশন ক্যালকুলেট করা
  const scene01Duration = getSequenceDurationInFrames(scene01Sequence, FPS);
  
  // Scene 02 ডিউরেশন ক্যালকুলেট করা
  const scene02Duration = getSequenceDurationInFrames(scene02Sequence, FPS);
  
  // Scene 03 ডিউরেশন ক্যালকুলেট করা
  const scene03Duration = getSequenceDurationInFrames(scene03Sequence, FPS);

  // ফ্রেম পজিশন ক্যালকুলেট করা
  let currentFrame = 0;
  
  const scene01StartFrame = currentFrame;
  currentFrame += scene01Duration;
  
  const scene02StartFrame = currentFrame;
  currentFrame += scene02Duration;
  
  const scene03StartFrame = currentFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', fontFamily: 'sans-serif' }}>
      
      {/* SCENE 01 */}
      <Sequence from={scene01StartFrame} durationInFrames={scene01Duration}>
        <Scene01Container />
      </Sequence>

      {/* SCENE 02 */}
      <Sequence from={scene02StartFrame} durationInFrames={scene02Duration}>
        <Scene02Container />
      </Sequence>

      {/* SCENE 03 */}
      <Sequence from={scene03StartFrame} durationInFrames={scene03Duration}>
        <Scene03Container />
      </Sequence>

    </AbsoluteFill>
  );
};
