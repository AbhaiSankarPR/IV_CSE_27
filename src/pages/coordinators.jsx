// pages/Coordinators.jsx
import './Coordinators.css';
import pramad from '../assets/pramad.jpg';
import aditya from '../assets/Adithyasuresh.png';

export default function Coordinators() {
  return (
    <div className="coordinators-container">
      <h2>Our Coordinators</h2>
      <p className="intro">
        Meet the teams that keep the IV running smoothly — from logistics to creativity.
      </p>

      <div className="team-group">
        <h3>Main Coordinators</h3>
        <div className="team-grid">
          <div className="member-card">
            <img src={pramad} alt="AdithyanPramad" />
            <p className="name">Adithyan Pramad</p>
          </div>
          <div className="member-card">
            <img src={aditya} alt="Aditya Suresh" />
            <p className="name">Adithya Suresh</p>
          </div>
        </div>
      </div>

      {/* Other teams below */}
      <div className="team-group">
        <h3>Medical Team</h3>
        <p>Responsible for first aid, medical supplies, and traveler health.</p>
      </div>

      <div className="team-group">
        <h3>Finance Team</h3>
        <p>Handles budgeting, payments, and expense tracking.</p>
      </div>

      <div className="team-group">
        <h3>Reels Team</h3>
        <p>Captures the journey, manages media, and keeps everyone entertained.</p>
      </div>
    </div>
  );
}
