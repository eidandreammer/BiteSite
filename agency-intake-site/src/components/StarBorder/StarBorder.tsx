'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import './StarBorder.css'

type StarBorderProps = {
  as?: ElementType
  className?: string
  contentClassName?: string
  color?: string
  speed?: string
  thickness?: number
  children: ReactNode
  style?: CSSProperties
} & Record<string, any>

const StarBorder = ({
  as: Component = 'button',
  className = '',
  contentClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{
        padding: `${thickness}px 0`,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={`inner-content ${contentClassName}`.trim()}>{children}</div>
    </Component>
  )
}

export default StarBorder
