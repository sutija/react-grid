import { FunctionComponent } from 'react';
interface GridColumnProps {
    className?: string;
    size: {
        [index: string]: number | undefined;
    };
    offsetLeft?: {
        [index: string]: number | undefined;
    };
    offsetRight?: {
        [index: string]: number | undefined;
    };
}
export declare const Column: FunctionComponent<GridColumnProps>;
export {};
