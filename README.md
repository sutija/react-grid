# Light React Grid

This library package includes:
- `useBreakpoint` hook
- `GridSystemContext` Context
- `GridSystem` Component with `GridHelper` component
- `Grid` Component
- `Column` Component

#### Configuration:
If we aren't using default settings we can define breakpoints however we like.
We need to define `breakpoints`, `prefixes`, `gridHelperMargins`.

- Breakpoints settings are used for declaring names, number of columns, gutterSize and minimum/maximum width of breakpoint.
- Prefixes are used for naming CSS classes that are going to be generated.
- GridHelperMargins should be only set if you are using some container in your project, for example:
```html
<main style={{margin: '0 5%'}}>
    <header><h1>Hello</h1></header>
    <Grid>
        <Column ... />
        ...
    </Grid>
    ...
</main>
```
In that case we need to use gridHelperMargins to match our Grid.
 If you need more control over GridHelper, you could import `<GridHelper />` component and override CSS styles. 


Here is the sample configuration:
```tsx
const GRID_SETTINGS: GridSettings = {
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
```

Now we can use it in `<GridSystem />` and define that we want to use Grid Helper:
```tsx
// Import CSS for GridHelper component
import 'light-react-grid/dist/index.css'

ReactDOM.render(
  <React.StrictMode>
      <GridSystem 
           settings={myGridSettings}
           useGridHelper={true}
      >
        <App />
      </GridSystem>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Please be aware that we are going to use that breakpoint name for size property in `<Column />` component.
To set column size we need to write __exact__ column names as they are defined in myGridSettings: `<Column size={{sm: 2, md: 3}} />`.

Please checkout example code for more details: [example/src](example/src).

---
#### Usage
We can set column size and left or right offset.\
To define column size we need to pass size for a breakpoint that we want to use, if we don't define column size for the breakpoints it will automatically set width to `100%`.
```tsx
<Grid>
    <Column size={{sm: 2, md: 2, lg: 8}} offsetLeft={{md: 2}}></Column>
    <Column size={{sm: 2, md: 4}}></Column>
    ...
</Grid>
```
In case that we don't need column for some reason in a large breakpoint we can use `useBreakpoint` hook to remove it:
```tsx
    const breakpoint = useBreakpoint();
    return (<div>
        <Grid>
            { breakpoint === 'md' && <Column size={{md: 4}} /> }
            <Column size={{sm: 2, md: 4}}></Column>
        </Grid>
    </div>);
```
 
 ---

#### Tips

When you define your breakpoints you can always create a wrapper around `<Column />` component 
and define breakpoints as props.

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

export const ColumnWrapper: FunctionComponent<ColumnWrappperProps> = ({
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
Usage:
```tsx
<Grid>
    <ColumnWrapper sm={2} md={4} offsetLeft={{md: 1}} />    
</Grid>
```

I wish u happy coding!


----
Light React grid is MIT licensed.
