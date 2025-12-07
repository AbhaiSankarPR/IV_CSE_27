import ivLogo from "../assets/logo/Odyssey.png";

export default function Loading({ message = "Loading..." }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#0d0d0d] text-white">
            <img
                src={ivLogo}
                alt="Loading Logo"
                className="w-80 h-80 animate-pulse drop-shadow-lg"/>
                    <p className="text-lg font-small mt-4 tracking-wide">{message}</p>
        </div>
    );
}
