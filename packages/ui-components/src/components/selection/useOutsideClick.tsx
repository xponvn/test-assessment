import React from "react";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useOutsideClick = (callback: any) => {
    const ref = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick, true);
  
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
  
    return ref;
  };