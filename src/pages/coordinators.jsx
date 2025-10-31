import pramad from "../assets/pramad.jpg";
import sura from "../assets/Adithyasuresh.png";

export default function Coordinators() {
  return (
    <div className="bg-dark-primary text-white min-h-screen py-16 px-8 max-w-4xl mx-auto">
      <h2 className="text-center mb-8 text-3xl font-semibold">
        Our Coordinators
      </h2>
      <p className="text-center text-text-mid mb-12">
        Meet the teams that keep the IV running smoothly — from logistics to
        creativity.
      </p>

      {/* Team Group: Main Coordinators */}
      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Main Coordinators
        </h3>
        <div className="flex gap-8 flex-wrap justify-center mt-6">
          <div className="p-4 rounded-xl text-center w-[150px] transition-transform duration-200 ease-in-out hover:-translate-y-1.5">
            <img
              src={pramad}
              alt="Adithyan Pramad"
              className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
            />
            <p className="text-white font-semibold text-sm text-center">
              Adithyan Pramad
            </p>
          </div>
          <div className="p-4 rounded-xl text-center w-[150px] transition-transform duration-200 ease-in-out hover:-translate-y-1.5">
            <img
              src={sura}
              alt="Aditya Suresh"
              className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
            />
            <p className="text-white font-semibold text-sm text-center">
              Adithya Suresh
            </p>
          </div>
        </div>
      </div>

      {/* Other teams below */}
      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Medical Team
        </h3>
        <p className="text-text-light">
          Responsible for first aid, medical supplies, and traveler health.
        </p>
      </div>

      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Finance Team
        </h3>
        <p className="text-text-light">
          Handles budgeting, payments, and expense tracking.
        </p>
      </div>

      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Reels Team
        </h3>
        <p className="text-text-light">
          Captures the journey, manages media, and keeps everyone entertained.
        </p>
      </div>
    </div>
  );
}
