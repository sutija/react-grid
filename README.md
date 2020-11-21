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
    <Column size={{sm: 2, md: 4, lg: 8}}></Column>
    <Column size={{sm: 2, md: 4, lg: 4}}></Column>
</Grid>

```


## Make your life easier, create Column wrapper with defined props
```tsx

interface ColumnWrappperProps {
  className?: string;
  sm: number;
  md: number;
  lg: number;
  offsetLeftSm?: number;
  offsetLeftMd?: number;
  offsetLeftLg?: number;
  offsetRightSm?: number;
  offsetRightMd?: number;
  offsetRightLg?: number;
}

const ColumnWrapper: FunctionComponent<ColumnWrappperProps> = (props) => {
  const { sm, md, lg, children, className } = props;

  const offsetLeft: { [index: string]: number } = {};
  const offsetRight: { [index: string]: number } = {};

  if (props.offsetLeftSm) {
    offsetLeft.sm = props.offsetLeftSm;
  }

  if (props.offsetLeftMd) {
    offsetLeft.md = props.offsetLeftMd;
  }

  if (props.offsetLeftLg) {
    offsetLeft.lg = props.offsetLeftLg;
  }

  if (props.offsetRightSm) {
    offsetRight.sm = props.offsetRightSm;
  }

  if (props.offsetRightMd) {
    offsetRight.md = props.offsetRightMd;
  }

  if (props.offsetRightLg) {
    offsetRight.lg = props.offsetRightLg;
  }

  return <Column
    size={{ sm, md, lg }}
    offsetLeft={offsetLeft}
    offsetRight={offsetRight}
    className={className}
  >{children}</Column>;
}
```
