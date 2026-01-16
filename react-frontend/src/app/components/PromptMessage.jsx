"use client";
const PromptMessage = ({ message }) => {
  return (
    <div className="prompt-bubble max-w-[80%] px-4 py-2 rounded-2xl">
      {message}
    </div>
  );
};

export default PromptMessage;
