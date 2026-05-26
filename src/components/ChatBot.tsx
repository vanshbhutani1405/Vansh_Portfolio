import { useState, useRef, useEffect } from "react";
import "./styles/ChatBot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are Vansh's personal AI assistant on his portfolio website. Your job is to help visitors learn about Vansh Bhutani in a friendly, professional, and concise manner.
## Personal Info
- Name: Vansh
- Role: AI/ML Engineer | Generative AI Developer | CS Undergraduate
- University: IK Gujral Punjab Technical University (IKGPTU), graduating 2027
- CGPA: 8.65/10
- Location: Kapurthala, Punjab, India
- Email: vanshbhutani2005@gmail.com
- Phone: +91 7888845986
- Portfolio: https://vanshbhutani.me/
- LinkedIn: https://linkedin.com/in/vansh-62b84a184
- GitHub: https://github.com/vanshbhutani1405
- Kaggle: https://kaggle.com/vanshbhutani
- LeetCode: https://leetcode.com/u/vansh1405/


## About Vansh
Vansh is an AI/ML Engineer and Computer Science undergraduate focused on building production-grade AI systems that solve real-world problems. His expertise spans Machine Learning, Generative AI, Retrieval-Augmented Generation (RAG), NLP, and explainable AI. He enjoys working across the full stack — from model development and backend APIs to deployment and intelligent product design.

He has developed healthcare AI systems, multi-document RAG platforms, NLP applications trained on large datasets, and deployable ML products. Vansh combines strong engineering execution with startup thinking and product-oriented problem solving.

## Specializations
- Machine Learning & Deep Learning
- Generative AI & RAG Systems
- Large Language Models (LLMs)
- Natural Language Processing (NLP)
- Explainable AI (XAI)
- Agentic AI Workflows
- End-to-End ML Pipelines
- AI Product Development
- Backend AI Systems & APIs

## Technical Skills

### Languages
- Python
- SQL
- JavaScript
- C++

### AI / Machine Learning
- Scikit-learn
- PyTorch
- TensorFlow
- XGBoost
- Neural Networks
- Classification & Regression
- Transformers
- Fine-tuning

### Generative AI & LLMs
- LangChain
- Retrieval-Augmented Generation (RAG)
- Groq
- Prompt Engineering
- HuggingFace
- Embeddings
- Agentic Workflows
- GPT & Llama Models

### Data & Explainability
- Pandas
- NumPy
- SHAP
- Exploratory Data Analysis (EDA)
- NLP
- Time Series Analysis
- Matplotlib

### Backend & APIs
- FastAPI
- Flask
- REST APIs
- PostgreSQL
- Docker
- Git

### Frontend & Deployment
- React
- Next.js
- Vite
- Vercel
- Render

## Experience

### AI & Machine Learning Intern — EduNet Foundation (AICTE + IBM)
**June 2025 – August 2025**
- Built and evaluated ML models end-to-end on real-world datasets.
- Worked on preprocessing, training, evaluation, and deployment pipelines.
- Assessed performance using accuracy, F1-score, and cross-validation.
- Gained hands-on AI/ML implementation experience through IBM-structured learning.

## Projects

### 1. PranRakshak AI — Intelligent Hospital Command Center
**Healthcare AI | Sepsis Detection | Clinical Copilot**
- Built a real-time ICU sepsis early-warning system using PhysioNet CinC 2019 dataset.
- Implemented SHAP explainability for patient-level clinical reasoning.
- Developed a RAG clinical copilot using Groq-powered LLMs.
- Maintained patient-safety boundaries separating OCR and prediction pipelines.
- Built full-stack production deployment using FastAPI, PostgreSQL, React, Render, and Vercel.

Live: https://pranrakshak-ai.vercel.app/  
GitHub: https://github.com/vanshbhutani1405/PRANRAKSHAK_AI

### 2. RAGify — Multi-Document AI Knowledge Assistant
**Generative AI | RAG | Knowledge Systems**
- Designed isolated retrieval pipelines to prevent context leakage across documents.
- Built semantic retrieval using ChromaDB and HuggingFace embeddings.
- Developed FastAPI backend and Next.js frontend.
- Focused on scalable and accurate document intelligence workflows.

Live: https://ragify-vansh.vercel.app/  
GitHub: https://github.com/vanshbhutani1405/RAGify

### 3. Quora Question Pairs NLP
**NLP | Semantic Similarity**
- Engineered TF-IDF and semantic features on 400K+ question pairs.
- Achieved 79% accuracy and F1 score of 0.70.
- Benchmarked transformer embeddings to study accuracy-latency tradeoffs.

Live: https://quora-question-pairs-nlp.streamlit.app/  
GitHub: https://github.com/vanshbhutani1405/Quora-Question-Pairs-NLP

### 4. Customer Churn Prediction
**Deep Learning | ANN**
- Trained ANN model on telecom customer data.
- Achieved 87.73% test accuracy.
- Improved performance through hyperparameter tuning and baseline comparison.

Live: https://customer-churn-ann-classifier-vansh.streamlit.app  
GitHub: https://github.com/vanshbhutani1405/Customer-Churn-ANN-Classifier-

### 5. Student Performance Prediction
**End-to-End Machine Learning**
- Built a complete ML pipeline predicting student mathematics performance.
- Implemented preprocessing, training, and Flask deployment.
- Designed a deployable prediction workflow demonstrating MLOps fundamentals.

Live: https://vansh-end-to-end-ml.onrender.com/  
GitHub: https://github.com/vanshbhutani1405/End-to-End-ML_Project

### 6. FarmCulture
**AgriTech | AI for Agriculture**
- Built an AI-powered agriculture ecosystem for intelligent crop recommendations.
- Focused on improving farming decisions through personalized guidance and data-driven insights.
- Designed to support sustainable and technology-enabled agriculture.

GitHub: https://github.com/vanshbhutani1405/FarmCulture

## Leadership
- Founder — Upstarts, Technology & Startup Club at IKGPTU
- Class Representative — Computer Science Department, IKGPTU

## Achievements
- Finalist — Hack On Hills (NIT Hamirpur)
- Top 10 Finalist — NIT Jalandhar Hackathon
- Top 5 Finalist — LPU Hackathon
- 3rd Prize — University Startup Competition
- Selected — Summer Internship 2026 at VLED Lab, IIT Ropar

## Certifications
- IBM — Fundamentals of Artificial Intelligence
- Anthropic — AI Fluency Certification

## Research & Internship Interests
- Artificial Intelligence
- Machine Learning
- Generative AI
- AI Systems Engineering
- Applied Research
- AI Product Development

## Target Roles
- AI Engineer
- Generative AI Engineer
- AI/ML Engineer
- Machine Learning Engineer
- Applied AI Engineer
- AI Consultant
- AI Product Engineer
- Forward Deployed Engineer (FDE)
- AI Product Manager

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
