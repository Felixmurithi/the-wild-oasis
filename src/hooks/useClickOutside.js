import { useEffect, useRef } from "react";

function useClickOutside(action, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //cotains vs include
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click Outside");
          action?.();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [action, listenCapturing]
  );

  return ref;
}

export default useClickOutside;
