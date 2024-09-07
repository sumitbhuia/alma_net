"use client";
import React, { useEffect } from 'react';
import Script from 'next/script';

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Function to check if the script already exists
    const checkScriptExists = () => {
      return document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"]');
    };

    // Function to load the script
    const loadScript = () => {
      const dfMessengerScript = document.createElement('script');
      dfMessengerScript.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
      dfMessengerScript.async = true;
      document.body.appendChild(dfMessengerScript);

      dfMessengerScript.onload = () => {
        console.log('Dialogflow Messenger script loaded successfully.');
      };

      dfMessengerScript.onerror = () => {
        console.error('Error loading Dialogflow Messenger script.');
      };
    };

    // Load the script if it doesn't already exist
    if (!checkScriptExists()) {
      loadScript();
    }
  }, []);

  return (
    <>
      <df-messenger
        location="us-central1"
        project-id="sylvan-fusion-434815-v2"
        agent-id="2b9413b6-4351-43a6-a6c8-2db5896a602b"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="Call Companion"></df-messenger-chat-bubble>
      </df-messenger>
    </>
  );
};

export default Chatbot;
