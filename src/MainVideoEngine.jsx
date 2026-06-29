import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { RevealElement, RevealSequence } from './components/RevealElement';
import { WhiteboardEraser } from './components/types/WhiteboardEraser';
import { getSequenceDurationInFrames } from './whiteboard.config';

import { H1 } from './components/types/H1';
import { Hr } from './components/types/Hr';
import { P } from './components/types/P';
import { Image } from './components/types/Image';
import { Table, Tr, Th, Td } from './components/types/Table'; // নতুন তৈরি করা টেবিল কম্পোনেন্ট
// ==========================================================================
// 🚀 NEW SCENE: MCP BASIC FLOW (User -> AI App -> MCP Server -> Tools)
// ==========================================================================
import { ArrowWithText } from './components/types/ArrowWithText';
import { DynamicArrow } from './components/types/DynamicArrow';



export const mcpBasicFlowSequence = [
  // --------------------------------------------------
  // 0. MAIN TITLE
  // --------------------------------------------------
  <RevealElement key="mcp-flow-title" sequenceId={1}>
    <H1 className="font-kalam top-60 left-100 text-6xl text-black font-bold w-full">
      MCP (Model Context Protocol) - Basic Flow
    </H1>
  </RevealElement>,

  // --------------------------------------------------
  // 1. BLOCK 01: USER NODE
  // --------------------------------------------------
  <RevealElement key="block-01-user" sequenceId={2}>
    <Image 
      src="/diagram/01.PNG" 
      alt="1. USER"
      className="top-220 left-40 w-280 h-600 object-contain" 
    />
  </RevealElement>,

  // --------------------------------------------------
  // 2. FLOW BETWEEN USER & AI APP (Arrow + Text)
  // --------------------------------------------------
  // Top Arrow: Question / Request (User -> AI App)
  <RevealElement key="flow-user-to-ai" sequenceId={3}>
    <ArrowWithText 
      startX={345} 
      startY={400} 
      endX={475} 
      endY={400} 
      text="Question / Request" 
      textPosition="top" 
      color="#000000"
      className="font-kalam text-2xl text-black"
      thickness={4}
    />
  </RevealElement>,

  // Bottom Arrow: Response / Answer (AI App -> User)
  <RevealElement key="flow-ai-to-user" sequenceId={4}>
    <ArrowWithText 
      startX={475} 
      startY={580} 
      endX={345} 
      endY={580} 
      text="Response / Answer" 
      textPosition="bottom" 
      color="#000000"
      thickness={4}
      className="font-kalam text-2xl text-black"
    />
  </RevealElement>,

  // --------------------------------------------------
  // 3. BLOCK 02: AI APPLICATION NODE
  // --------------------------------------------------
  <RevealElement key="block-02-ai-app" sequenceId={5}>
    <Image 
      src="/diagram/02.PNG" 
      alt="2. AI APPLICATION"
      className="top-180 left-495 w-320 h-730 object-contain" 
    />
  </RevealElement>,

  // --------------------------------------------------
  // 4. FLOW BETWEEN AI APP & MCP SERVER (Arrow + Sub-text)
  // --------------------------------------------------
  // Top Flow: 3. MCP Request & Sub-text
  <RevealElement key="flow-ai-to-server" sequenceId={6}>
    <ArrowWithText 
      startX={835} 
      startY={380} 
      endX={1085} 
      endY={380} 
      text="3. MCP Request" 
      textPosition="top" 
      color="#7e22ce" // Purple color matching image theme
      className="font-kalam text-3xl text-purple"
      thickness={4}
    />
  </RevealElement>,
  <RevealElement key="label-mcp-request-sub" sequenceId={7}>
   <P className="font-kalam top-460 left-960 text-2xl w-400 text-center text-gray" style={{ transform: 'translateX(-50%)' }}>
    (Discover / List / Call Tool)
  </P>
  </RevealElement>,

  // Bottom Flow: 4. MCP Response & Sub-text
  <RevealElement key="flow-server-to-ai" sequenceId={8}>
    <ArrowWithText 
      startX={1085} 
      startY={630} 
      endX={835} 
      endY={630} 
      text="4. MCP Response" 
      textPosition="bottom" 
      color="#7e22ce"
      className="font-kalam text-3xl text-purple"
      thickness={4}
    />
  </RevealElement>,
  <RevealElement key="label-mcp-response-sub" sequenceId={9}>
    <P className="font-kalam top-690 left-960 text-2xl w-400 text-center" style={{ transform: 'translateX(-50%)' }}>
      (Result / Data)
    </P>
  </RevealElement>,

  // --------------------------------------------------
  // 5. BLOCK 03: MCP SERVER NODE
  // --------------------------------------------------
  <RevealElement key="block-03-mcp-server" sequenceId={10}>
    <Image 
      src="/diagram/03.PNG" 
      alt="3. MCP SERVER"
      className="top-200 left-1100 w-340 h-700 object-contain" 
    />
  </RevealElement>,

  // --------------------------------------------------
  // 6. BLOCK 04: EXTERNAL TOOLS / DATA SOURCES
  // --------------------------------------------------
  <RevealElement key="block-04-external-tools" sequenceId={11}>
    <Image 
      src="/diagram/04.PNG" 
      alt="4. EXTERNAL TOOLS"
      className="top-170 left-1520 w-320 h-800 object-contain" 
    />
  </RevealElement>,

  // --------------------------------------------------
  // 7. MULTIPLE TWO-WAY CONNECTORS TO SUB-TOOLS
  // --------------------------------------------------
  // Connectors dynamically drawn to five stacked tools (Database, Web API, etc.)
  <RevealElement key="arrow-tool-1" sequenceId={12}>
    <DynamicArrow startX={1455} startY={285} endX={1510} endY={285} color="#000000" thickness={3} />
  </RevealElement>,
  <RevealElement key="arrow-tool-2" sequenceId={13}>
    <DynamicArrow startX={1455} startY={445} endX={1510} endY={445} color="#000000" thickness={3} />
  </RevealElement>,
  <RevealElement key="arrow-tool-3" sequenceId={14}>
    <DynamicArrow startX={1455} startY={605} endX={1510} endY={605} color="#000000" thickness={3} />
  </RevealElement>,
  <RevealElement key="arrow-tool-4" sequenceId={15}>
    <DynamicArrow startX={1455} startY={765} endX={1510} endY={765} color="#000000" thickness={3} />
  </RevealElement>,
  <RevealElement key="arrow-tool-5" sequenceId={16}>
    <DynamicArrow startX={1455} startY={915} endX={1510} endY={915} color="#000000" thickness={3} />
  </RevealElement>,

  // --------------------------------------------------
  // 8. ERASER CLEANUP FOR NEXT SCENE
  // --------------------------------------------------
  <RevealElement key="eraser-mcp-flow" sequenceId={17}>
    <WhiteboardEraser />
  </RevealElement>,
];





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
// SCENE 04: নতুন টেবিল কম্পারিসন সিন (MCP vs LangGraph)
// ==========================================
export const scene04Sequence = [
  <RevealElement key="scene4-heading" sequenceId={1}>
    <H1 className="font-kalam top-80 left-100 text-6xl text-black font-bold w-full">
      Comparison: MCP vs LangGraph
    </H1>
  </RevealElement>,

<RevealElement key="comparison-table" sequenceId={2}>
    <Table className="top-220 left-100 w-1700 font-kalam">
      <thead>
        <Tr className="bg-gray-100 border-bottom-3">
          <Th cellIndex={0} className="text-left text-5xl border-right-2">Aspect</Th>
          <Th cellIndex={1} className="text-left text-5xl text-blue border-right-2">MCP</Th>
          <Th cellIndex={2} className="text-left text-5xl text-green">LangGraph</Th>
        </Tr>
      </thead>
      <tbody>
        {/* ROW 1: Role */}
        <Tr className="border-bottom-2">
          <Td cellIndex={3} className="font-bold border-right-2">
            <img src="/topicSymbolRole.png" width="120px" alt="Role" /> Role
          </Td>
          <Td cellIndex={4} className="font-bold text-4xl text-blue border-right-2">
            Protocol / Standard
          </Td>
          <Td cellIndex={5} className="font-bold text-4xl text-emerald">
            Framework / Library
          </Td>
        </Tr>
        {/* ROW 2: Purpose */}
        <Tr className="border-bottom-2">
          <Td cellIndex={6} className="font-bold text-4xl border-right-2">
            <img src="/topicSymbolPurpose.png" width="120px" alt="Purpose" /> Purpose
          </Td>
          <Td cellIndex={7} className="text-black text-4xl border-right-2">
            Connect AI models with external tools and data sources
          </Td>
          <Td cellIndex={8} className="text-black text-4xl">
            Build stateful, multistep agent workflows
          </Td>
        </Tr>
      </tbody>
    </Table>
  </RevealElement>,

  <RevealElement key="eraser-scene04" sequenceId={3}>
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

// সিন কন্টেইনারস
const Scene01Container = () => (
  <AbsoluteFill id="scene-01">
    <RevealSequence>{scene01Sequence}</RevealSequence>
  </AbsoluteFill>
);

const Scene02Container = () => (
  <AbsoluteFill id="scene-02">
    <RevealSequence>{scene02Sequence}</RevealSequence>
  </AbsoluteFill>
);

const Scene04Container = () => (
  <AbsoluteFill id="scene-04">
    <RevealSequence>{scene04Sequence}</RevealSequence>
  </AbsoluteFill>
);

const Scene03Container = () => (
  <AbsoluteFill id="scene-03">
    <RevealSequence>{scene03Sequence}</RevealSequence>
  </AbsoluteFill>
);

// ==========================================
// SCENE 05: নতুন ফ্লো ডায়াগ্রাম সিন কন্টেইনার
// ==========================================
const Scene05Container = () => (
  <AbsoluteFill id="scene-05">
    <RevealSequence>{mcpBasicFlowSequence}</RevealSequence>
  </AbsoluteFill>
);

// ==========================================
// 🚀 MAIN ENGINE COMPONENT
// ==========================================
export const MainVideoEngine = () => {
  const FPS = 30;

  // প্রতিটি সিনের ফ্রেম ডিউরেশন ক্যালকুলেট করা
  const scene01Duration = getSequenceDurationInFrames(scene01Sequence, FPS);
  const scene02Duration = getSequenceDurationInFrames(scene02Sequence, FPS);
  const scene04Duration = getSequenceDurationInFrames(scene04Sequence, FPS);
  const scene03Duration = getSequenceDurationInFrames(scene03Sequence, FPS);
  const scene05Duration = getSequenceDurationInFrames(mcpBasicFlowSequence, FPS);


  // গ্লোবাল টাইমলাইন ফ্রেম ট্র্যাকিং
  let currentFrame = 0;
  
  const scene01StartFrame = currentFrame;
  currentFrame += scene01Duration;
  
  const scene02StartFrame = currentFrame;
  currentFrame += scene02Duration;

  // টেবিল সিনটিকে ৩ নম্বর সিনের (Thank you) আগে প্লেস করা হলো লজিক্যালি
  const scene04StartFrame = currentFrame;
  currentFrame += scene04Duration;

  const scene05StartFrame = currentFrame;
  currentFrame += scene05Duration;
  
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

      {/* SCENE 04 (Table Comparison) */}
      <Sequence from={scene04StartFrame} durationInFrames={scene04Duration}>
        <Scene04Container />
      </Sequence>

      {/* 🔥 SCENE 05 (New Flow Diagram Scene) */}
      <Sequence from={scene05StartFrame} durationInFrames={scene05Duration}>
        <Scene05Container />
      </Sequence>

      {/* SCENE 03 (Thank You Slide) */}
      <Sequence from={scene03StartFrame} durationInFrames={scene03Duration}>
        <Scene03Container />
      </Sequence>

    </AbsoluteFill>
  );
};