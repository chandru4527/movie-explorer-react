import { useEffect, } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // window.history.scrollRestoration = "manual";

    const scrollToTop = () => {
      window.scrollTo(0, 0);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    };

    requestAnimationFrame(scrollToTop);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;