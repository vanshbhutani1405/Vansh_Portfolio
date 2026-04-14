import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Computer Science undergraduate (CGPA 8.65/10, IKGPTU, 2027) specializing in Machine Learning, Generative AI, and
          real-world deployed systems. Experienced in building production-ready ML pipelines, RAG systems, and explainable AI
          models. Seeking AI/ML or Data Science internships.
        </p>
        <div className="about-roles">
          <h4>Targeting Roles</h4>
          <div className="roles-flex">
            <span className="role-tag">AI Engineer</span>
            <span className="role-tag">AI Consultant</span>
            <span className="role-tag">AI/ML Engineer</span>
            <span className="role-tag">ML Engineer / Data Scientist</span>
            <span className="role-tag">AI Product Manager</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
