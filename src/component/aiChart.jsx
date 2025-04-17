import { useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
import "./aiChart.css";

const AiChart = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I assist you today?",
      sender: "ai",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessage = async () => {
    if (!inputText.trim()) return; 

    const userMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("https://portfolio-backend-mu-gules.vercel.app/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await response.json();
      const aiResponse = { text: data.response, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your request.", sender: "ai" },
      ]);
    }

    setInputText(""); // Clear input field
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-h-scree">
      <div className="tw-container tw-flex tw-flex-col tw-min-h-[400px] tw-max-w-[850px] tw-max-h-[500px] tw-shadow-xl ">
        {/* Header */}
        <div className="tw-bg-gray-800 tw-text-white tw-p-4 tw-rounded-t-[10px]">
          <h1 className="tw-text-sm md:tw-text-xl tw-text-center tw-text-white">
            Chatting with Aadarsh's AI Assistant
          </h1>
        </div>

        {/* Messages area */}
        <div className="no-scrollbar tw-flex-grow tw-p-4 tw-overflow-y-auto tw-bg-slate-950">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-bg-slate-950">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`tw-max-w-[80%] tw-p-2 tw-rounded-[10px] tw-text-xs md:tw-text-[16px] ${
                  message.sender === "user"
                    ? " tw-text-white tw-self-end"
                    : "tw-bg-slate-800 tw-text-white tw-self-start tw-font-sans"
                }`}
              >
                {message.sender === "ai" ? (
                  // <ReactMarkdown>{message.text}</ReactMarkdown>
                  message.text
                ) : (
                  message.text
                )}
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
        </div>

        {/* Input area */}
        <div className=" tw-border-t-2 tw-border-blue-900 tw-bg-gray-800 tw-rounded-b-[10px]">
          <div className="tw-relative  tw-bg-gray-800 tw-flex tw-items-center tw-p-1 tw-rounded-b-[10px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows={1}
              // className="tw-w-full tw-bg-gray-800 tw-text-white tw-resize-none tw-text-sm md:tw-text-base tw-pr-12 tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
              className="tw-container tw-h-1/3 tw-bg-gray-800 tw-text-white tw-resize-none tw-text-sm md:tw-text-base tw-pr-12 tw-outline-none tw-border-none "
            />
            <button
              onClick={sendMessage}
              className="tw-absolute tw-right-2 tw-bottom-2 tw-text-2xl tw-bg-gray-80  tw-rounded-md tw-shadow-md tw-transition-all tw-duration-200"
            >
              <i className="ri-arrow-up-line tw-bg-white tw-text-black tw-rounded-[50%]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChart;
