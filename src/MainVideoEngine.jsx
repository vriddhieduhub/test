import React from 'react';
import { AbsoluteFill } from 'remotion';
import { RevealElement, RevealSequence } from './components/RevealElement';

import { H1 } from './components/types/H1';
import { Hr } from './components/types/Hr';
import { P } from './components/types/P';
import {Image} from './components/types/Image';

import { ParagraphBlock } from './components/types/ParagraphBlock';
import { ListBlock } from './components/types/ListBlock';
import { CodingBlock } from './components/types/CodingBlock';

export const mainVideoSequence_Backup = [
  <RevealElement key="heading" sequenceId={1} x={60} y={60}>
    <H1
      className="font-kalam"
      style={{ top: '80px', left: '100px', fontSize: '100px', color: '#1714ce' }}
    >
      Welcome to MCP Thank you
    </H1>
  </RevealElement>,
  <RevealElement key="second-heading" sequenceId={2} x={60} y={155}>
    <H1
      className="font-marker"
      style={{ top: '80px', left: '100px', fontSize: '58px', color: '#d9480f' }}
    >
      Different fonts, same animation
    </H1>
  </RevealElement>,
  <RevealElement key="underline" sequenceId={3} x={60} y={150}>
    <Hr style={{ top: '200px', left: '105px', width: '1500px', height: '8px', color: '#2bbe0e' }} />
  </RevealElement>,
  <RevealElement key="paragraph" sequenceId={4} x={60} y={360}>
    <P style={{ top: '20px', left: '100px', fontSize: '52px', width: '1350px' }}>
      <strong>MCP (Model Context Protocol)</strong> is a{' '}
      <span className="text-red-500">new standard</span>{' '}
      that enables AI models to{' '}
      <span className="bg-yellow-200 rounded px-2">communicate with external tools</span>{' '}
      in a <u className="decoration-emerald-500 decoration-4">secure and structured way</u>. It eliminates{' '}
      <span className="text-blue-600 font-bold">custom integrations</span>, improves{' '}
      <span className="text-emerald-500 italic">developer productivity</span>, and makes AI agents{' '}
      <span className="bg-purple-200 rounded px-2"><strong className="font-bold">more reliable</strong></span> for{' '}
      <span className="underline decoration-red-500 decoration-double decoration-4">real-world applications</span>.
    </P>
  </RevealElement>,
];

export const mainVideoSequence = [
  <RevealElement key="heading" sequenceId={1}>
    {/* ইনলাইন স্টাইলের বদলে ক্লাসনেম পাস করা হলো */}
    <H1 className="font-kalam top-80 left-100 text-8xl text-blue">
      Welcome to MCP Thank you
    </H1>
  </RevealElement>,

  <RevealElement key="second-heading" sequenceId={2}>
    <H1 className="font-marker top-180 left-100 text-5xl text-orange">
      Different fonts, same animation
    </H1>
  </RevealElement>,

  <RevealElement key="underline" sequenceId={3}>
    <Hr className="top-250 left-100 w-1200 h-10 text-green" />
  </RevealElement>,

  <RevealElement key="mcp-hub-image" sequenceId={4}>
    <Image 
      src="/mcpimg.png" 
      alt="MCP Hub Diagram"
      className="top-250 left-100 w-380 h-380 object-contain" 
    />
  </RevealElement>,

  <RevealElement key="paragraph" sequenceId={5}>
    <P className="font-kalam top-350 left-100 text-4xl w-1350 leading-relaxed">
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
];

export const MainVideoEngine = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', padding: '50px', fontFamily: 'sans-serif' }}>
      
      <div id="scene-01" style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* Sequence IDs alone control the order; no duration is needed. */}
        <RevealSequence>
          {mainVideoSequence}
        </RevealSequence>

      </div>



      {/* ==========================================
          SCENE 02: এর পরের দৃশ্য (ভবিষ্যতে যোগ করার জন্য)
          ========================================== */}
      {/* <div id="scene-02"> ... </div> */}

    </AbsoluteFill>
  );
};
