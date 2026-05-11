import "./styles/Work.css";
import WorkImage from "./WorkImage";
interface Project {
  name: string;
  category: string;
  tools: string[];
  image: string;
  desc: string;
  highlights: string[];
  githubLink: string;
  liveLink?: string;
  status?: "in-development";
}

const projects: Project[] = [
  {
    name: "PranRakshak AI",
    category: "Healthcare & ML",
    tools: ["Python", "FastAPI", "SQLite", "React", "SHAP"],
    githubLink: "https://github.com/vanshbhutani1405/PRANRAKSHAK_AI",
    liveLink: "https://pranrakshak-ai.vercel.app/",
    image: "/images/pranrakshak.png",
    desc: "Intelligent hospital command center that continuously monitors patient vitals and predicts early sepsis risk using machine learning — enabling proactive, life-saving clinical decisions.",
    highlights: [
      "Real-time patient vitals monitoring dashboard",
      "SHAP-powered explainable AI for clinical transparency",
      "Sepsis risk prediction with early alert system",
      "FastAPI REST backend + React frontend",
    ],
  },
  {
    name: "Quora Question Pairs NLP",
    category: "NLP",
    tools: ["Python", "Machine Learning", "NLP"],
    githubLink: "https://github.com/vanshbhutani1405/Quora-Question-Pairs-NLP",
    liveLink: "https://quora-question-pairs-nlp.streamlit.app",
    image: "/images/quora.png",
    desc: "Advanced NLP pipeline that detects semantically duplicate questions on forum platforms — improving content quality and reducing redundancy at scale.",
    highlights: [
      "Feature engineering on 400K+ question pairs",
      "TF-IDF, token overlap & fuzzy-matching features",
      "XGBoost classifier with hyperparameter tuning",
      "Deployed with interactive prediction interface",
    ],
  },
  {
    name: "Customer Churn ANN Classifier",
    category: "Deep Learning / ANN",
    tools: ["Python", "ANN", "TensorFlow", "Streamlit"],
    githubLink: "https://github.com/vanshbhutani1405/Customer-Churn-ANN-Classifier-",
    liveLink: "https://customer-churn-ann-classifier-vansh.streamlit.app",
    image: "/images/customer_churn.png",
    desc: "Deep Learning ANN model that predicts customer attrition with high accuracy — empowering businesses to identify at-risk customers and drive targeted retention strategies.",
    highlights: [
      "Multi-layer ANN with dropout regularization",
      "Label & one-hot encoding for categorical features",
      "TensorBoard integration for training visualization",
      "Streamlit app for live churn probability prediction",
    ],
  },
  {
    name: "Student Performance Prediction",
    category: "End-to-End ML",
    tools: ["Python", "Flask", "Scikit-learn", "AWS"],
    githubLink: "https://github.com/vanshbhutani1405/End-to-End-ML_Project",
    liveLink: "https://vansh-end-to-end-ml.onrender.com",
    image: "/images/student_performance.png",
    desc: "Production-grade end-to-end ML pipeline that predicts student math scores from demographic and academic factors — with full CI/CD, modular architecture, and cloud deployment.",
    highlights: [
      "Modular ML pipeline with automated training workflow",
      "Model selection across 10+ regression algorithms",
      "Flask web app with live prediction API",
      "Deployed on render",
    ],
  },
  {
    name: "RAGify",
    category: "Generative AI / RAG",
    tools: ["Python", "LangChain", "Vector DB", "LLMs", "FastAPI"],
    githubLink: "https://github.com/vanshbhutani1405/RAGify",
    image: "/images/ragify-coming-soon.webp",
    status: "in-development",
    desc: "Retrieval-augmented generation platform for domain-specific knowledge assistants with context-aware responses and scalable ingestion workflows.",
    highlights: [
      "Document ingestion pipeline for structured and unstructured data",
      "Hybrid retrieval strategy for higher answer relevance",
      "Conversation-aware prompt orchestration",
      "Designed for production-ready enterprise AI assistants",
    ],
  },
  {
    name: "FarmCulture",
    category: "AgriTech",
    tools: ["Python", "Machine Learning", "Data Analysis"],
    githubLink: "https://github.com/vanshbhutani1405/FarmCulture",
    image: "/images/farmculture.png",
    desc: "AI-powered agri-tech ecosystem that recommends optimal crops based on soil and climate data — bridging the gap between data science and sustainable farming.",
    highlights: [
      "Crop recommendation engine trained on soil & weather data",
      "Multi-model ensemble for higher accuracy",
      "Personalized farming report",
      "Data-driven insights for maximizing crop yield",
    ],
  },
];

const Work = () => {
  return (
    <div
      className="work-section"
      id="work"
      style={{
        height: "auto",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      <div
        className="work-container section-container"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(16px, 2.5vw, 32px)",
          boxSizing: "border-box",
          height: "auto",
        }}
      >
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <p>
            Production-focused AI/ML projects built for real users, measurable impact,
            and scalable deployment.
          </p>
        </div>

        <div className="work-flex">
          {projects.map((project, index) => (
            <article className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.status === "in-development" && (
                  <div className="work-status" role="status" aria-live="polite">
                    <span className="work-status-dot" aria-hidden="true" />
                    In Development
                  </div>
                )}
                <p className="work-desc">{project.desc}</p>

                {/* Highlights */}
                <ul className="work-highlights">
                  {project.highlights.map((h, hi) => (
                    <li key={hi}>{h}</li>
                  ))}
                </ul>

                <div className="work-tools-row">
                  <h4>Tools</h4>
                  <div className="work-tool-tags">
                    {project.tools.map((tool) => (
                      <span key={tool} className="work-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="work-cta-row">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="work-cta work-cta-primary"
                      data-cursor="disable"
                      aria-label={`Open live demo for ${project.name}`}
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="work-cta work-cta-secondary"
                    data-cursor="disable"
                    aria-label={`Open GitHub repository for ${project.name}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
