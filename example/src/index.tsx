import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { GridSystem, GridSystemProps } from 'simple-react-grid'

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
    <GridSystem settings={GRID_SETTINGS}>
        <App />
    </GridSystem>


, document.getElementById('root'))
