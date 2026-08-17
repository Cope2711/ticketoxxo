import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MouseEvent } from 'react'

type TicketVisualProps = {
  className?: string
  compact?: boolean
}

export function TicketVisual({ className = '', compact = false }: TicketVisualProps) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 130, damping: 18 })
  const smoothY = useSpring(rawY, { stiffness: 130, damping: 18 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7])
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['20%', '80%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['20%', '80%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,.2), transparent 38%)`

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    rawY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  function reset() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      className={`ticket-visual ${compact ? 'ticket-visual--compact' : ''} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 60, rotateZ: 3 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ticket-visual__halo" />
      <div className="ticket-visual__frame">
        <img
          src="/assets/ticket-real-17-08-2026.png"
          alt="Fotografía del ticket real de compra del 17 de agosto de 2026"
        />
        <motion.div className="ticket-visual__glare" style={{ background: glare }} />
        <div className="ticket-visual__grain" />
      </div>
    </motion.div>
  )
}
