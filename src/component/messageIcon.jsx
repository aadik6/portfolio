'use client';

import React, { useEffect, useRef, useState } from "react";
import "./aiChart.css";

const QUICK_PROMPTS = [
  { label: "_top-skills", prompt: "What are your core technical skills and stack?" },
  { label: "_experience", prompt: "Tell me about your work experience as a developer." },
  { label: "_projects", prompt: "What are your best projects that you have built?" },
  { label: "_download-cv", prompt: "Where can I download your resume or CV?" },
  { label: "_contact-info", prompt: "How can I contact or hire you?" },
];

const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "// Hello! I'm Aadarsh's AI Assistant.\n\nAsk me anything about my **FullStack (Node.js/React)** experience, recent projects, tech stack, or getting in touch.",
    time: "online",
  },
];

const getLocalFallbackResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes("skill") || q.includes("stack") || q.includes("technolog")) {
    return "// technical skills\n- **Frontend**: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS\n- **Backend**: Node.js, Express, Nest.js, REST APIs\n- **Databases**: MongoDB, PostgreSQL, Mongoose\n- **Tools**: Git, GitHub, Firebase, Vite, Turbopack";
  }
  if (q.includes("experience") || q.includes("background") || q.includes("work")) {
    return "// experience\nAadarsh has **3+ years of experience** building dynamic, high-performance web applications. He transitioned from building static websites to scalable full-stack applications with MERN, Node.js, and modern frameworks.";
  }
  if (q.includes("project") || q.includes("portfolio") || q.includes("work")) {
    return "// featured projects\n1. **BirgunjByte**: Nepali-medium news portal (MERN, TypeScript, Zustand).\n2. **SkyWatch**: Real-time weather dashboard (React, TanStack Query).\n3. **News Portal**: Dynamic news platform (React, Firebase).\n4. **Medi Connect**: Doctor appointment booking app (PHP, MySQL).\n5. **E-commerce & News Admin Panels**: Full management suites.";
  }
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "// resume\nYou can download my official CV here: [download_cv.pdf](/Aadarsh-cv.pdf).";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("phone")) {
    return "// contact info\n- **Email**: [aadarshkumarman@gmail.com](mailto:aadarshkumarman@gmail.com)\n- **Phone**: +977-9806814329\n- **GitHub**: [github.com/aadik6](https://github.com/aadik6)\n- **LinkedIn**: [Aadarsh Kushwaha](https://www.linkedin.com/in/aadarsh-kushwaha-09a9451b4/)";
  }
  return "// response\nI can share details about Aadarsh's full-stack development, projects, skills, or resume. Select one of the quick prompts below or ask directly!";
};

const MessageIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
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
          body: JSON.stringify({ prompt: query }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend response error");
      }

      const data = await response.json();
      const replyText = data.response || getLocalFallbackResponse(query);

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      const fallback = getLocalFallbackResponse(query);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: fallback,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputText("");
  };

  const copyToClipboard = (text, type, id) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "code") {
        setCopiedCodeIndex(id);
        setTimeout(() => setCopiedCodeIndex(null), 2000);
      } else {
        setCopiedMessageIndex(id);
        setTimeout(() => setCopiedMessageIndex(null), 2000);
      }
    }
  };

  const renderFormattedContent = (content, messageId) => {
    if (content.includes("```")) {
      const parts = content.split("```");
      return (
        <div className="tw-bg-transparent">
          {parts.map((part, index) => {
            if (index % 2 === 0) {
              return renderTextWithMarkdown(part, `${messageId}-part-${index}`);
            } else {
              const lines = part.trim().split("\n");
              const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : "";
              const code = language ? lines.slice(1).join("\n") : part;
              const codeId = `${messageId}-code-${index}`;

              return (
                <div key={index} className="ai-code-block">
                  {language && <div className="code-language">{language}</div>}
                  <button
                    type="button"
                    className="copy-code-button"
                    onClick={() => copyToClipboard(code, "code", codeId)}
                  >
                    <i className={copiedCodeIndex === codeId ? "ri-check-line tw-text-[#43D9AD]" : "ri-file-copy-line"}></i>
                    <span>{copiedCodeIndex === codeId ? "copied" : "copy"}</span>
                  </button>
                  <pre>
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }
          })}
        </div>
      );
    }
    return renderTextWithMarkdown(content, messageId);
  };

  const renderTextWithMarkdown = (text, keyPrefix) => {
    const lines = text.split("\n");
    return (
      <div key={keyPrefix} className="tw-space-y-1.5 tw-bg-transparent">
        {lines.map((line, lIdx) => {
          if (!line.trim()) {
            return <div key={lIdx} className="tw-h-1 tw-bg-transparent" />;
          }

          if (line.trim().startsWith("//")) {
            return (
              <p key={lIdx} className="tw-text-[#607B96] tw-text-xs tw-font-mono tw-bg-transparent">
                {line}
              </p>
            );
          }

          if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
            const cleanText = line.trim().substring(2);
            return (
              <div key={lIdx} className="tw-flex tw-items-start tw-gap-2 tw-bg-transparent">
                <span className="tw-text-[#E99287] tw-text-xs tw-leading-5 tw-bg-transparent">▹</span>
                <span className="tw-flex-1 tw-text-[12.5px] tw-leading-relaxed tw-text-[#wheat] tw-bg-transparent" style={{ color: "wheat" }}>
                  {parseInlineFormatting(cleanText)}
                </span>
              </div>
            );
          }

          const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            return (
              <div key={lIdx} className="tw-flex tw-items-start tw-gap-2 tw-bg-transparent">
                <span className="tw-text-[#FEA55F] tw-font-mono tw-text-xs tw-mt-0.5 tw-bg-transparent">
                  {numMatch[1]}.
                </span>
                <span className="tw-flex-1 tw-text-[12.5px] tw-leading-relaxed tw-bg-transparent" style={{ color: "wheat" }}>
                  {parseInlineFormatting(numMatch[2])}
                </span>
              </div>
            );
          }

          return (
            <p key={lIdx} className="tw-text-[12.5px] tw-leading-relaxed tw-bg-transparent" style={{ color: "wheat" }}>
              {parseInlineFormatting(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const parseInlineFormatting = (str) => {
    const parts = [];
    let remaining = str;
    let keyIdx = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
      const linkMatch = remaining.match(/^(.*?)\[(.+?)\]\((.+?)\)(.*)$/);
      const codeMatch = remaining.match(/^(.*?)`(.+?)`(.*)$/);

      let firstType = null;
      let firstIndex = Infinity;

      if (boldMatch && boldMatch[1].length < firstIndex) {
        firstType = "bold";
        firstIndex = boldMatch[1].length;
      }
      if (linkMatch && linkMatch[1].length < firstIndex) {
        firstType = "link";
        firstIndex = linkMatch[1].length;
      }
      if (codeMatch && codeMatch[1].length < firstIndex) {
        firstType = "code";
        firstIndex = codeMatch[1].length;
      }

      if (firstType === "bold") {
        if (boldMatch[1]) parts.push(<span key={keyIdx++} className="tw-bg-transparent">{boldMatch[1]}</span>);
        parts.push(
          <strong key={keyIdx++} className="tw-text-white tw-font-semibold tw-bg-transparent">
            {boldMatch[2]}
          </strong>
        );
        remaining = boldMatch[3];
      } else if (firstType === "link") {
        if (linkMatch[1]) parts.push(<span key={keyIdx++} className="tw-bg-transparent">{linkMatch[1]}</span>);
        parts.push(
          <a
            key={keyIdx++}
            href={linkMatch[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-[#43D9AD] hover:tw-underline tw-bg-transparent"
          >
            {linkMatch[2]} <i className="ri-external-link-line tw-text-[10px] tw-bg-transparent"></i>
          </a>
        );
        remaining = linkMatch[4];
      } else if (firstType === "code") {
        if (codeMatch[1]) parts.push(<span key={keyIdx++} className="tw-bg-transparent">{codeMatch[1]}</span>);
        parts.push(
          <code
            key={keyIdx++}
            className="tw-bg-[#011221] tw-text-[#ccb42d] tw-border tw-border-[#1E2D3D] tw-px-1.5 tw-py-0.5 tw-rounded tw-text-xs tw-font-mono"
          >
            {codeMatch[2]}
          </code>
        );
        remaining = codeMatch[3];
      } else {
        parts.push(<span key={keyIdx++} className="tw-bg-transparent">{remaining}</span>);
        break;
      }
    }

    return parts;
  };

  return (
    <>
      {/* Floating Chat Trigger Button - Matching Original Design */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
        className="chat-button tw-fixed tw-bottom-14 tw-right-6 tw-bg-gradient-to-r tw-from-[#43D9AD] tw-to-[#4D5BCE] tw-rounded-full tw-w-12 tw-h-12 tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-z-50 hover:tw-scale-110 tw-transition-all tw-duration-300"
      >
        <i
          className={`${
            isOpen ? "ri-close-line" : "ri-message-3-line"
          } tw-text-white tw-text-2xl tw-bg-transparent`}
        ></i>
        {!isOpen && <span className="pulse-animation"></span>}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Assistant Chat"
          className="tw-fixed tw-bottom-28 tw-right-4 sm:tw-right-6 tw-z-50 tw-w-[calc(100vw-32px)] sm:tw-w-[410px]"
        >
          <div className="ai-chat-container">
            {/* Header: Exact Portfolio Style */}
            <div className="tw-bg-[#011627] tw-px-4 tw-py-3 tw-border-b tw-border-[#1E2D3D] tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-items-center tw-gap-2.5 tw-bg-transparent">
                <i className="ri-robot-2-line tw-text-[#43D9AD] tw-text-lg tw-bg-transparent"></i>
                <div className="tw-bg-transparent">
                  <h3 className="tw-text-white tw-text-sm tw-font-mono tw-bg-transparent">
                    _ai-assistant
                  </h3>
                  <p className="tw-text-[#607B96] tw-text-[10px] tw-flex tw-items-center tw-gap-1.5 tw-bg-transparent">
                    <span className="online-dot"></span>
                    <span className="tw-text-[#43D9AD] tw-bg-transparent">
                      {isTyping ? "typing..." : "online"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-gap-1 tw-bg-transparent">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="tw-text-[#607B96] hover:tw-text-[#43D9AD] tw-p-1.5 tw-rounded tw-transition-colors tw-bg-transparent"
                >
                  <i className="ri-refresh-line tw-text-base tw-bg-transparent"></i>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="tw-text-[#607B96] hover:tw-text-[#E99287] tw-p-1.5 tw-rounded tw-transition-colors tw-bg-transparent"
                >
                  <i className="ri-close-line tw-text-lg tw-bg-transparent"></i>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-3.5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message-item tw-flex ${
                    message.sender === "user" ? "tw-justify-end" : "tw-justify-start"
                  }`}
                >
                  <div
                    className={`tw-max-w-[86%] tw-p-3 tw-rounded-[6px] tw-text-left tw-relative group ${
                      message.sender === "user"
                        ? "tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] tw-text-white"
                        : "tw-bg-[#011221] tw-border tw-border-[#1E2D3D]"
                    }`}
                  >
                    <div className="tw-bg-transparent">
                      {renderFormattedContent(message.text, message.id)}
                    </div>

                    <div className="tw-flex tw-items-center tw-justify-between tw-mt-2 tw-pt-1.5 tw-border-t tw-border-[#1E2D3D] tw-text-[10px] tw-text-[#607B96] tw-bg-transparent">
                      <span className="tw-bg-transparent">
                        {message.sender === "user" ? "_you" : "_assistant"} • {message.time}
                      </span>
                      {message.sender === "ai" && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(message.text, "message", message.id)}
                          className="hover:tw-text-[#43D9AD] tw-bg-transparent tw-flex tw-items-center tw-gap-1 tw-opacity-70 group-hover:tw-opacity-100 tw-transition-opacity"
                          title="Copy text"
                        >
                          <i
                            className={
                              copiedMessageIndex === message.id
                                ? "ri-check-line tw-text-[#43D9AD]"
                                : "ri-file-copy-line"
                            }
                          ></i>
                          <span className="tw-bg-transparent">
                            {copiedMessageIndex === message.id ? "copied" : "copy"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="chat-message-item tw-flex tw-justify-start">
                  <div className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-px-3 tw-py-2 tw-rounded-[6px] tw-flex tw-items-center tw-gap-2">
                    <div className="typing-indicator tw-bg-transparent">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="tw-text-xs tw-text-[#607B96] tw-font-mono tw-bg-transparent">
                      // thinking...
                    </span>
                  </div>
                </div>
              )}

              {/* Quick suggestion prompt chips */}
              {messages.length === 1 && (
                <div className="tw-pt-2 tw-bg-transparent">
                  <p className="tw-text-[11px] tw-text-[#607B96] tw-mb-2 tw-font-mono tw-bg-transparent">
                    // suggested questions:
                  </p>
                  <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-bg-transparent">
                    {QUICK_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(item.prompt)}
                        className="quick-prompt-btn"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="tw-p-3 tw-bg-[#011627] tw-border-t tw-border-[#1E2D3D]">
              <form onSubmit={handleFormSubmit} className="tw-flex tw-items-center tw-gap-2 tw-bg-transparent">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="type a question..."
                  disabled={isTyping}
                  className="ai-chat-input tw-flex-1"
                />
                <button
                  type="submit"
                  disabled={inputText.trim() === "" || isTyping}
                  className="tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-rounded-[5px] tw-h-[36px] tw-px-3.5 tw-flex tw-items-center tw-justify-center disabled:tw-opacity-40 tw-transition-all tw-flex-shrink-0"
                  title="Send message"
                >
                  <i className="ri-send-plane-fill tw-text-sm tw-bg-transparent"></i>
                </button>
              </form>

              <div className="tw-flex tw-items-center tw-justify-between tw-mt-2 tw-px-1 tw-text-[10px] tw-text-[#607B96] tw-font-mono tw-bg-transparent">
                <span className="tw-bg-transparent">
                  // powered by aadarsh's ai
                </span>
                <span className="tw-hidden sm:tw-inline tw-bg-transparent">
                  enter to send
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageIcon;
