import ivLogo from "../assets/logo/Odyssey.png";

export default function Loading({ message = "Loading..." }) {
    return (
        <div className="min-h-[90dvh] flex flex-col justify-center items-center bg-[#0d0d0d] text-white p-4">
            <img
                src={ivLogo}
                alt="Loading Logo"
                className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto animate-pulse drop-shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl font-light mt-4 tracking-wide text-center">
                {message}
            </p>
        </div>
    );
}
