"use client";
import { useState } from "react";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import { chatService } from "@/lib/api/chatService";
import { MESSAGES, BOT_CONFIG } from "@/lib/config/constants";

const Chatbox = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (prompt) => {
    setLoading(true);
    try {
      const data = await chatService.sendMessage(prompt);
      setResponses((prev) => [...prev, { message: data.message, role: "model" }]);
    } catch (error) {
      const errorMsg = error.code === "ERR_NETWORK" 
        ? MESSAGES.NETWORK_ERROR
        : `Error: ${error.message}`;
      setResponses((prev) => [...prev, { message: errorMsg, role: "model" }]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const text = e.target.value.trim();
      if (!text) return;

      setResponses((prev) => [...prev, { message: text, role: "user" }]);
      handleSendMessage(text);
      e.target.value = "";
    }
  };

  return (
    <div className="chatbox blur-background large-shadow z-50 bg-[#000518] bg-opacity-70 w-[77vw] md:w-[70vw] lg:w-[40vw] pb-6 h-[85vh]">
      <div className="h-[13%] pl-3 border-b border-gray-400 flex gap-x-4 items-center">
        <img className="rounded-full w-12 h-12" src={BOT_CONFIG.AVATAR} alt="Bot" />
        <div>
          <h1 className="text-lg font-semibold">{BOT_CONFIG.NAME}</h1>
          <p className="text-sm text-gray-400">{BOT_CONFIG.DESCRIPTION}</p>
        </div>
      </div>

      <div className="h-[77%]">
        {responses.length > 0 ? (
          <div className="flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar">
            {responses.map((item, index) =>
              item.role === "user" ? (
                <div className="self-end" key={index}>
                  <PromptMessage message={item.message} />
                </div>
              ) : (
                <div className="self-start" key={index}>
                  <ResponseMessage message={item.message} />
                </div>
              )
            )}
            {loading && <p className="text-gray-400">{MESSAGES.LOADING}</p>}
          </div>
        ) : (
          <div className="p-10 gap-5 h-full flex flex-col justify-center items-center">
            <p className="text-2xl font-bold">{MESSAGES.WELCOME_TITLE}</p>
            <p className="text-gray-500">{MESSAGES.WELCOME_SUBTITLE}</p>
          </div>
        )}
      </div>

      <div className="h-[10%] px-5">
        <input
          type="text"
          onKeyPress={handleKeyPress}
          className="h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default Chatbox;
