import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {GRID_SETTINGS, GridSystem} from 'light-react-grid';

ReactDOM.render(
    <GridSystem useGridHelper={true} settings={{
        ...GRID_SETTINGS,
        gridHelperMargins: {
            sm: '5%',
            md: '5%',
            lg: '5%'
        }
    }}>
        <App/>
    </GridSystem>, document.getElementById('root'));
