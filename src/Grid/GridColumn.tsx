import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {GridSystemContext} from './GridSystem';


interface GridColumnProps {
  className?: string;
  size: {
    [index: string]: number | undefined;
  },
  offsetLeft?: {
    [index: string]: number | undefined;
  },
  offsetRight?: {
    [index: string]: number | undefined;
  }
}

interface ColumnState {
  classNames: string;
  dataProps: { [index: string]: string | number; }
}

const defaultState = {classNames: '', dataProps: {}};

export const Column: FunctionComponent<GridColumnProps> =
  ({
     children,
     className = '',
     size,
     offsetLeft,
     offsetRight
   }) => {
    const refColumn = useRef<HTMLDivElement>(null);
    const {breakpoints, prefixes} = useContext(GridSystemContext);
    const [state, setState] = useState<ColumnState>(defaultState)

    const getParentSizes = () => {
      const classNames: string[] = [];
      let dataProps: { [index: string]: string | number } = {};

      Object.keys(breakpoints).forEach(breakpoint => {
        const parentSize = refColumn?.current?.parentElement
          ?.closest(`[data-column-size-${breakpoint}]`)
          ?.getAttribute(`data-column-size-${breakpoint}`);

        const totalColumns = parentSize ? parentSize : breakpoints[breakpoint].columns;
        const columnSize = size[breakpoint] ? size[breakpoint] : totalColumns;

        classNames.push(`${prefixes.gridColumn}-${breakpoint} ${prefixes.gridColumn}-${breakpoint}-${columnSize}-${totalColumns}`);

        if (offsetLeft && offsetLeft[breakpoint]) {
          classNames.push(`${prefixes.gridColumn}-ol-${breakpoint}-${offsetLeft[breakpoint]}-${totalColumns}`);
        }

        if (offsetRight && offsetRight[breakpoint]) {
          classNames.push(`${prefixes.gridColumn}-or-${breakpoint}-${offsetRight[breakpoint]}-${totalColumns}`);
        }

        if (columnSize) {
          dataProps[`data-column-size-${breakpoint}`] = columnSize;
        }
      });

      setState({
        classNames: classNames.join(' '),
        dataProps,
      });
    }

    useEffect(() => getParentSizes(), [size, offsetLeft, offsetRight]);

    return <div
      ref={refColumn}
      {...state.dataProps}
      className={`${state.classNames} ${className}`}>
      {children}
    </div>;
  };
