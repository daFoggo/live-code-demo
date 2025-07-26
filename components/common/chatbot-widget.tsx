"use client";

import { useEffect } from "react";

// Define the type for the Dify chatbot configuration
interface DifyChatbotConfig {
  token: string;
  baseUrl: string;
  systemVariables: {
    user_id?: string;
    conversation_id?: string;
  };
  userVariables: {
    avatar_url?: string;
    name?: string;
  };
}

// Extend the Window interface to include our custom property
declare global {
  interface Window {
    difyChatbotConfig?: DifyChatbotConfig;
  }
}

const ChatbotWidget = () => {
  useEffect(() => {
    // Tạo config object trên window với proper typing
    window.difyChatbotConfig = {
      token: "hkyhxlotskCGPSuq",
      baseUrl: "http://aiservice1.ptit.edu.vn",
      systemVariables: {
        // user_id: 'YOU CAN DEFINE USER ID HERE',
        // conversation_id: 'YOU CAN DEFINE CONVERSATION ID HERE, IT MUST BE A VALID UUID',
      },
      userVariables: {
        // avatar_url: 'YOU CAN DEFINE USER AVATAR URL HERE',
        // name: 'YOU CAN DEFINE USER NAME HERE',
      },
    };

    // Tạo và thêm script tag
    const script = document.createElement("script");
    script.src = "http://aiservice1.ptit.edu.vn/embed.min.js";
    script.id = "hkyhxlotskCGPSuq";
    script.defer = true;

    document.body.appendChild(script);

    // Tạo và thêm style tag
    const style = document.createElement("style");
    style.innerHTML = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function để remove script và style khi component unmount
    return () => {
      const existingScript = document.getElementById("hkyhxlotskCGPSuq");
      if (existingScript) {
        existingScript.remove();
      }

      // Remove style (optional - có thể để lại nếu cần)
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }

      // Clear config
      delete window.difyChatbotConfig;
    };
  }, []);

  return null; // Component này không render gì cả, chỉ load script
};

export default ChatbotWidget;