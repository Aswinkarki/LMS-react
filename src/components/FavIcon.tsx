import { useEffect } from "react";

interface FaviconProps {
  url: string;
}

const Favicon: React.FC<FaviconProps> = ({ url }) => {
  useEffect(() => {
    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement) ||
      document.createElement("link");

    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
  }, [url]); 

  return null;
};

export default Favicon;
