import React, { useContext, createContext, useEffect, useState, useRef } from 'react';

var styles = {"wrapper":"_GridHelper-module__wrapper__3BY0C","container":"_GridHelper-module__container__1li41","column":"_GridHelper-module__column__uRue4"};

const GridHelper = ({
  margin
}) => {
  const {
    breakpoints
  } = useContext(GridSystemContext);
  const currentBreakpoint = GetBreakpoint();
  return React.createElement("div", {
    className: styles.wrapper
  }, Object.keys(breakpoints).map((breakpoint, index) => React.createElement("div", {
    className: styles.container,
    style: {
      display: currentBreakpoint !== breakpoint ? 'none' : '',
      margin: margin && margin[breakpoint] ? `0 ${margin[breakpoint]}` : 'auto'
    },
    key: `g-${breakpoint}-${index}`
  }, React.createElement(Grid, {
    className: styles.container
  }, [...Array(breakpoints[breakpoint].columns)].fill('c').map((column, index) => React.createElement(Column, {
    key: `${breakpoint}-${column}-${index}`,
    className: styles.column,
    size: {
      [breakpoint]: 1
    }
  }))))));
};

const getBreakpointQuery = ({
  minWidth,
  maxWidth
}, styles) => {
  const query = [];

  if (minWidth) {
    query.push(`(min-width: ${minWidth}px)`);
  }

  if (maxWidth) {
    query.push(`(max-width: ${maxWidth}px)`);
  }

  return `@media ${query.join(' and ')} {${styles}}`;
};

const createStyles = gridSettings => {
  const style = document.createElement('style');
  const mediaQuery = [];
  const {
    breakpoints,
    prefixes
  } = gridSettings;
  const gridStyle = `.${prefixes.grid} {
        display: flex;
        flex-basis: auto;
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
    }`;
  Object.keys(breakpoints).forEach(breakpoint => {
    let items = '';
    const {
      gutterSize
    } = breakpoints[breakpoint];
    items += `.${prefixes.grid}-${breakpoint} {
                margin-left: -${gutterSize}px;
                margin-right: -${gutterSize}px;
            } `;
    items += `.${prefixes.gridColumn}-${breakpoint} {
                box-sizing: border-box;
                padding-left: ${gutterSize}px;
                padding-right: ${gutterSize}px;
            } `;

    for (let i = 1; i <= breakpoints[breakpoint].columns; i++) {
      for (let j = 1; j <= i; j++) {
        const width = j / i * 100;
        items += `.${prefixes.gridColumn}-${breakpoint}-${j}-${i} {
                        flex-basis: ${width}%;
                        width: ${width}%;
                    }`;
        items += `.${prefixes.gridColumn}-ol-${breakpoint} {
                        margin-left: ${width}%;
                    }`;
        items += `.${prefixes.gridColumn}-or-${breakpoint} {
                        margin-right: ${width}%;
                    }`;
      }
    }

    mediaQuery.push(getBreakpointQuery(breakpoints[breakpoint], items));
  });
  mediaQuery.push(gridStyle);
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(mediaQuery.join('')));
};

const GridSystemContext = createContext({
  breakpoints: {},
  prefixes: {
    grid: 'g',
    gridColumn: 'gc'
  }
});
const GridSystem = ({
  settings,
  children
}) => {
  useEffect(() => createStyles(settings), [settings]);
  return React.createElement(GridSystemContext.Provider, {
    value: settings
  }, children);
};

const GetBreakpoint = () => {
  const gridContext = useContext(GridSystemContext);
  const [breakpoint, setBreakpoint] = useState(Object.keys(gridContext.breakpoints)[0]);
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const bp = Object.keys(gridContext.breakpoints).find(key => {
          const {
            minWidth,
            maxWidth
          } = gridContext.breakpoints[key];
          const {
            innerWidth
          } = window;
          let breakpoint = null;

          if (minWidth && maxWidth && innerWidth >= minWidth && innerWidth <= maxWidth) {
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
      }, 10);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.addEventListener("resize", handleResize);
  }, [gridContext.breakpoints]);
  return breakpoint;
};

const Grid = ({
  children,
  className: _className = '',
  style
}) => {
  const {
    breakpoints,
    prefixes
  } = useContext(GridSystemContext);
  const classNames = Object.keys(breakpoints).map(breakpoint => `g-${breakpoint}`).join(' ');
  return React.createElement("div", {
    style: style,
    className: `${prefixes.grid} ${classNames} ${_className}`
  }, children);
};

const defaultState = {
  classNames: '',
  dataProps: {}
};
const Column = ({
  children,
  className: _className = '',
  size,
  offsetLeft,
  offsetRight
}) => {
  const refColumn = useRef(null);
  const {
    breakpoints,
    prefixes
  } = useContext(GridSystemContext);
  const [state, setState] = useState(defaultState);

  const getParentSizes = () => {
    const classNames = [];
    let dataProps = {};
    Object.keys(breakpoints).forEach(breakpoint => {
      var _refColumn$current, _refColumn$current$pa, _refColumn$current$pa2;

      const parentSize = refColumn === null || refColumn === void 0 ? void 0 : (_refColumn$current = refColumn.current) === null || _refColumn$current === void 0 ? void 0 : (_refColumn$current$pa = _refColumn$current.parentElement) === null || _refColumn$current$pa === void 0 ? void 0 : (_refColumn$current$pa2 = _refColumn$current$pa.closest(`[data-column-size-${breakpoint}]`)) === null || _refColumn$current$pa2 === void 0 ? void 0 : _refColumn$current$pa2.getAttribute(`data-column-size-${breakpoint}`);
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
      dataProps
    });
  };

  useEffect(() => getParentSizes(), [size, offsetLeft, offsetRight]);
  return React.createElement("div", Object.assign({
    ref: refColumn
  }, state.dataProps, {
    className: `${state.classNames} ${_className}`
  }), children);
};

export { Column, GetBreakpoint, Grid, GridHelper, GridSystem, GridSystemContext };
//# sourceMappingURL=index.modern.js.map
