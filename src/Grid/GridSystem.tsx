import React, {createContext, FunctionComponent, useEffect} from 'react'
import {GridSettings, GridSystemProps} from './Grid.interfaces'
import {GridHelper} from "../GridHelper";
import {createStyles, GRID_SETTINGS} from "./Grid.constants";


export const GridSystemContext = createContext<GridSettings>(GRID_SETTINGS);

export const GridSystem: FunctionComponent<GridSystemProps> =
    ({
         settings = GRID_SETTINGS,
         useGridHelper = false,
         children
     }) => {
        useEffect(() => createStyles(settings), [settings]);

        return (
            <GridSystemContext.Provider value={settings}>
                {children}
                {useGridHelper && <GridHelper margin={settings?.gridHelperMargins}/>}
            </GridSystemContext.Provider>
        );
    }
