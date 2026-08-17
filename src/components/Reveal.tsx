import { motion, type Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 44, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
}

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  as?: 'div' | 'span'
}>

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = as === 'span' ? motion.span : motion.div

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}
