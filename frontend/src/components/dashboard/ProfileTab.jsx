import QRCode from "react-qr-code";
import teaImg from "../../assets/tea.svg";
import { useState } from "react";

export default function ProfileTab({ user }) {
  const [showQRCode, setShowQRCode] = useState(false);
  const upiLink = "upi://pay?pa=abhaisankarpr@oksbi&pn=Abhai%20Sankar%20P%20R&aid=uGICAgMDuns7SVQu";

  const handlePay = () => {
    if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
      window.location.href = upiLink;
    } else {
      setShowQRCode(true);
    }
  };

  return (
    <div className="pl-0 pr-0 md:pl-80 p-4 min-h-screen bg-[#0d0d0d]/30 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome, <span className="text-green-400">{user?.name || "User"}</span>
        </h1>
        <p className="text-gray-300 mb-2 text-base md:text-lg">
          You are successfully logged in.
        </p>
        <p className="text-base md:text-lg font-semibold text-green-300">
          Enjoy the journey!
        </p>
      </div>

      <div className="w-full max-w-3xl mt-6 bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <button
          onClick={handlePay}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-white/20"
        >
          <img
            src={teaImg}
            className="w-9 h-9 object-contain invert brightness-200"
            alt="Tea"
          />
          <span className="text-lg sm:text-xl font-semibold cursor-pointer">Buy me a tea</span>
        </button>

        {showQRCode && (
          <div className="mt-4 flex flex-col items-center">
            <QRCode value={upiLink} size={180} bgColor="transparent" fgColor="white" />
            <p className="text-sm text-gray-300 mt-2 text-center">Scan to pay via UPI</p>
          </div>
        )}
      </div>
    </div>
  );
}
