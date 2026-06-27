import React from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { RevealElement } from './components/RevealElement';

export const MainVideoEngine = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white', padding: '50px', fontFamily: 'sans-serif' }}>
      
      {/* ==========================================
          SCENE 01: আপনার দেওয়া সম্পূর্ণ ডিজাইন লেআউট
          ========================================== */}
      <div id="scene-01" style={{ position: 'relative', width: '100%', height: '100%' }}>
        
        {/* sequenceId: ১ | ৩ সেকেন্ড ধরে টাইপ হবে */}
        <RevealElement sequenceId={1} duration={3} type="text">
          <h1 style={{ fontSize: '80px', color: '#ce1414', margin: '10px 0' , fontFamily: 'Kalam, cursive'}}>
            Welcome to MCP Tutorial
          </h1>
        </RevealElement>

        {/* sequenceId: ২ | ১ সেকেন্ড ধরে আন্ডারলাইন ড্র হবে */}
        <RevealElement sequenceId={2} duration={1} type="underline">
          <div style={{ height: '6px', backgroundColor: '#10b981', width: '600px', borderRadius: '3px' }} />
        </RevealElement>

        {/* sequenceId: ৩ | ৩ সেকেন্ড ধরে প্যারাগ্রাফ টাইপ হবে */}
        <RevealElement sequenceId={3} duration={3} type="text">
          <p style={{ fontSize: '35px', color: '#333', marginTop: '30px' }}>
            Some Context about Model Context Protocol...
          </p>
        </RevealElement>

        {/* sequenceId: ৪ | ১.৫ সেকেন্ড ধরে ইমেজ ভেসে উঠবে */}
        <RevealElement sequenceId={4} duration={1.5} type="image">
          <img src={staticFile("/mcpimg.png")} alt="some-img1" style={{ width: '300px', marginTop: '20px' }} />
        </RevealElement>

        {/* sequenceId: ৫ | ১.৫ সেকেন্ড ধরে ২য় ইমেজ ভেসে উঠবে */}
        <RevealElement sequenceId={5} duration={1.5} type="image">
          <img src={staticFile("/mcpclients.png")} alt="some-img2" style={{ width: '300px', marginLeft: '30px' }} />
        </RevealElement>

      </div>

      {/* ==========================================
          SCENE 02: এর পরের দৃশ্য (ভবিষ্যতে যোগ করার জন্য)
          ========================================== */}
      {/* <div id="scene-02"> ... </div> */}

    </AbsoluteFill>
  );
};