function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var styles = {"wrapper":"_GridHelper-module__wrapper__3BY0C","wrapper__visible":"_GridHelper-module__wrapper__visible__1UX9U","container":"_GridHelper-module__container__1li41","column":"_GridHelper-module__column__uRue4"};

var GridHelper = function GridHelper(_ref) {
  var margin = _ref.margin;

  var _useContext = React.useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints;

  var currentBreakpoint = GetBreakpoint();

  var _useState = React.useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

  React.useEffect(function () {
    var toggleGrid = function toggleGrid(_ref2) {
      var key = _ref2.key,
          ctrlKey = _ref2.ctrlKey;

      if (ctrlKey && key === 'g') {
        setVisible(!visible);
      }
    };

    window.addEventListener('keyup', toggleGrid);
    return function () {
      window.removeEventListener('keyup', toggleGrid);
    };
  }, [visible]);
  return React__default.createElement("div", {
    className: styles.wrapper + " " + (visible ? styles.wrapper__visible : '')
  }, Object.keys(breakpoints).map(function (breakpoint, index) {
    return React__default.createElement("div", {
      className: styles.container,
      style: {
        display: currentBreakpoint !== breakpoint ? 'none' : '',
        margin: margin && margin[breakpoint] ? "0 " + margin[breakpoint] : 'auto'
      },
      key: "g-" + breakpoint + "-" + index
    }, React__default.createElement(Grid, {
      className: styles.container
    }, [].concat(Array(breakpoints[breakpoint].columns)).fill('c').map(function (column, index) {
      var _size;

      return React__default.createElement(Column, {
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
        items += "." + prefixes.gridColumn + "-ol-" + breakpoint + "-" + j + "-" + i + " {\n                        margin-left: " + width + "%;\n                    }";
        items += "." + prefixes.gridColumn + "-or-" + breakpoint + "-" + j + "-" + i + " {\n                        margin-right: " + width + "%;\n                    }";
      }
    }

    mediaQuery.push(getBreakpointQuery(breakpoints[breakpoint], items));
  });
  mediaQuery.push(gridStyle);
  document.head.appendChild(style);
  style.appendChild(document.createTextNode(mediaQuery.join('')));
};

var GridSystemContext = React.createContext({
  breakpoints: {},
  prefixes: {
    grid: 'g',
    gridColumn: 'gc'
  }
});
var GridSystem = function GridSystem(_ref2) {
  var settings = _ref2.settings,
      children = _ref2.children;
  React.useEffect(function () {
    return createStyles(settings);
  }, [settings]);
  return React__default.createElement(GridSystemContext.Provider, {
    value: settings
  }, children);
};

var GetBreakpoint = function GetBreakpoint() {
  var gridContext = React.useContext(GridSystemContext);

  var _useState = React.useState(Object.keys(gridContext.breakpoints)[0]),
      breakpoint = _useState[0],
      setBreakpoint = _useState[1];

  React.useEffect(function () {
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

  var _useContext = React.useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints,
      prefixes = _useContext.prefixes;

  var classNames = Object.keys(breakpoints).map(function (breakpoint) {
    return "g-" + breakpoint;
  }).join(' ');
  return React__default.createElement("div", {
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
  var refColumn = React.useRef(null);

  var _useContext = React.useContext(GridSystemContext),
      breakpoints = _useContext.breakpoints,
      prefixes = _useContext.prefixes;

  var _useState = React.useState(defaultState),
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

  React.useEffect(function () {
    return getParentSizes();
  }, [size, offsetLeft, offsetRight]);
  return React__default.createElement("div", Object.assign({
    ref: refColumn
  }, state.dataProps, {
    className: state.classNames + " " + className
  }), children);
};

exports.Column = Column;
exports.GetBreakpoint = GetBreakpoint;
exports.Grid = Grid;
exports.GridHelper = GridHelper;
exports.GridSystem = GridSystem;
exports.GridSystemContext = GridSystemContext;
//# sourceMappingURL=index.js.map
