import React, { useState } from "react";
import "./Home.css";
import admissionImage from "../assets/admission-right.jpg";
import accenture from "../assets/accenture.jpg";
import amazon from "../assets/amazon.jpg";
import deloitte from "../assets/deloitte.jpg";
import google from "../assets/google.jpg";
import hcl from "../assets/hcl.jpg";
import hsbc from "../assets/HSBC.jpg";
import ibm from "../assets/ibm.jpg";
import life1 from "../assets/life1.jpg";
import life2 from "../assets/life2.jpg";
import life3 from "../assets/life3.jpg";
import life4 from "../assets/life4.jpg";
import life5 from "../assets/life5.jpg";
import life6 from "../assets/life6.jpg";
import helpdeskImg from "../assets/helpdesk.jpg";
import heroImage from "../assets/hero-image.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";





const programsData = {
  Vijayawada: {
    Engineering: {
      btech: [
        "Artificial Intelligence & Data Science",
        "Bio Technology",
        "Civil Engineering",
        "Computer Science & Engineering",
        "Computer Science & Information Technology",
      ],
      lateralEntry: [
        "Artificial Intelligence & Data Science",
        "Bio Technology",
        "Civil Engineering",
        "Computer Science & Engineering",
        "Computer Science & Information Technology",
      ],
      mtech: [
        "Structural Engineering",
        "Power Electronics & Electrical Drives",
        "Software Engineering",
        "Computer Science & Engineering",
        "Embedded Systems",
      ],
    },
  },
  Hyderabad: {
    Engineering: {
      btech: [
        "Electrical Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
      ],
      lateralEntry: [
        "Electrical Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
      ],
      mtech: [
        "VLSI Design",
        "Computer Science & Engineering",
        "Power Systems",
      ],
    },
  },
};

const disciplines = [
  "Engineering",
  "Management",
  "Law",
  "Science",
  "Pharmacy",
  "Arts",
  "Commerce",
];

const Home = () => {
  const [selectedCampus, setSelectedCampus] = useState("Vijayawada");
  const [selectedDiscipline, setSelectedDiscipline] = useState("Engineering");
  const [activeExamTab, setActiveExamTab] = useState("info");

  const campusData = programsData[selectedCampus] || {};
  const disciplinePrograms = campusData[selectedDiscipline] || null;

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-top">
          <h1>Welcome to NDP Portal</h1>
          <div className="contact-info">
            <p><strong>Helpline:</strong> +91 9876543210</p>
            <p><strong>Email:</strong> ndp@gmail.com</p>
          </div>
        </div>

        <div className="image-marquee">
          <div className="image-track">
            <img src={img1} alt="Education 1" />
            <img src={img2} alt="Education 2" />
            <img src={img3} alt="Education 3" />
            <img src={heroImage} alt="Hero" />

            {/* Duplicate for infinite loop */}
            <img src={img1} alt="Education 1 Duplicate" />
            <img src={img2} alt="Education 2 Duplicate" />
            <img src={img3} alt="Education 3 Duplicate" />
            <img src={heroImage} alt="Hero Duplicate" />
          </div>
        </div>

        
        
      </section>



      {/* Admission Information Section */}
      <section className="info-wrapper">
        <div className="info-text">
          <h2>B.Tech, UG & PG Admissions 2025–26 AY</h2>

          <div className="info-block">
            <h3>Online Application Process</h3>
            <p>
              Admission to NDP University is based on a valid score
              in either NDP-ENG (B.Tech), NDP-CET (B.Tech Lateral Entry), or NDP-MGMT
              (Management), an in-house NDP University entrance exam. Aside from
              engineering and management programs, the admission process is based
              on merit score followed by the Personal Interview (PI) round.
            </p>
          </div>

          <div className="info-block">
            <h3>Everything you need to know</h3>
            <ol>
              <li>
                The online application form is for admission into different
                programs offered at NDP University in Hyderabad and Vijayawada.
              </li>
              <li>Application Fee is Rs.1500/- and it is Non-Refundable.</li>
              <li>Please submit a working Email ID for all future correspondence.</li>
              <li>NRI/PIO/OCI candidates are also eligible to apply.</li>
              <li>
                You can edit your application form except for your Email ID and
                mobile number.
              </li>
              <li>
                Your choice of program preference is for statistical purposes
                only. The final decision on the program choice will be made
                during counseling.
              </li>
              <li>
                Entrance Exam, counseling, and course commencement dates will
                be scheduled as per the Government norms.
              </li>
            </ol>
          </div>
        </div>

        <div className="info-image">
          <img
            src={admissionImage}
            alt="Admissions Poster"
            className="admission-img"
          />
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="how-to-apply">
        <h2>How to Apply?</h2>
        <p className="subtitle">Steps to Follow</p>

        <div className="steps-container">
          <div className="step">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3c00c7" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4S8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 
          0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <p className="step-title">Step 1</p>
            <p className="step-text">Register Yourself</p>
          </div>

          <div className="step">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3c00c7" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 
          1.1.9 2 2 2h16c1.1 0 2-.9 
          2-2V6c0-1.1-.9-2-2-2zm0 
          4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <p className="step-title">Step 2</p>
            <p className="step-text">Login with your Email</p>
          </div>

          <div className="step">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3c00c7" viewBox="0 0 24 24">
                <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 
          4h12v2H3v-2zm0 4h8v2H3v-2z"/>
              </svg>
            </div>
            <p className="step-title">Step 3</p>
            <p className="step-text">Fill Application Form Online</p>
          </div>

          <div className="step">
            <div className="icon-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3c00c7" viewBox="0 0 24 24">
                <path d="M21 4H3c-1.1 0-2 .9-2 
          2v12c0 1.1.9 2 2 2h18c1.1 
          0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
          4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <p className="step-title">Step 4</p>
            <p className="step-text">Check Your status:)</p>
          </div>
        </div>
      </section>

      {/* Programs Offered Section */}
      <section className="programs-offered">
        <h2>Programs Offered</h2>
        <p className="programs-description">
          4 Campuses. 320+ programs. 30+ disciplines. One NDP. Here
          Are Our 200+ Industry Centred Programs To Choose From
        </p>

        <div className="campus-tabs">
          {Object.keys(programsData).map((campus) => (
            <button
              key={campus}
              className={selectedCampus === campus ? "active" : ""}
              onClick={() => setSelectedCampus(campus)}
            >
              {campus}
            </button>
          ))}
        </div>

        <div className="discipline-tags">
          {disciplines.map((discipline) => (
            <button
              key={discipline}
              onClick={() => setSelectedDiscipline(discipline)}
              className={selectedDiscipline === discipline ? "active" : ""}
              style={{
                margin: "0 0.3rem",
                padding: "0.4rem 1rem",
                borderRadius: "20px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: selectedDiscipline === discipline ? "#3c00c7" : "#eee",
                color: selectedDiscipline === discipline ? "white" : "#555",
                fontSize: "0.9rem",
              }}
            >
              {discipline}
            </button>
          ))}
        </div>

        <div className="program-lists">
          {selectedDiscipline === "Engineering" && disciplinePrograms ? (
            <>
              <div className="program-list">
                <h3>B.Tech Programs</h3>
                <ul>
                  {disciplinePrograms.btech.map((prog) => (
                    <li key={prog}>{prog}</li>
                  ))}
                </ul>
              </div>

              <div className="program-list">
                <h3>B.Tech Lateral Entry Programs</h3>
                <ul>
                  {disciplinePrograms.lateralEntry.map((prog) => (
                    <li key={prog}>{prog}</li>
                  ))}
                </ul>
              </div>

              <div className="program-list">
                <h3>M.Tech Programs</h3>
                <ul>
                  {disciplinePrograms.mtech.map((prog) => (
                    <li key={prog}>{prog}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p style={{ padding: "1rem", fontStyle: "italic" }}>
              No programs available for <b>{selectedDiscipline}</b> at{" "}
              <b>{selectedCampus}</b> campus currently.
            </p>
          )}
        </div>
      </section>

      {/* Entrance Exams Section */}
      <div className="exam-section">
        <h2 className="exam-title">Entrance Exams Details</h2>

        <div className="exam-tabs">
          <button
            className={`tab-button ${activeExamTab === "info" ? "active" : ""}`}
            onClick={() => setActiveExamTab("info")}
          >
            Exams Info
          </button>
          <button
            className={`tab-button ${activeExamTab === "eligibility" ? "active" : ""}`}
            onClick={() => setActiveExamTab("eligibility")}
          >
            Eligibility
          </button>
          <button
            className={`tab-button ${activeExamTab === "syllabus" ? "active" : ""}`}
            onClick={() => setActiveExamTab("syllabus")}
          >
            Syllabus and Pattern
          </button>
        </div>

        {activeExamTab === "info" && (
          <div className="tab-content active">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Phase - I</th>
                  <th>Phase - II</th>
                  <th>Phase - III</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Last Date of Application Submission</td>
                  <td>4th December 2024</td>
                  <td>5th February 2025</td>
                  <td>26th March 2025</td>
                </tr>
                <tr>
                  <td>Issue of Online Admit Cards</td>
                  <td>5th December 2024</td>
                  <td>6th February 2025</td>
                  <td>26th March 2025</td>
                </tr>
                <tr>
                  <td>Exam Date</td>
                  <td>6th to 8th December 2024</td>
                  <td>7th to 9th February 2025</td>
                  <td>23rd to 27th March 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeExamTab === "eligibility" && (
          <div id="tab-eligibility-wrapper">
            <div className="tab-content active">
              <h3>B.Tech Admission</h3>
              <ul>
                <li>Pass in 10+2 or equivalent with minimum 60% aggregate in PCM or PCB.</li>
                <li>Eligible for all B.Tech programs including Bio-Technology.</li>
              </ul>
              <h3>B.Arch</h3>
              <ul>
                <li>10+2 with above 60% marks and qualified in NATA.</li>
              </ul>
              <h3>B.Pharmacy</h3>
              <ul>
                <li>10+2 with 60% aggregate in PCM/PCB.</li>
              </ul>
            </div>
          </div>
        )}

        {activeExamTab === "syllabus" && (
          <div className="tab-content active">
            <table>
              <thead>
                <tr>
                  <th>Entrance Exam</th>
                  <th>Exam Duration (min)</th>
                  <th>No. of Questions</th>
                  <th>Topics/Syllabus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NDP-ENG</td>
                  <td>180</td>
                  <td>25+25+25</td>
                  <td>Mathematics + Physics + Chemistry</td>
                </tr>
                <tr>
                  <td>NDP-SCI</td>
                  <td>90</td>
                  <td>25</td>
                  <td>Biology + Physics + Chemistry</td>
                </tr>
                <tr>
                  <td>NDP-MGMT</td>
                  <td>90</td>
                  <td>25+20+15+15</td>
                  <td>English + Logical + Quantitative + General Knowledge</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/* Recruiters Section */}
        <section className="recruiters-scroll">
          <h2 className="recruiters-title">Our Top Recruiters</h2>
          <p className="recruiters-description">
            We partnered with 350+ companies to ensure students are equipped with up-to-date skills and secure lucrative campus placements upon completing the course.
          </p>

          <div className="logo-marquee">
            <div className="logo-track">
              <img src={accenture} alt="Accenture" />
              <img src={amazon} alt="Amazon" />
              <img src={deloitte} alt="Deloitte" />
              <img src={google} alt="Google" />
              <img src={hcl} alt="HCL" />
              <img src={hsbc} alt="HSBC" />
              <img src={ibm} alt="IBM" />

              {/* Duplicate for smooth infinite scroll */}
              <img src={accenture} alt="Accenture" />
              <img src={amazon} alt="Amazon" />
              <img src={deloitte} alt="Deloitte" />
              <img src={google} alt="Google" />
              <img src={hcl} alt="HCL" />
              <img src={hsbc} alt="HSBC" />
              <img src={ibm} alt="IBM" />
            </div>
          </div>
        </section>

        {/* Life @ NDP Section */}
        <section className="life-scroll">
          <h2 className="life-title">Life @ NDP</h2>
          <p className="life-description">
            Here you get to experience the most enriching and vibrant campus life while you learn
          </p>

          <div className="life-marquee">
            <div className="life-track">
              <img src={life1} alt="Life 1" />
              <img src={life2} alt="Life 2" />
              <img src={life3} alt="Life 3" />
              <img src={life4} alt="Life 4" />
              <img src={life5} alt="Life 5" />
              <img src={life6} alt="Life 6" />

              {/* Duplicate for infinite scroll */}
              <img src={life1} alt="Life 1 Duplicate" />
              <img src={life2} alt="Life 2 Duplicate" />
              <img src={life3} alt="Life 3 Duplicate" />
              <img src={life4} alt="Life 4 Duplicate" />
              <img src={life5} alt="Life 5 Duplicate" />
              <img src={life6} alt="Life 6 Duplicate" />
            </div>
          </div>
        </section>

        {/* Helpdesk Section */}
        <section className="helpdesk-section">
          <div className="helpdesk-content">
            <div className="helpdesk-text">
              <h3>Have Queries?</h3>
              <p>Our Experts are here<br />To help you with them!</p>
              <button className="enquire-btn">ENQUIRE NOW</button>

              <hr />

              <h4>Admissions Help Desk</h4>
              <p>Monday To Saturday - 9am To 5pm (Except Public Holidays)</p>
              <p>Helpline : +91 9876543210</p>
              <p>Email : ndp@gmail.com</p>
            </div>

            <div className="helpdesk-image">
              <img src={helpdeskImg} alt="Admissions Help Desk" />
            </div>
          </div>
        </section>
        <footer class="site-footer">
          <p>© Copyright 2025 NDP. All rights reserved</p>
        </footer>


      </div>
    </div>

  );
};

export default Home;
