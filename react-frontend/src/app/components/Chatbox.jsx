"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";
import axios from "axios";

const Chatbox = () => {

  const [responses, setResponses] = useState([]);   // FIXED
  const [loading, setLoading] = useState(false);

  const handleFetchCoinDetails = async (prompt) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5455/ai/chat", { prompt });

      const response = { message: data.message, role: "model" };
      setResponses((prev) => [...prev, response]);

      console.log("Success ", data);
    } catch (error) {
      const errorMsg = error.code === "ERR_NETWORK" 
        ? "⚠️ Backend server is not running. Please start your Java server on port 5455."
        : `Error: ${error.message}`;
      
      setResponses((prev) => [...prev, { message: errorMsg, role: "model" }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbox blur-background large-shadow z-50 bg-[#000518] bg-opacity-70 w-[77vw] md:w-[70vw] lg:w-[40vw] pb-6 h-[85vh]">

      {/* Header */}
      <div className="h-[13%] pl-3 border-b border-gray-400 flex gap-x-4 items-center">
        <img
          className="rounded-full w-12 h-12"
          src="https://cdn.pixabay.com/photo/2023/05/29/18/53/cyborg-8026949_640.jpg"
          alt="Bot"
        />
        <div>
          <h1 className="text-lg font-semibold">AI Chat Bot</h1>
          <p className="text-sm text-gray-400">Real Time Crypto Market Data</p>
        </div>
      </div>

      {/* Chat Body */}
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

            {loading && <p className="text-gray-400">fetching data from server...</p>}
          </div>
        ) : (
          <div className="p-10 gap-5 h-full flex flex-col justify-center items-center">
            <p className="text-2xl font-bold">Welcome to the Crypto Chat Bot</p>
            <p className="text-gray-500">Inquire about market data</p>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="h-[10%] px-5">
        <input
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              
              const text = e.target.value.trim();
              if (!text) return;

              // add user message
              const msg = { message: text, role: "user" };
              setResponses((prev) => [...prev, msg]);

              handleFetchCoinDetails(text);

              e.target.value = "";
            }
          }}
          className="h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none"
          placeholder="give your prompt"
        />
      </div>
    </div>
  );
};

export default Chatbox;
