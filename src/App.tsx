import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import {
  ArrowDownRight,
  Asterisk,
  Clock3,
  Fingerprint,
  MoveDown,
  ScanLine,
  Sparkles,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Reveal } from './components/Reveal'
import { TicketVisual } from './components/TicketVisual'

const chapters = [
  {
    id: '01',
    icon: Fingerprint,
    title: 'La huella',
    body: 'Papel térmico, dobleces y tinta: una pieza única que cambia cada vez que la miras.',
    accent: 'ICE / 01',
  },
  {
    id: '02',
    icon: Clock3,
    title: 'El momento',
    body: '17 de agosto de 2026. 09:44. Una compra real convertida en coordenada exacta.',
    accent: 'TIME / 09:44',
  },
  {
    id: '03',
    icon: ScanLine,
    title: 'Los detalles',
    body: 'Nueve productos, dos descuentos y un total final comprobable línea por línea.',
    accent: 'SCAN / 298.00',
  },
]

const items = [
  { id: '01', name: 'Indar whole-wheat sandwich', price: '$63.00', discount: '—', final: '$63.00' },
  { id: '02', name: 'Tostitos SV BZZ 115 g', price: '$35.00', discount: '—', final: '$35.00' },
  { id: '03', name: 'Monster Zero Sugar 473 ml', price: '$48.00', discount: '-$11.00', final: '$37.00' },
  { id: '04', name: 'Monster Zero Ultra', price: '$48.00', discount: '-$11.00', final: '$37.00' },
  { id: '05', name: 'Chokis Gamesa 76 g', price: '$23.50', discount: '—', final: '$23.50' },
  { id: '06', name: 'RKT Jumbo Chocolate', price: '$30.00', discount: '—', final: '$30.00' },
  { id: '07', name: 'Florentinas Fresa 110 g', price: '$25.50', discount: '—', final: '$25.50' },
  { id: '08', name: 'Oreo 103 Mundial 105 g', price: '$22.00', discount: '—', final: '$22.00' },
  { id: '09', name: 'Emperador Senzo 117 g', price: '$25.00', discount: '—', final: '$25.00' },
]

const receiptSummary = [
  ['Subtotal antes de descuentos', '$320.00'],
  ['Descuentos totales', '-$22.00'],
  ['Total final', '$298.00'],
  ['IVA incluido', '$10.21'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 220])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const [progressLabel, setProgressLabel] = useState('00')
  const cursorX = useRef(0)
  const cursorY = useRef(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgressLabel(String(Math.round(latest * 100)).padStart(2, '0'))
  })

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let animationFrame = 0

    function raf(time: number) {
      lenis.raf(time)
      animationFrame = requestAnimationFrame(raf)
    }

    animationFrame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(animationFrame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    function moveCursor(event: globalThis.MouseEvent) {
      cursorX.current = event.clientX
      cursorY.current = event.clientY
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', moveCursor)
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [])

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <motion.div className="progress-bar" style={{ scaleX: progress }} />

      <header className="topbar">
        <a className="brand glass-pill" href="#inicio" aria-label="Ticket 170826, volver al inicio">
          <span className="brand__mark">T</span>
          <span>TICKET / 170826</span>
        </a>
        <nav className="desktop-nav glass-pill" aria-label="Navegación principal">
          <a href="#pieza">La pieza</a>
          <a href="#detalle">Detalle</a>
          <a href="#archivo">Archivo</a>
        </nav>
        <button
          className="menu-button glass-pill"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Abrir navegación"
        >
          <span>{menuOpen ? 'Cerrar' : 'Menú'}</span>
          <span className="menu-button__dot" />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ opacity: 1, clipPath: 'circle(140% at 92% 6%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {['pieza', 'detalle', 'archivo'].map((item, index) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span> {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero section-pad" id="inicio">
          <div className="hero__aurora hero__aurora--one" />
          <div className="hero__aurora hero__aurora--two" />
          <motion.div className="hero__copy" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              <span className="eyebrow__pulse" />
              Ticket real / 17.08.2026 — 09:44
            </motion.p>
            <h1 className="hero__title" aria-label="Todo lo que cabe en un ticket">
              {['TODO LO QUE', 'CABE EN', 'UN TICKET.'].map((line, index) => (
                <span className={index === 2 ? 'hero__line hero__line--accent' : 'hero__line'} key={line}>
                  <motion.span
                    initial={{ y: '110%', rotate: 2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ delay: 0.12 + index * 0.11, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="hero__footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p>
                No es solo papel. Es una lista de decisiones, una hora exacta y la prueba de que estuviste ahí.
              </p>
              <a className="round-link" href="#pieza" aria-label="Descubrir la pieza">
                <MoveDown size={20} />
              </a>
            </motion.div>
          </motion.div>

          <div className="hero__visual-wrap">
            <TicketVisual />
            <motion.div
              className="floating-note glass-panel floating-note--top"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <span>Compra real</span>
              <strong>09 productos</strong>
            </motion.div>
            <motion.div
              className="floating-note glass-panel floating-note--bottom"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              <Sparkles size={16} />
              <span>Total final<br />$298.00 MXN</span>
            </motion.div>
          </div>

          <div className="hero__scroll-index mono">
            <span>{progressLabel}</span>
            <div className="hero__scroll-track"><motion.i style={{ scaleY: progress }} /></div>
            <span>100</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <div className="marquee__content" key={copy}>
                <span>UN OBJETO COTIDIANO</span><Asterisk />
                <span>UNA MEMORIA TÉRMICA</span><Asterisk />
                <span>17 AGOSTO 2026 — 09:44</span><Asterisk />
                <span>TOTAL $298.00</span><Asterisk />
              </div>
            ))}
          </div>
        </div>

        <section className="manifesto section-pad" id="pieza">
          <div className="section-label mono">
            <span>01 / LA PIEZA</span>
            <span>DESLIZA PARA EXPLORAR</span>
          </div>
          <Reveal>
            <p className="manifesto__headline">
              Los datos son reales. <em>La memoria también vive en lo pequeño.</em>
            </p>
          </Reveal>
          <div className="manifesto__grid">
            <Reveal className="manifesto__image" delay={0.1}>
              <img src="/assets/ticket-real-17-08-2026.png" alt="Fotografía completa del ticket real de compra" />
              <span className="image-caption glass-pill mono">FIG. 01 — TICKET REAL</span>
            </Reveal>
            <div className="manifesto__copy">
              <Reveal delay={0.15}>
                <span className="big-index">298</span>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Nueve productos. Dos promociones de once pesos. Un total final de doscientos noventa y
                  ocho pesos. Cada cantidad coincide con el ticket original.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="spec-row mono">
                  <span>Fecha</span><b>17/08/2026</b>
                  <span>Hora</span><b>09:44</b>
                  <span>Pago</span><b>Electrónico</b>
                  <span>IVA incluido</span><b>$10.21</b>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="details section-pad" id="detalle">
          <div className="section-label mono">
            <span>02 / DETALLE</span>
            <span>TRES CAPAS DE INFORMACIÓN</span>
          </div>
          <Reveal className="details__heading-wrap">
            <h2>ACÉRCATE.<br /><span>HAY MÁS.</span></h2>
            <p>Lo que parece ruido también cuenta la historia.</p>
          </Reveal>
          <div className="chapter-grid">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon
              return (
                <Reveal className={`chapter chapter--${index + 1}`} delay={index * 0.1} key={chapter.id}>
                  <div className="chapter__glow" />
                  <div className="chapter__top mono">
                    <span>{chapter.id}</span>
                    <Icon size={21} />
                  </div>
                  <div className="chapter__visual" aria-hidden="true">
                    {index === 0 && <div className="fingerprint-lines"><i /><i /><i /><i /><i /></div>}
                    {index === 1 && <div className="orbital-clock"><i /><i /><span>09:44</span></div>}
                    {index === 2 && <div className="scanner"><i /><span>298.00</span></div>}
                  </div>
                  <div className="chapter__copy">
                    <span className="mono">{chapter.accent}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="inventory section-pad" id="archivo">
          <div className="inventory__sticky">
            <div>
              <div className="section-label mono">
                <span>03 / INVENTARIO</span>
                <span>09 PRODUCTOS / DATOS COMPLETOS</span>
              </div>
              <Reveal className="inventory__heading">
                <h2>UNA COMPRA.<br />NUEVE PISTAS.</h2>
              </Reveal>
              <Reveal className="inventory__intro-wrap" delay={0.1}>
                <p className="inventory__intro">
                  Precio original, descuento y precio final conservados exactamente como aparecen en la compra.
                </p>
              </Reveal>
              <div className="inventory__list">
                <div className="inventory__table-head mono" aria-hidden="true">
                  <span>#</span>
                  <span>Producto</span>
                  <span>Precio</span>
                  <span>Descuento</span>
                  <span>Final</span>
                </div>
                {items.map((item, index) => (
                  <button
                    className={activeItem === index ? 'inventory-row is-active' : 'inventory-row'}
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveItem(index)}
                    onFocus={() => setActiveItem(index)}
                  >
                    <span className="mono">{item.id}</span>
                    <span>{item.name}</span>
                    <span className="mono inventory-row__price"><small>Precio</small>{item.price}</span>
                    <span className="mono inventory-row__discount"><small>Descuento</small>{item.discount}</span>
                    <span className="mono inventory-row__final"><small>Final</small>{item.final}</span>
                  </button>
                ))}
              </div>
              <div className="receipt-summary" aria-label="Resumen completo del ticket">
                {receiptSummary.map(([label, value]) => (
                  <div className={label === 'Total final' ? 'receipt-summary__row is-total' : 'receipt-summary__row'} key={label}>
                    <span>{label}</span>
                    <strong className="mono">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="inventory__visual">
              <motion.div
                className="inventory__glass"
                animate={{ rotate: activeItem % 2 === 0 ? -2 : 2, y: activeItem * -4 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                <img src="/assets/ticket-real-17-08-2026.png" alt="Ticket real completo del 17 de agosto de 2026" />
                <div className="inventory__scanline" style={{ top: `${30 + activeItem * 7}%` }} />
              </motion.div>
              <div className="inventory__status glass-panel mono">
                <span>LECTURA ACTIVA</span>
                <b>{items[activeItem].name}</b>
                <small>PRECIO {items[activeItem].price} / DESCUENTO {items[activeItem].discount}</small>
                <strong>FINAL {items[activeItem].final}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="numbers section-pad">
          <div className="numbers__line" />
          <Reveal className="numbers__intro">
            <span className="mono">DATOS CRUDOS / MEMORIA VIVA</span>
            <p>Una coordenada hecha de números.</p>
          </Reveal>
          <div className="numbers__grid">
            {[
              ['09:44', 'HORA EXACTA'],
              ['09', 'PRODUCTOS'],
              ['-$22.00', 'DESCUENTOS'],
              ['$298.00', 'TOTAL FINAL'],
            ].map(([number, label], index) => (
              <Reveal className="number-card" delay={index * 0.08} key={label}>
                <span>{number}</span>
                <small className="mono">{label}</small>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="finale section-pad">
          <div className="finale__orb finale__orb--left" />
          <div className="finale__orb finale__orb--right" />
          <Reveal className="finale__kicker mono">FIN DEL TICKET / INICIO DE LA HISTORIA</Reveal>
          <Reveal delay={0.1}>
            <h2>LO ORDINARIO<br /><span>TAMBIÉN BRILLA.</span></h2>
          </Reveal>
          <Reveal className="finale__action" delay={0.2}>
            <a className="cta-button" href="#inicio">
              <span>VOLVER A MIRAR</span>
              <ArrowDownRight size={24} />
            </a>
          </Reveal>
          <footer>
            <div className="brand brand--footer">
              <span className="brand__mark">T</span>
              <span>TICKET / 170826</span>
            </div>
            <p>Una pieza digital sobre las cosas pequeñas.</p>
            <div className="mono">HMO / MX — 2026</div>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
