import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
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
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "PranRakshak AI",
              category: "Healthcare & ML",
              tools: "Python, FastAPI, SQLite, React, SHAP",
              link: "https://github.com/vanshbhutani1405/PRANRAKSHAK_AI",
              image: "/images/pranrakshak.png",
              desc: "Intelligent hospital command center that continuously monitors patient data and predicts early sepsis risk using machine learning."
            },
            {
              name: "Quora Question Pairs NLP",
              category: "NLP",
              tools: "Python, Machine Learning, NLP",
              link: "https://github.com/vanshbhutani1405/Quora-Question-Pairs-NLP",
              image: "/images/quora.png",
              desc: "Advanced NLP application designed to detect and flag duplicate questions to improve forum quality."
            },
            {
              name: "Customer Churn Prediction",
              category: "ANN",
              tools: "Python, ANN, Machine Learning",
              link: "https://github.com/vanshbhutani1405/Customer-Churn-ANN-Classifier-",
              image: "/images/customer_churn.png",
              desc: "Deep Learning Artificial Neural Network (ANN) model to predict customer attrition and inform retention strategies."
            },
            {
              name: "Student Performance Prediction",
              category: "End-to-End ML",
              tools: "Python, Flask, Machine Learning",
              link: "https://github.com/vanshbhutani1405/End-to-End-ML_Project",
              image: "/images/student_performance.png",
              desc: "Complete end-to-end ML pipeline predicting student mathematics scores based on demographic and academic factors."
            },
            {
              name: "FarmCulture",
              category: "AgriTech",
              tools: "Python, Machine Learning, Data Analysis",
              link: "https://github.com/vanshbhutani1405/FarmCulture",
              image: "/images/farmculture.png",
              desc: "AI-powered ecosystem providing intelligent crop recommendations and personalized farming companions for sustainable harvests."
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p style={{ marginTop: "-10px", marginBottom: "20px" }}>{project.desc}</p>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
