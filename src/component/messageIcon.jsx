import React, { useEffect, useRef, useState } from "react";
import "./aiChart.css";

const MessageIcon = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Aadarsh's AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const dialogRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (dialogRef.current) {
      if (isDialogOpen) {
        if (!dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      } else {
        if (dialogRef.current.open) {
          dialogRef.current.close();
        }
      }
    }
  }, [isDialogOpen]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    // Add user message to chat
    const userMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://portfolio-backend-mu-gules.vercel.app/ai-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await response.json();
      const aiResponse = { text: data.response, sender: "ai" };
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your request.", sender: "ai" },
      ]);
    }
  };

  const formatMessage = (text) => {
    // Check if the message contains code blocks
    if (text.includes("```")) {
      const parts = text.split("```");
      return (
        <>
          {parts.map((part, index) => {
            // Even indexes are regular text, odd indexes are code blocks
            if (index % 2 === 0) {
              return (
                <p key={index} className="tw-mb-2 tw-bg-transparent tw-text-white">
                  {part}
                </p>
              );
            } else {
              // This is a code block
              const codeLines = part.trim().split("\n");
              const language = codeLines[0]; // First line might contain language
              const code =
                codeLines.length > 1 ? codeLines.slice(1).join("\n") : part;

              return (
                <div key={index} className="ai-code-block ">
                  {language && (
                    <div className="code-language tw-text-xs tw-text-[#607B96] tw-mb-1">
                      {language}
                    </div>
                  )}
                  <pre className="tw-text-[#607B96]">
                    <code className="tw-text-sm ">{code}</code>
                  </pre>
                  <button
                    className="copy-code-button"
                    onClick={() => navigator.clipboard.writeText(code)}
                  >
                    Copy
                  </button>
                </div>
              );
            }
          })}
        </>
      );
    }

    // Regular text message
    return <p className="tw-whitespace-pre-wrap tw-bg-transparent tw-text-white">{text}</p>;
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        onClick={openDialog}
        className="chat-button tw-fixed tw-bottom-14 tw-right-6 tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-rounded-full tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-z-50 hover:tw-scale-110 tw-transition-all tw-duration-300"
      >
        <i className="ri-message-3-line tw-text-white tw-text-2xl tw-bg-transparent"></i>
        {!isDialogOpen && <span className="pulse-animation"></span>}
      </button>

      {/* Chat Dialog */}
      <dialog
        className="chat-dialog"
        ref={dialogRef}
      >
        <div className="ai-chat-container tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-shadow-2xl tw-overflow-hidden tw-w-[350px] md:tw-w-[400px]">
          {/* Chat Header */}
          <div className="chat-header tw-bg-[#1E2D3D] tw-p-4 tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-3 tw-bg-transparent">
              <div className="ai-avatar tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-rounded-full tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-shadow-md">
                <i className="ri-robot-fill  tw-bg-transparent tw-text-xl"></i>
              </div>
              <div className="tw-bg-transparent">
                <h3 className="tw-text-white tw-font-medium tw-text-lg">
                  AI Assistant
                </h3>
                <p className="tw-text-[#607B96] tw-text-xs tw-bg-transparent">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="chat-controls tw-flex tw-gap-2 tw-bg-transparent">
              <button
                onClick={closeDialog}
                className="tw-text-[#607B96]  tw-transition-colors"
              >
                <i className="ri-close-line tw-text-xl tw-bg-red-600 tw-p-1 tw-rounded-[50%] hover:tw-bg-red-800 "></i>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages tw-h-[400px] tw-overflow-y-auto tw-p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`tw-mb-4 tw-flex ${
                  message.sender === "user"
                    ? "tw-justify-end"
                    : "tw-justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="ai-message-avatar tw-mr-2 tw-flex-shrink-0">
                    <div className="tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center">
                      <i className="ri-robot-fill  tw-text-sm tw-bg-transparent"></i>
                    </div>
                  </div>
                )}
                <div
                  className={`tw-max-w-[76%] tw-p-3 tw-rounded-[5px] ${
                    message.sender === "user"
                      ? "tw-bg-[#4D5BCE]/20 tw-border tw-border-[#4D5BCE]/30 tw-text-white"
                      : "tw-bg-[#1E2D3D] tw-border tw-border-[#1E2D3D] tw-text-[#E9E9E9]"
                  }`}
                >
                  <div className="tw-text-sm tw-bg-transparent">
                    {formatMessage(message.text)}
                  </div>
                  <span className="tw-block tw-text-right tw-text-[10px] tw-text-[#607B96] tw-mt-1">
                    {message.sender === "user" ? "You" : "AI"} •{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.sender === "user" && (
                  <div className="user-message-avatar tw-ml-2 tw-flex-shrink-0">
                    <div className="tw-bg-[#E99287] tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center">
                      <i className="ri-user-fill tw-text-[#011627] tw-bg-transparent tw-text-sm"></i>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="tw-flex tw-justify-start tw-mb-4">
                <div className="ai-message-avatar tw-mr-2">
                  <div className="tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center">
                    <i className="ri-robot-fill tw-text-[#011627] tw-bg-transparent tw-text-sm"></i>
                  </div>
                </div>
                <div className="tw-bg-[#1E2D3D] tw-p-4 tw-rounded-[5px] tw-flex tw-items-center">
                  <div className="typing-indicator tw-bg-transparent">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="chat-input tw-p-4 tw-border-t tw-border-[#1E2D3D] tw-bg-[#011627]"
          >
            <div className="tw-flex tw-items-baseline tw-gap-2">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="tw-flex-1 tw-bg-[#1E2D3D] tw-border tw-border-[#1E2D3D] focus:tw-border-[#4D5BCE] tw-rounded-lg  tw-text-white tw-placeholder-[#607B96] tw-outline-none tw-transition"
              />
              <button
                type="submit"
                disabled={inputText.trim() === "" || isTyping}
                className="tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-text-white tw-rounded-[10px] tw-px-4 tw-py-1 tw-flex tw-items-center tw-justify-center disabled:tw-opacity-50 tw-transition hover:tw-shadow-lg"
              >
                <i className="ri-send-plane-fill tw-bg-transparent"></i>
              </button>
            </div>
            <div className="tw-flex tw-justify-center tw-mt-3">
              <div className="tw-text-xs tw-text-[#607B96]">
                Powered by <span className="tw-text-[#43D9AD]">Aadarsh's AI</span>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MessageIcon;
