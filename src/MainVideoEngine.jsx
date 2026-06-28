import React from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { RevealElement } from './components/RevealElement';

import { HeadingBlock } from './components/types/HeadingBlock';
import { ParagraphBlock } from './components/types/ParagraphBlock';
import { ListBlock } from './components/types/ListBlock';
import { CodingBlock } from './components/types/CodingBlock';

export const MainVideoEngine = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', padding: '50px', fontFamily: 'sans-serif' }}>
      
      <div id="scene-01" style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* সিকোয়েন্স ১: হেডিং ব্লক (টাইমিং: ৩ সেকেন্ড) */}
        <RevealElement sequenceId={1} duration={5} type="heading" x={60} y={60}>
          
          <HeadingBlock 
            text="Welcome to MCP Thank you" 
            style={{ top: '80px', left: '100px', fontSize: '100px', color: '#1714ce' }} 
          />
        </RevealElement>
        

        {/* সিকোয়েন্স ২: প্যারাগ্রাফ ব্লক (টাইমিং: ৪ সেকেন্ড) */}
        <RevealElement sequenceId={2} duration={4} type="paragraph" x={60} y={220}>
          <ParagraphBlock text="Model Context Protocol connects AI agents to secure data sources seamlessly." />
        </RevealElement>

        {/* সিকোয়েন্স ৩: লিস্ট কন্টেন্ট (টাইমিং: ৫ সেকেন্ড - একটার পর একটা আইটেম আসবে) */}
        <RevealElement sequenceId={3} duration={5} type="listcontent" x={60} y={400}>
          <ListBlock items={[
            "Connects to GitHub Repositories",
            "Queries SQL Databases directly",
            "Integrates with Slack Channels"
          ]} />
        </RevealElement>

        {/* সিকোয়েন্স ৪: কোডিং প্যানেল (টাইমিং: ৬ সেকেন্ড) */}
        <RevealElement sequenceId={4} duration={6} type="codingpanel" x={60} y={550}>
          <CodingBlock code={`const mcp = require("@modelcontextprotocol/sdk");\nconst server = new mcp.Server();`} />
        </RevealElement>

      </div>



      {/* ==========================================
          SCENE 02: এর পরের দৃশ্য (ভবিষ্যতে যোগ করার জন্য)
          ========================================== */}
      {/* <div id="scene-02"> ... </div> */}

    </AbsoluteFill>
  );
};