// src/components/withPageLoader.jsx
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";

const withPageLoader = (WrappedComponent) => {
  return function PageWithLoader(props) {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
      // When page loading starts → tell App to hide header/footer
      window.dispatchEvent(new Event("page-loading-start"));

      const container = containerRef.current;
      const images = container ? container.querySelectorAll("img") : [];
      let loadedCount = 0;

      if (images.length === 0) {
        setLoading(false);
        window.dispatchEvent(new Event("page-loading-end"));
        return;
      }

      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoading(false);
          // When all images done → tell App to show header/footer
          window.dispatchEvent(new Event("page-loading-end"));
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded();
        } else {
          img.addEventListener("load", checkAllLoaded);
          img.addEventListener("error", checkAllLoaded);
        }
      });

      // safety timeout → max 3s
      const timer = setTimeout(() => {
        setLoading(false);
        window.dispatchEvent(new Event("page-loading-end"));
      }, 3000);

      return () => {
        clearTimeout(timer);
        images.forEach((img) => {
          img.removeEventListener("load", checkAllLoaded);
          img.removeEventListener("error", checkAllLoaded);
        });
      };
    }, []);

    return (
      <>
        {loading && <Loader />}
        <div ref={containerRef} className={loading ? "hidden" : "block"}>
          <WrappedComponent {...props} />
        </div>
      </>
    );
  };
};

export default withPageLoader;
