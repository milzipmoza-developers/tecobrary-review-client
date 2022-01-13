import {useLayoutEffect} from "react";

import {useLocation} from "react-router-dom";
import queryString from "query-string";

export function useLockBodyScroll(): void {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect((): () => void => {
    // Get original body overflow
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}

export function useQueryString() {
  const {search} = useLocation();
  return queryString.parse(search);
}
