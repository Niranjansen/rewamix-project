const About = () => {
  return (
    <div>
      <div className="page-hero container">
        <h1>Three generations of one family's mithai recipes.</h1>
        <p>
          Rewamix began as a small sweet shop with two halwais and a single
          kadhai. Today we still make everything the same way — pure ghee,
          fresh khoya, and zero shortcuts — just at a scale that can reach
          your doorstep.
        </p>
      </div>

      <div className="container about-grid">
        <div className="about-card">
          <div className="num">01</div>
          <h3>Made fresh daily</h3>
          <p>Every mithai and namkeen is prepared in small batches each morning — nothing sits on a shelf for weeks.</p>
        </div>
        <div className="about-card">
          <div className="num">02</div>
          <h3>Pure ingredients</h3>
          <p>Real desi ghee, fresh khoya, and premium dry fruits — no vanaspati, no artificial preservatives.</p>
        </div>
        <div className="about-card">
          <div className="num">03</div>
          <h3>Hygienic packaging</h3>
          <p>Sealed, food-grade boxes that keep your mithai fresh from our kitchen to your family's table.</p>
        </div>
      </div>

      <div className="container section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <h2>Our journey</h2>
            <p>From one shop counter to your neighbourhood.</p>
          </div>
        </div>
        <div className="about-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="about-card">
            <h3>1991 — The first counter</h3>
            <p>Our founder started with a tiny shop making just Kaju Katli and Motichoor Ladoo for the local market.</p>
          </div>
          <div className="about-card">
            <h3>2005 — Namkeen added</h3>
            <p>Customers kept asking for something savory alongside the sweets, so our namkeen kitchen was born.</p>
          </div>
          <div className="about-card">
            <h3>2016 — Festive gift boxes</h3>
            <p>Curated Diwali and wedding gift boxes became our most-loved offering, shipped across the country.</p>
          </div>
          <div className="about-card">
            <h3>Today</h3>
            <p>Same family recipes, same halwais, now reaching you online — fresh, every time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
