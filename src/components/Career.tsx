import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science and Engineering</h4>
                <h5>IK Gujral Punjab Technical University</h5>
              </div>
              <h3>2023– 2027</h3>
            </div>
            <p>
              CGPA: 8.65 / 10. Specializing in Machine Learning and Generative AI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Machine Learning Intern</h4>
                <h5>EduNet Foundation (AICTE + IBM)</h5>
              </div>
              <h3>Jun 2025– Aug 2025</h3>
            </div>
            <p>
              Completed full ML lifecycle including preprocessing, training, and deployment. Evaluated models using accuracy, F1-score, and cross-validation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder</h4>
                <h5>Upstarts (Technology & Startup Club)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading the Technology & Startup Club. Also serving as Class Representative for CS Department. Finalist at Hack On Hills, top 5 at LPU Hackathon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
