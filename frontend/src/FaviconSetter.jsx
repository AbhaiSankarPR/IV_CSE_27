import { useEffect } from "react";
import logo from "./assets/logo/Odyssey.png";

export default function FaviconSetter() {
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = logo;
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  return null;
}
