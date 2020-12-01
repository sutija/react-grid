# React Grid

### Installation:
```tsx
// Example config file
const GRID_SETTINGS: GridSystemProps = {
  breakpoints: {
    sm: {
      columns: 4,
      gutterSize: 5,
      maxWidth: 600,
    },
    md: {
      columns: 8,
      gutterSize: 10,
      minWidth: 600,
      maxWidth: 900,
    },
    lg: {
      columns: 12,
      gutterSize: 20,
      minWidth: 900,
    }
  },
  prefixes: {
    grid: 'g',
    gridColumn: 'gc',
  }
}

ReactDOM.render(
  <React.StrictMode>
      <GridSystem settings={GRID_SETTINGS}>
        <App />
        {
            // Add grid helper
            <GridHelper />
        }
      </GridSystem>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Usage:
```tsx

...
<Grid>
    <Column size={{sm: 2, md: 2, lg: 8}} offsetLeft={{md: 2}}></Column>
    <Column size={{sm: 2, md: 4, lg: 4}}></Column>
</Grid>

```


## Make your life easier, create Column wrapper with defined props and use it instead of <Column />
```tsx

interface ColumnWrappperProps {
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
  offsetLeft?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  offsetRight?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export const ColumnWrapper: FunctionComponent<GridColumnProps> = ({
  children,
  className = '',
  sm,
  md,
  lg,
  offsetLeft = {},
  offsetRight = {},
}) => (
  <Column
    size={{ sm, md, lg }}
    offsetLeft={offsetLeft}
    offsetRight={offsetRight}
    className={className}
  >
    {children}
  </Column>
);
```
