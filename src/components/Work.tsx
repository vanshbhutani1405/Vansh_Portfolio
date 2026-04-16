import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useCallback } from "react";

gsap.registerPlugin(useGSAP);

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
  const translateXRef = useRef<number>(0);
  const scrollPerStep = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const getScrollProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    return (window.scrollY - start) / translateXRef.current;
  }, []);

  const goToProject = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionStart = window.scrollY + rect.top;
    const targetScroll =
      sectionStart + clampedIndex * scrollPerStep.current;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setActiveIndex(clampedIndex);
  }, []);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
      translateXRef.current = translateX;
      scrollPerStep.current = translateX / (projects.length - 1);
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (projects.length - 1));
          setActiveIndex(idx);
        },
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>

          {/* Navigation controls */}
          <div className="work-nav">
            <div className="work-dots">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`work-dot ${i === activeIndex ? "work-dot--active" : ""}`}
                  onClick={() => goToProject(i)}
                  aria-label={`Go to project ${i + 1}`}
                  id={`work-dot-${i}`}
                  data-cursor="disable"
                />
              ))}
            </div>
            <div className="work-arrows">
              <button
                className="work-arrow-btn"
                onClick={() => goToProject(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                id="work-prev-btn"
                data-cursor="disable"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="work-counter">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                className="work-arrow-btn"
                onClick={() => goToProject(activeIndex + 1)}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
                id="work-next-btn"
                data-cursor="disable"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
