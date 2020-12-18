import React, {CSSProperties, FunctionComponent, useContext, useEffect, useState} from 'react'
import {Column, Grid, GridSystemContext, useBreakpoint} from '..';

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
        const {breakpoints, gridHelperColumnColor} = useContext(GridSystemContext)
        const currentBreakpoint = useBreakpoint()
        const [visible, setVisible] = useState<boolean>(savedVisibility ? savedVisibility : false);

        const columnStyle: CSSProperties = {
            backgroundColor: 'rgba(0, 0, 0, .1)'
        };

        if (gridHelperColumnColor) {
            columnStyle.backgroundColor = gridHelperColumnColor;
        }

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
                                            size={{[breakpoint]: 1}}>
                                        <div style={columnStyle} className={styles.columnFill}/>
                                    </Column>)
                            }
                        </Grid>
                    </div>
                ))}
            </div>
        )
    }
