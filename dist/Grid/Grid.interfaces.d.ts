export interface Breakpoint {
    minWidth?: number;
    maxWidth?: number;
    columns: number;
    gutterSize: number;
}
export interface GridSystemProps {
    breakpoints: {
        [index: string]: Breakpoint;
    };
    prefixes: {
        grid: string;
        gridColumn: string;
    };
}
