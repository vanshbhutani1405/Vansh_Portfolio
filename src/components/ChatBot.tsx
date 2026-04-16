import { useState, useRef, useEffect } from "react";
import "./styles/ChatBot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Vansh's personal AI assistant on his portfolio website. Your job is to help visitors learn about Vansh Bhutani in a friendly, professional, and concise manner.

Here is everything you know about Vansh:

## Personal Info
- Name: Vansh Bhutani
- Role: AI/ML Engineer & CS Undergraduate
- University: IKGPTU (IKG Punjab Technical University), graduating 2027
- CGPA: 8.65/10
- Location: India
- Email: vanshbhutani2005@gmail.com
- Phone: +91 78888 45986

## Specializations
- Machine Learning & Deep Learning
- Generative AI & RAG systems
- Natural Language Processing (NLP)
- End-to-end ML pipelines
- Explainable AI (XAI)

## Technical Skills
- Languages: Python, JavaScript, TypeScript, SQL
- ML Frameworks: PyTorch, TensorFlow, Scikit-learn, Keras
- AI/GenAI: LangChain, RAG, LLMs (GPT, Llama, etc.), HuggingFace
- Data: Pandas, NumPy, Matplotlib, Seaborn, SHAP
- Backend: FastAPI, Flask
- Frontend: React, Three.js, GSAP
- DevOps: Docker, Git, Vercel, Render

## Projects
1. **PranRakshak AI** (Healthcare & ML) - Intelligent hospital command center that continuously monitors patient data and predicts early sepsis risk using ML.
   - Tools: Python, FastAPI, SQLite, React, SHAP
   - GitHub: https://github.com/vanshbhutani1405/PRANRAKSHAK_AI

2. **Quora Question Pairs NLP** (NLP) - Advanced NLP application to detect and flag duplicate questions to improve forum quality.
   - Tools: Python, Machine Learning, NLP
   - GitHub: https://github.com/vanshbhutani1405/Quora-Question-Pairs-NLP

3. **Customer Churn Prediction** (Deep Learning / ANN) - ANN model to predict customer attrition and inform retention strategies.
   - Tools: Python, ANN, Machine Learning
   - GitHub: https://github.com/vanshbhutani1405/Customer-Churn-ANN-Classifier-

4. **Student Performance Prediction** (End-to-End ML) - Complete ML pipeline predicting student mathematics scores based on demographics and academic factors.
   - Tools: Python, Flask, Machine Learning
   - GitHub: https://github.com/vanshbhutani1405/End-to-End-ML_Project

5. **FarmCulture** (AgriTech) - AI-powered ecosystem providing intelligent crop recommendations and personalized farming companions for sustainable farming.
   - Tools: Python, Machine Learning, Data Analysis
   - GitHub: https://github.com/vanshbhutani1405/FarmCulture

## Target Roles
- AI Engineer
- AI Consultant
- AI/ML Engineer
- ML Engineer / Data Scientist
- AI Product Manager

## Social Links
- GitHub: https://github.com/vanshbhutani1405
- LinkedIn: https://linkedin.com/in/vansh-62b84a184
- Kaggle: https://kaggle.com/vanshbhutani
- LeetCode: https://leetcode.com/u/vansh1405/

## Behavior Rules
- Be concise and helpful (2-4 sentences max unless detail is needed)
- Be professional yet friendly
- If asked something you don't know about Vansh, say you're not sure and suggest contacting him directly
- Never make up information about Vansh that isn't in this prompt
- Always refer to him as "Vansh" (not "the user")
- If visitors want to hire or collaborate, encourage them to reach out via email
`;

const SUGGESTED_QUESTIONS = [
  "What projects has Vansh built?",
  "What are his skills?",
  "How can I contact him?",
  "Is he open to internships?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Vansh's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    setShowSuggestions(false);
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: messageText },
            ],
            max_tokens: 400,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.choices[0]?.message?.content ||
          "Sorry, I couldn't process that. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try contacting Vansh directly at vanshbhutani2005@gmail.com 😊",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <div className={`chatbot-panel ${isOpen ? "chatbot-panel--open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <span>V</span>
              <div className="chatbot-status-dot" />
            </div>
            <div>
              <h4>Vansh's Assistant</h4>
              <span>Powered by Groq · Llama 3.3</span>
            </div>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            id="chatbot-close-btn"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chatbot-message chatbot-message--${msg.role}`}
            >
              {msg.role === "assistant" && (
                <div className="chatbot-msg-avatar">AI</div>
              )}
              <div className="chatbot-bubble">{msg.content}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chatbot-message chatbot-message--assistant">
              <div className="chatbot-msg-avatar">AI</div>
              <div className="chatbot-bubble chatbot-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && messages.length === 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  className="chatbot-suggestion-btn"
                  onClick={() => sendMessage(q)}
                  id={`chatbot-suggestion-${i}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask me anything about Vansh..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            id="chatbot-input"
            data-cursor="disable"
          />
          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            id="chatbot-send-btn"
            data-cursor="disable"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        className={`chatbot-toggle-btn ${isOpen ? "chatbot-toggle-btn--open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle chatbot"
        id="chatbot-toggle-btn"
        data-cursor="disable"
      >
        {/* Chat icon */}
        <svg
          className="chatbot-icon chatbot-icon--chat"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Close icon */}
        <svg
          className="chatbot-icon chatbot-icon--close"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Pulse ring */}
        {!isOpen && <span className="chatbot-pulse" />}
      </button>
    </>
  );
};

export default ChatBot;
