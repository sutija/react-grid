import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Column, useBreakpoint, Grid, GridSystemContext} from '..';

import styles from './GridHelper.module.css';


interface GridHelperProps {
    margin?: {
        [index: string]: string;
    }
}


export const GridHelper: FunctionComponent<GridHelperProps> =
    ({
         margin
     }): JSX.Element => {

        const savedVisibility = (localStorage.getItem('grid-helper') === 'true');
        const {breakpoints} = useContext(GridSystemContext)
        const currentBreakpoint = useBreakpoint()
        const [visible, setVisible] = useState<boolean>(savedVisibility ? savedVisibility : false);

        useEffect(() => {
            const toggleGrid = ({key, ctrlKey}: KeyboardEvent): void => {
                if (ctrlKey && key === 'g') {
                    const isVisible = !visible;
                    setVisible(isVisible);
                    localStorage.setItem('grid-helper', isVisible.toString());
                }
            };

            window.addEventListener('keyup', toggleGrid);

            return (): void => window.removeEventListener('keyup', toggleGrid);
        }, [visible]);

        return (
            <div className={`${styles.wrapper} ${visible ? styles.wrapper__visible : ''}`}>
                {Object.keys(breakpoints).map((breakpoint, index) => (
                    <div
                        className={styles.container}
                        style={{
                            display: currentBreakpoint !== breakpoint ? 'none' : '',
                            margin: margin && margin[breakpoint] ? `0 ${margin[breakpoint]}` : 'auto'
                        }} key={`g-${breakpoint}-${index}`}>
                        <Grid className={styles.container}>
                            {
                                [...Array(breakpoints[breakpoint].columns)].fill('c').map((column, index) =>
                                    <Column key={`${breakpoint}-${column}-${index}`} className={styles.column}
                                            size={{[breakpoint]: 1}}/>)
                            }
                        </Grid>
                    </div>
                ))}
            </div>
        )
    }
