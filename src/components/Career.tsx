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
                <h4>Data Processing Mentor</h4>
                <h5>ASU Admission Services</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Managed and processed 100+ applicant records and mentored prospective students utilizing the PeopleSoft CRM,
              significantly improving data processing accuracy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Remote Team Lead</h4>
                <h5>Viral Fission</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Directed a cross-functional team of 7 in executing digital engagement campaigns for enterprise clients.
              Analyzed campaign performance to refine target audience strategies,
              driving a 20% increase in engagement.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Engineering Camp Guide</h4>
                <h5>C2 in E2</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Guided freshmen in engineering camp, enhancing leadership and teamwork skills.
              Supported new students, fostering a collaborative learning environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
