import pramad from "../assets/pramad.jpg";
import sura from "../assets/Adithyasuresh.png";

const coordinators = [
  {
    name: "Adithyan Pramad",
    img: pramad,
    link: "https://www.instagram.com/aadithyan_pramad?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    name: "Adithya Suresh",
    img: sura,
    link: "https://www.instagram.com/ad.thyaaaa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

function PersonCard({ name, img, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="p-4 rounded-xl text-center w-[150px] transition-transform duration-200 ease-in-out hover:-translate-y-1.5 cursor-pointer">
        <img
          src={img}
          alt={name}
          className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
        />
        <p className="text-white font-semibold text-sm text-center">{name}</p>
      </div>
    </a>
  );
}

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
      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] transition-transform duration-200 ease-in-out hover:-translate-y-1">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Main Coordinators
        </h3>
        <div className="flex gap-8 flex-wrap justify-center mt-6">
          {coordinators.map((c, i) => (
            <PersonCard key={i} {...c} />
          ))}
        </div>
      </div>

      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] hover:-translate-y-1 transition-transform">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Medical Team
        </h3>
        <p className="text-text-light">
          Responsible for first aid, medical supplies, and traveler health.
        </p>
      </div>

      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] hover:-translate-y-1 transition-transform">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Finance Team
        </h3>
        <p className="text-text-light">
          Handles budgeting, payments, and expense tracking.
        </p>
      </div>

      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] hover:-translate-y-1 transition-transform">
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
