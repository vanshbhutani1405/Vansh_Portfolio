import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect, useState } from "react";

const projects = [
  {
    name: "PranRakshak AI",
    category: "Healthcare & ML",
    tools: "Python, FastAPI, SQLite, React, SHAP",
    link: "https://github.com/vanshbhutani1405/PRANRAKSHAK_AI",
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
    tools: "Python, Machine Learning, NLP",
    link: "https://github.com/vanshbhutani1405/Quora-Question-Pairs-NLP",
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
    name: "Customer Churn Prediction",
    category: "Deep Learning / ANN",
    tools: "Python, ANN, TensorFlow, Streamlit",
    link: "https://github.com/vanshbhutani1405/Customer-Churn-ANN-Classifier-",
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
    tools: "Python, Flask, Scikit-learn, AWS",
    link: "https://github.com/vanshbhutani1405/End-to-End-ML_Project",
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
    name: "FarmCulture",
    category: "AgriTech",
    tools: "Python, Machine Learning, Data Analysis",
    link: "https://github.com/vanshbhutani1405/FarmCulture",
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
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setColumns(1);
        return;
      }

      if (width <= 1024) {
        setColumns(2);
        return;
      }

      setColumns(3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns, { passive: true });

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);


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
        </div>

        <div
          className="work-flex"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "clamp(16px, 2.2vw, 28px)",
            width: "100%",
            height: "auto",
            margin: 0,
            padding: 0,
            transform: "none",
          }}
        >
          {projects.map((project, index) => (
            <article
              className="work-box"
              key={index}
              style={{
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                padding: "clamp(18px, 2vw, 28px)",
                boxSizing: "border-box",
                borderRight: "none",
                border: "1px solid #363636",
                borderRadius: "18px",
                gap: "14px",
              }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
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
                    {project.tools.split(", ").map((tool, ti) => (
                      <span key={ti} className="work-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
