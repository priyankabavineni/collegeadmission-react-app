import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <section className="aboutus-hero" role="banner" aria-label="About Our College">
        <div className="overlay">
          <div className="hero-text">
            <h1>Explore Campus life</h1>
            <p>Empowering students through academic excellence and innovation since 1995.</p>
          </div>
        </div>
      </section>

      <main className="aboutus-main" role="main">
        <div className="container">
          <article className="aboutus-content">
            <section className="text" aria-labelledby="who-we-are">
              <h2 id="who-we-are">Who We Are</h2>
              <p>
                Established in 1995, our college has become a beacon of quality education and innovation. We are committed to developing global citizens with strong academic foundations, critical thinking skills, and leadership potential.
              </p>

              <h3>Our Mission</h3>
              <p>
                To nurture talent and shape future leaders through excellence in teaching, research, and community engagement.
              </p>

              <h3>Our Vision</h3>
              <p>
                To be a nationally and globally recognized institution for transformative education and social impact.
              </p>

              <h3>Why Choose Us?</h3>
              <ul>
                <li>Ranked among top institutions in India</li>
                <li>Industry-aligned curriculum</li>
                <li>World-class infrastructure</li>
                <li>Active research and innovation centers</li>
                <li>Global alumni network and strong placement support</li>
              </ul>
            </section>

            <figure className="image">
              <img src="/assets/about-college.jpg" alt="College Campus" loading="lazy" />
              <figcaption className="sr-only">Image of the college campus</figcaption>

              <div className="image-cards">
                <div className="card">
                  <img
                    src="https://www.kluniversity.in/img/campuslife/library01.jpg"
                    alt="College Library"
                    loading="lazy"
                  />
                  <figcaption>College Library</figcaption>
                </div>
                <div className="card">
                  <img
                    src="https://www.kluniversity.in/iqac/assets/images/klbts.jpeg"
                    alt="Research Center"
                    loading="lazy"
                  />
                  <figcaption>Research Center</figcaption>
                </div>
              </div>
            </figure>
          </article>
        </div>
      </main>

      <section className="aboutus-cta" role="region" aria-label="Call to Action">
        <div className="container">
          <h2>Ready to Begin Your Journey?</h2>
          <p>Explore our programs and discover what makes our college the right place for you.</p>
          <a href="/careeropportunities" className="btn" role="button">
            Visit Career Opportunities
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
