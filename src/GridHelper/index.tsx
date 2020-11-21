import React, {FunctionComponent, useContext} from 'react'
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

  return (
    <div className={styles.wrapper}>
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
