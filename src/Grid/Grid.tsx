import React, { useContext } from 'react'
import { GridSystemContext } from './GridSystem'

interface GridContainerProps {
  className?: string;
  style?: {};
}

export const Grid: React.FC<GridContainerProps> = ({
  children,
  className = '',
  style
}) => {
  const { breakpoints, prefixes } = useContext(GridSystemContext)
  const classNames = Object.keys(breakpoints)
    .map((breakpoint) => `g-${breakpoint}`)
    .join(' ')

  return (
    <div
      style={style}
      className={`${prefixes.grid} ${classNames} ${className}`}
    >
      {children}
    </div>
  )
}
