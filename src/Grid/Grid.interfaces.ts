export interface Breakpoint {
    minWidth?: number;
    maxWidth?: number;
    columns: number;
    gutterSize: number;
}

export interface GridSettings {
    breakpoints: {
        [index: string]: Breakpoint;
    },
    prefixes: {
        grid: string;
        gridColumn: string;
    },
    gridHelperMargins?: {
        [indexed: string]: string;
    }
}

export interface GridSystemProps {
    settings?: GridSettings;
    useGridHelper: boolean;
}
