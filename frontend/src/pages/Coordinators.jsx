import pramad from "../assets/pramad.jpg";
import hridi from "../assets/HridhikeshSPremnath.jpg";
import jk from "../assets/devanand.jpg";
import sura from "../assets/Adithyasuresh.png";
import placeholder from "../assets/loginface.svg";
const mainCoordinators = [
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

const teams = {
  finance: [
    { name: "Aditya Narayanan", img: placeholder },
    { name: "Abhiram A P", img: placeholder, link: "https://www.instagram.com/abhii0305/" },
  ],
  media: [
    { name: "Akshay M Nair", img: placeholder, link: "https://www.instagram.com/4ksheeyy/" },
    { name: "Sreenandan", img: placeholder },
    { name: "Sneha", img: placeholder},
    { name: " Hridhikesh S Premnath", img: hridi, link: "https://www.instagram.com/the_hridhikesh/"  },
    { name: "Devanand", img: jk, link: "https://www.instagram.com/the_xiphoss/" },
    { name: "Abhiram A P", img: placeholder, link: "https://www.instagram.com/abhii0305/" },
  ],
  medical: [
    { name: "Nandana V", img: placeholder },
    { name: "Negha", img: placeholder },
    { name: "Kevin", img: placeholder },
    { name: "Sidharth S", img: placeholder },
    { name: "Daniel", img: placeholder },
    { name: "Vinayak", img: placeholder, link: "https://www.instagram.com/winayak._/" },
  ],
  document: [
    { name: "Abhin Anoop", img: placeholder },
    { name: "Sonal Santhosh", img: placeholder },
  ],
};

function PersonCard({ name, img, link }) {
  const content = (
    <div className="p-4 rounded-xl text-center w-[150px] transition-transform duration-200 ease-in-out hover:-translate-y-1.5 cursor-pointer">
      <img
        src={img}
        alt={name}
        className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
      />
      <p className="text-white font-semibold text-sm text-center">{name}</p>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}

export default function Coordinators() {
  return (
    <div className="bg-dark-primary text-white min-h-screen py-16 px-8 max-w-6xl mx-auto">
      <h2 className="text-center mb-8 text-3xl font-semibold">
        Our IV Team
      </h2>
      <p className="text-center text-text-mid mb-12">
        Meet the teams that keep the IV running smoothly — from logistics to creativity.
      </p>

      {/* Main Coordinators */}
      <div className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] hover:-translate-y-1 transition-transform">
        <h3 className="text-brand-blue mb-2 text-xl font-semibold">
          Main Coordinators
        </h3>
        <div className="flex gap-8 flex-wrap justify-center mt-6">
          {mainCoordinators.map((c, i) => (
            <PersonCard key={i} {...c} />
          ))}
        </div>
      </div>

      {/* Other Teams */}
      {Object.entries(teams).map(([teamName, members]) => (
        <div
          key={teamName}
          className="mb-8 bg-dark-secondary p-6 rounded-lg border-l-4 border-[#cdcdcd] hover:-translate-y-1 transition-transform"
        >
          <h3 className="text-brand-blue mb-2 text-xl font-semibold capitalize">
            {teamName} Team
          </h3>
          <div className="flex gap-8 flex-wrap justify-center mt-6">
            {members.map((m, i) => (
              <PersonCard key={i} {...m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
