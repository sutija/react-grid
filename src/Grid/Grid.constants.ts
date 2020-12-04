import {Breakpoint, GridSettings} from "./Grid.interfaces";

export const GRID_SETTINGS: GridSettings = {
    breakpoints: {
        sm: {
            columns: 4,
            gutterSize: 5,
            maxWidth: 600,
        },
        md: {
            columns: 8,
            gutterSize: 5,
            minWidth: 600,
            maxWidth: 900,
        },
        lg: {
            columns: 12,
            gutterSize: 10,
            minWidth: 900,
        }
    },
    prefixes: {
        grid: 'g',
        gridColumn: 'gc',
    }
}

const getBreakpointQuery = (
    {minWidth, maxWidth}: Breakpoint,
    styles: string
) => {
    const query = [];

    if (minWidth) {
        query.push(`(min-width: ${minWidth}px)`);
    }
    if (maxWidth) {
        query.push(`(max-width: ${maxWidth}px)`);
    }

    return `@media ${query.join(' and ')} {${styles}}`
};

export const createStyles = (gridSettings: GridSettings) => {
    const style = document.createElement('style');
    const mediaQuery: string[] = [];
    const {breakpoints, prefixes} = gridSettings;

    const gridStyle = `.${prefixes.grid} {
        display: flex;
        flex-basis: auto;
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
    }`;

    Object.keys(breakpoints).forEach((breakpoint) => {
        let items = '';
        const {gutterSize} = breakpoints[breakpoint];

        // CSS Grid
        items += `.${prefixes.grid}-${breakpoint} {
                margin-left: -${gutterSize}px;
                margin-right: -${gutterSize}px;
            }`;

        // CSS column
        items += `.${prefixes.gridColumn}-${breakpoint} {
                box-sizing: border-box;
                padding-left: ${gutterSize}px;
                padding-right: ${gutterSize}px;
            }`;

        for (let i = 1; i <= breakpoints[breakpoint].columns; i++) {
            for (let j = 1; j <= i; j++) {
                const width = (j / i) * 100;

                items += `.${prefixes.gridColumn}-${breakpoint}-${j}-${i} {
                        flex-basis: ${width}%;
                        width: ${width}%;
                    }`;

                // CSS offset left
                items += `.${prefixes.gridColumn}-ol-${breakpoint}-${j}-${i} {
                        margin-left: ${width}%;
                    }`;

                // CSS offset left
                items += `.${prefixes.gridColumn}-or-${breakpoint}-${j}-${i} {
                        margin-right: ${width}%;
                    }`;
            }
        }

        mediaQuery.push(getBreakpointQuery(breakpoints[breakpoint], items))
    });

    mediaQuery.push(gridStyle);

    document.head.appendChild(style);
    style.appendChild(document.createTextNode(mediaQuery.join('')));
};
