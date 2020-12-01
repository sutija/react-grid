import React, { useContext, createContext, useEffect, useState, useRef } from 'react';

var styles = {"wrapper":"_3BY0C","container":"_1li41","column":"_uRue4"};

var GridHelper = function GridHelper(_ref) {
  var margin = _ref.margin;

  var _useContext = useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints;

  var currentBreakpoint = GetBreakpoint();
  return React.createElement("div", {
    className: styles.wrapper
  }, Object.keys(breakpoints).map(function (breakpoint, index) {
    return React.createElement("div", {
      className: styles.container,
      style: {
        display: currentBreakpoint !== breakpoint ? 'none' : '',
        margin: margin && margin[breakpoint] ? "0 " + margin[breakpoint] : 'auto'
      },
      key: "g-" + breakpoint + "-" + index
    }, React.createElement(Grid, {
      className: styles.container
    }, [].concat(Array(breakpoints[breakpoint].columns)).fill('c').map(function (column, index) {
      var _size;

      return React.createElement(Column, {
        key: breakpoint + "-" + column + "-" + index,
        className: styles.column,
        size: (_size = {}, _size[breakpoint] = 1, _size)
      });
    })));
  }));
};

var getBreakpointQuery = function getBreakpointQuery(_ref, styles) {
  var minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth;
  var query = [];

  if (minWidth) {
    query.push("(min-width: " + minWidth + "px)");
  }

  if (maxWidth) {
    query.push("(max-width: " + maxWidth + "px)");
  }

  return "@media " + query.join(' and ') + " {" + styles + "}";
};

var createStyles = function createStyles(gridSettings) {
  var style = document.createElement('style');
  var mediaQuery = [];
  var breakpoints = gridSettings.breakpoints,
      prefixes = gridSettings.prefixes;
  var gridStyle = "." + prefixes.grid + " {\n        display: flex;\n        flex-basis: auto;\n        flex-direction: row;\n        flex-wrap: wrap;\n        width: auto;\n    }";
  Object.keys(breakpoints).forEach(function (breakpoint) {
    var items = '';
    var gutterSize = breakpoints[breakpoint].gutterSize;
    items += "." + prefixes.grid + "-" + breakpoint + " {\n                margin-left: -" + gutterSize + "px;\n                margin-right: -" + gutterSize + "px;\n            } ";
    items += "." + prefixes.gridColumn + "-" + breakpoint + " {\n                box-sizing: border-box;\n                padding-left: " + gutterSize + "px;\n                padding-right: " + gutterSize + "px;\n            } ";

    for (var i = 1; i <= breakpoints[breakpoint].columns; i++) {
      for (var j = 1; j <= i; j++) {
        var width = j / i * 100;
        items += "." + prefixes.gridColumn + "-" + breakpoint + "-" + j + "-" + i + " {\n                        flex-basis: " + width + "%;\n                        width: " + width + "%;\n                    }";
        items += "." + prefixes.gridColumn + "-ol-" + breakpoint + " {\n                        margin-left: " + width + "%;\n                    }";
        items += "." + prefixes.gridColumn + "-or-" + breakpoint + " {\n                        margin-right: " + width + "%;\n                    }";
      }
    }

    mediaQuery.push(getBreakpointQuery(breakpoints[breakpoint], items));
  });
  mediaQuery.push(gridStyle);
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(mediaQuery.join('')));
};

var GridSystemContext = createContext({
  breakpoints: {},
  prefixes: {
    grid: 'g',
    gridColumn: 'gc'
  }
});
var GridSystem = function GridSystem(_ref2) {
  var settings = _ref2.settings,
      children = _ref2.children;
  useEffect(function () {
    return createStyles(settings);
  }, [settings]);
  return React.createElement(GridSystemContext.Provider, {
    value: settings
  }, children);
};

var GetBreakpoint = function GetBreakpoint() {
  var gridContext = useContext(GridSystemContext);

  var _useState = useState(Object.keys(gridContext.breakpoints)[0]),
      breakpoint = _useState[0],
      setBreakpoint = _useState[1];

  useEffect(function () {
    var handleResize = function handleResize() {
      setTimeout(function () {
        var bp = Object.keys(gridContext.breakpoints).find(function (key) {
          var _gridContext$breakpoi = gridContext.breakpoints[key],
              minWidth = _gridContext$breakpoi.minWidth,
              maxWidth = _gridContext$breakpoi.maxWidth;
          var _window = window,
              innerWidth = _window.innerWidth;
          var breakpoint = null;

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
    return function () {
      return window.addEventListener("resize", handleResize);
    };
  }, [gridContext.breakpoints]);
  return breakpoint;
};

var Grid = function Grid(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style;

  var _useContext = useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints,
      prefixes = _useContext.prefixes;

  var classNames = Object.keys(breakpoints).map(function (breakpoint) {
    return "g-" + breakpoint;
  }).join(' ');
  return React.createElement("div", {
    style: style,
    className: prefixes.grid + " " + classNames + " " + className
  }, children);
};

var defaultState = {
  classNames: '',
  dataProps: {}
};
var Column = function Column(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      size = _ref.size,
      offsetLeft = _ref.offsetLeft,
      offsetRight = _ref.offsetRight;
  var refColumn = useRef(null);

  var _useContext = useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints,
      prefixes = _useContext.prefixes;

  var _useState = useState(defaultState),
      state = _useState[0],
      setState = _useState[1];

  var getParentSizes = function getParentSizes() {
    var classNames = [];
    var dataProps = {};
    Object.keys(breakpoints).forEach(function (breakpoint) {
      var _refColumn$current, _refColumn$current$pa, _refColumn$current$pa2;

      var parentSize = refColumn === null || refColumn === void 0 ? void 0 : (_refColumn$current = refColumn.current) === null || _refColumn$current === void 0 ? void 0 : (_refColumn$current$pa = _refColumn$current.parentElement) === null || _refColumn$current$pa === void 0 ? void 0 : (_refColumn$current$pa2 = _refColumn$current$pa.closest("[data-column-size-" + breakpoint + "]")) === null || _refColumn$current$pa2 === void 0 ? void 0 : _refColumn$current$pa2.getAttribute("data-column-size-" + breakpoint);
      var totalColumns = parentSize ? parentSize : breakpoints[breakpoint].columns;
      var columnSize = size[breakpoint] ? size[breakpoint] : totalColumns;
      classNames.push(prefixes.gridColumn + "-" + breakpoint + " " + prefixes.gridColumn + "-" + breakpoint + "-" + columnSize + "-" + totalColumns);

      if (offsetLeft && offsetLeft[breakpoint]) {
        classNames.push(prefixes.gridColumn + "-ol-" + breakpoint + "-" + offsetLeft[breakpoint] + "-" + totalColumns);
      }

      if (offsetRight && offsetRight[breakpoint]) {
        classNames.push(prefixes.gridColumn + "-or-" + breakpoint + "-" + offsetRight[breakpoint] + "-" + totalColumns);
      }

      if (columnSize) {
        dataProps["data-column-size-" + breakpoint] = columnSize;
      }
    });
    setState({
      classNames: classNames.join(' '),
      dataProps: dataProps
    });
  };

  useEffect(function () {
    return getParentSizes();
  }, [size, offsetLeft, offsetRight]);
  return React.createElement("div", Object.assign({
    ref: refColumn
  }, state.dataProps, {
    className: state.classNames + " " + className
  }), children);
};

export { Column, GetBreakpoint, Grid, GridHelper, GridSystem, GridSystemContext };
//# sourceMappingURL=index.modern.js.map
