import {useContext, useEffect, useState} from "react";
import {GridSystemContext} from "./GridSystem";

export const useBreakpoint = () => {
    const gridContext = useContext(GridSystemContext);
    const [breakpoint, setBreakpoint] = useState<string>(
        Object.keys(gridContext.breakpoints)[0]
    );

    const resvolveBreakpoint = () => {
        const bp = Object.keys(gridContext.breakpoints).find((key) => {
            const {minWidth, maxWidth} = gridContext.breakpoints[key];
            const {innerWidth} = window;

            let breakpoint = null;

            if (
                minWidth &&
                maxWidth &&
                innerWidth >= minWidth &&
                innerWidth <= maxWidth
            ) {
                breakpoint = key;
            } else if (minWidth && !maxWidth && innerWidth >= minWidth) {
                breakpoint = key;
            } else if (!minWidth && maxWidth && innerWidth < maxWidth) {
                breakpoint = key;
            }

            return breakpoint;
        });

        if (bp) {
            setBreakpoint(bp);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setTimeout(() => resvolveBreakpoint(), 10);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [gridContext.breakpoints]);

    return breakpoint;
};
