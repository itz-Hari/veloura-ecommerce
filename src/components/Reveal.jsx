import useReveal from '../hooks/useReveal'

// Wraps content so it fades up when scrolled into view (styles in global.css).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
