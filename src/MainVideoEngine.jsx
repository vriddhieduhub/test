import React from 'react';
import { AbsoluteFill } from 'remotion';
import { RevealElement, RevealSequence } from './components/RevealElement';

import { H1 } from './components/types/H1';
import { Hr } from './components/types/Hr';
import { P } from './components/types/P';
import { ParagraphBlock } from './components/types/ParagraphBlock';
import { ListBlock } from './components/types/ListBlock';
import { CodingBlock } from './components/types/CodingBlock';

export const mainVideoSequence = [
  <RevealElement key="heading" sequenceId={1} x={60} y={60}>
    <H1 style={{ top: '80px', left: '100px', fontSize: '100px', color: '#1714ce' }}>
      Welcome to MCP Thank you
    </H1>
  </RevealElement>,
  <RevealElement key="underline" sequenceId={2} x={60} y={120}>
    <Hr style={{ top: '200px', left: '105px', width: '1500px', height: '8px', color: '#2bbe0e' }} />
  </RevealElement>,
  <RevealElement key="paragraph" sequenceId={3} x={60} y={320}>
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

export const MainVideoEngine = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', padding: '50px', fontFamily: 'sans-serif' }}>
      
      <div id="scene-01" style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* Sequence IDs alone control the order; no duration is needed. */}
        <RevealSequence>
          {mainVideoSequence}



        {/* <RevealElement sequenceId={4} x={60} y={220}>
          <ParagraphBlock text="Model Context Protocol connects AI agents to secure data sources seamlessly." />
        </RevealElement> */}

        {/* সিকোয়েন্স ৩: লিস্ট কন্টেন্ট (টাইমিং: ৫ সেকেন্ড - একটার পর একটা আইটেম আসবে) */}
        {/* <RevealElement sequenceId={5} x={60} y={400}>
          <ListBlock items={[
            "Connects to GitHub Repositories",
            "Queries SQL Databases directly",
            "Integrates with Slack Channels"
          ]} />
        </RevealElement> */}

        {/* সিকোয়েন্স ৪: কোডিং প্যানেল (টাইমিং: ৬ সেকেন্ড) */}
        {/* <RevealElement sequenceId={6} x={60} y={550}>
          <CodingBlock code={`const mcp = require("@modelcontextprotocol/sdk");\nconst server = new mcp.Server();`} />
        </RevealElement> */}
        </RevealSequence>

      </div>



      {/* ==========================================
          SCENE 02: এর পরের দৃশ্য (ভবিষ্যতে যোগ করার জন্য)
          ========================================== */}
      {/* <div id="scene-02"> ... </div> */}

    </AbsoluteFill>
  );
};
