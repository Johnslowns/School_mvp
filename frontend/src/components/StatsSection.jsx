// Inside src/pages/Home.js (or another suitable location)
import Counter from "../components/Counter";


const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stat-box">
        <h3><Counter end={1200} duration={1500} /></h3>
        <p>Students</p>
      </div>
      <div className="stat-box">
        <h3><Counter end={80} duration={1500} /></h3>
        <p>Teachers</p>
      </div>
      <div className="stat-box">
        <h3><Counter end={40} duration={1500} /></h3>
        <p>Staff</p>
      </div>
    </section>
  );
};

export default StatsSection;
