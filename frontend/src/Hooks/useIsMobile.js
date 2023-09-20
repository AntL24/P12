import { useEffect, useState } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1028);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1028px)");
        const handleWindowSizeChange = () => setIsMobile(mediaQuery.matches);

        handleWindowSizeChange();
        mediaQuery.addEventListener("change", handleWindowSizeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleWindowSizeChange);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
