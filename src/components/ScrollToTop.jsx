import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har baar jab path (URL) badlega, scroll top par chala jayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Yeh component kuch dikhayega nahi, bas peeche kaam karega
};

export default ScrollToTop;