import QRCode from "react-qr-code";
import teaImg from "../../assets/tea.svg";
import { useState } from "react";

export default function ProfileTab({ user }) {
  const [showQRCode, setShowQRCode] = useState(false);

  // UPI link DRY variable
  const upiLink =
    "upi://pay?pa=abhaisankarpr@oksbi&pn=Abhai%20Sankar%20P%20R&aid=uGICAgMDuns7SVQu";

  return (
    <div className="pl-20 md:pl-64 p-4 min-h-screen bg-[#0d0d0d]/30">
      {/* Welcome Box */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg text-center md:text-left">
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

      {/* Buy Me a Tea Box */}
      <div className="max-w-3xl mx-auto mt-6 bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg flex flex-col justify-center items-center gap-4">
        <button
          onClick={() => {
            if (/android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
              window.location.href = upiLink;
            } else {
              alert("Can't pay on Desktop. Please use the QR Code below.");
              setShowQRCode(true);
            }
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-white/20"
        >
          <img
            src={teaImg}
            className="w-[36px] h-[36px] object-contain invert brightness-200"
          />
          <span className="text-lg sm:text-xl font-semibold cursor-pointer">
            Buy me a tea ☕
          </span>
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
