import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {Column, GetBreakpoint, Grid, GridSystemContext} from '..';

import styles from './GridHelper.module.css';


interface GridHelperProps {
  margin?: {
    [index: string]: string;
  }
}


export const GridHelper: FunctionComponent<GridHelperProps> = ({
  margin
}): JSX.Element => {
  
  const {breakpoints} = useContext(GridSystemContext)
  const currentBreakpoint = GetBreakpoint()
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleGrid = ({ key, ctrlKey }: KeyboardEvent): void => {
      if (ctrlKey && key === 'g') {
        setVisible(!visible);
      }
    };

    window.addEventListener('keyup', toggleGrid);

    return (): void => {
      window.removeEventListener('keyup', toggleGrid);
    };
  }, [visible]);

  return (
    <div className={`${styles.wrapper} ${visible ? styles.wrapper__visible : ''}`}>
      {Object.keys(breakpoints).map((breakpoint, index) => (
        <div 
        className={styles.container}
        style={{
          display: currentBreakpoint !== breakpoint ? 'none' : '',
          margin: margin && margin[breakpoint] ? `0 ${margin[breakpoint]}` : 'auto'}} key={`g-${breakpoint}-${index}`}>
        <Grid className={styles.container}>
          {
            [...Array(breakpoints[breakpoint].columns)].fill('c').map((column, index) => 
            <Column key={`${breakpoint}-${column}-${index}`} className={styles.column} size={{[breakpoint]: 1}} />)
          }
        </Grid>
        </div>
      ))}
    </div>
  )
}
