import placeholder from "../assets/loginface.svg";

const pramad =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/pramad.jpg";
const preman =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/HridhikeshSPremnath.jpg";
const jk =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/devanand.jpg";
const sura =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/Adithyasuresh.png";
const ap =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/abhiramap.jpg";
const sreenandan =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/sreenandan.jpg";
const vinayak =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/vinayak.png";
const nandanav =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/nandanav.png";
const sneha =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/sneha.png";
const akshay =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/akshaymnair.png";
const negha =
  "https://osuovssbexceivgwncfh.supabase.co/storage/v1/object/public/Avatars/negha.jpg";

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
    {
      name: "Abhiram A P",
      img: ap,
      link: "https://www.instagram.com/abhii0305/",
    },
  ],
  media: [
    {
      name: "Akshay M Nair",
      img: akshay,
      link: "https://www.instagram.com/4ksheeyy/",
    },
    { name: "Sreenandan", img: sreenandan },
    { name: "Sneha", img: sneha },
    {
      name: " Hridhikesh S Premnath",
      img: preman,
      link: "https://www.instagram.com/the_hridhikesh/",
    },
    {
      name: "Devanand",
      img: jk,
      link: "https://www.instagram.com/the_xiphoss/",
    },
    {
      name: "Abhiram A P",
      img: ap,
      link: "https://www.instagram.com/abhii0305/",
    },
  ],
  medical: [
    { name: "Nandana V", img: nandanav },
    { name: "Negha", img: negha },
    { name: "Kevin", img: placeholder },
    { name: "Sidharth S", img: placeholder },
    { name: "Daniel", img: placeholder },
    {
      name: "Vinayak",
      img: vinayak,
      link: "https://www.instagram.com/winayak._/",
    },
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
      <h2 className="text-center mb-8 text-3xl font-semibold">Our IV Team</h2>
      <p className="text-center text-text-mid mb-12">
        Meet the teams that keep the IV running smoothly — from logistics to
        creativity.
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
