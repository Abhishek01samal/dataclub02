import Emitter from '@clone/utils/Emitter'
import Ticker from '@clone/utils/Ticker'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface SCTAOptions {
  isFlat?: boolean
  slowImpact?: boolean
}

export function initSCTA(el: HTMLElement, options: SCTAOptions = {}) {
  new Section(el, options)
}

  class Section {
    el: HTMLElement
    container: HTMLElement
    hover: HTMLElement
    button: HTMLElement
    cta: HTMLElement
    options: SCTAOptions

    bounding: DOMRect = new DOMRect()

    ctaMaxSize: number = 0

    grid: {
      bounding: DOMRect
      width: number
      height: number
      vLines: number
      hLines: number
      gapX: number
      gapY: number
      lines: any[]
      points: any[]
      el: HTMLElement
      svg: HTMLElement
      path: HTMLElement
    }

    wave: {
      progress: number
      op: number
      speed: number
      strength: number
      state: string
      timeout: ReturnType<typeof setTimeout> | number
    }

    buttonIsHovered: boolean
    isPaused: boolean
    tl!: gsap.core.Timeline

    /**
     * Constructor
     */
    constructor(el: HTMLElement, options: SCTAOptions = {}) {
      this.el = el
      this.options = options
      this.container = this.el.querySelector('.js-container')!
      this.hover = this.el.querySelector('.js-hover')!
      this.button = this.el.querySelector('.js-button')!
      this.cta = this.el.querySelector('.js-cta')!

      // Properties
      this.grid = {
        bounding: new DOMRect(),
        width: 0,
        height: 0,
        vLines: 0,
        hLines: 0,
        gapX: 0,
        gapY: 0,
        lines: [],
        points: [],
        el: this.el.querySelector('.js-grid')!,
        svg: this.el.querySelector('.js-grid-svg')!,
        path: this.el.querySelector('.js-grid-path')!,
      }

      this.wave = {
        progress: 0,
        op: 0,
        speed: window.safeWidth > 767 ? (options.slowImpact ? 8 : 20) : (options.slowImpact ? 5 : 15),
        strength: window.safeWidth > 767 ? (options.slowImpact ? 1 : 1) : (options.slowImpact ? 0.3 : 0.35),
        state: 'paused',
        timeout: 0,
      }

      this.buttonIsHovered = false
      this.isPaused = true

      // Init
      if (document.readyState === 'complete') {
        Ticker.nextTick(this.init, this)
      } else {
        Emitter.once('siteLoaded', this.init, this)
      }
    }

    /**
     * Init
     */
    init() {
      this.setSize()
      this.setGrid()

      this.createPulseTimeline()

      this.bindEvents()

      if (this.el.classList.contains('is-in-view') && this.isPaused) {
        this.isPaused = false
        Emitter.on('tick', this.tick, this)
      }
    }

    /**
     * Bind events
     */
    bindEvents() {
      Emitter.on('resize', this.onResize, this)

      this.hover.addEventListener('mouseenter', this.onHover.bind(this))
      this.hover.addEventListener('touchstart', this.onHover.bind(this))

      this.hover.addEventListener('mouseleave', this.onOut.bind(this), {
        passive: true,
      })
      this.el.addEventListener('touchstart', this.onOut.bind(this), {
        passive: true,
      })

      this.el.addEventListener('intersect', this.onIntersect.bind(this), {
        passive: true,
      })
    }

    /**
     * Resize handler
     */
    onResize() {
      this.setSize()
      this.setGrid()
    }

    /**
     * Intersect handler
     */
    onIntersect(e: Event) {
      const ce = e as CustomEvent<{ isIntersecting: boolean }>
      
      this.isPaused = !ce.detail.isIntersecting

      if (this.isPaused) {
        Emitter.off('tick', this.tick, this)
      } else {
        if (this.grid.width === 0 || this.grid.height === 0) {
          this.setSize()
          this.setGrid()
        }
        Emitter.on('tick', this.tick, this)
      }
    }

    /**
     * Hover handler
     */
    onHover(e: MouseEvent | TouchEvent) {
      if (this.buttonIsHovered) return

      this.buttonIsHovered = true
      this.hover.classList.add('is-active')

      this.tl.pause()

      clearTimeout(this.wave.timeout as number)
      this.wave.timeout = setTimeout(() => {
        this.waveShock()
      }, 600)

      gsap.to(this.wave, {
        op: 1,
        delay: 0.3,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: true,
      })

      e.stopPropagation()
    }

    /**
     * Out handler
     */
    onOut(e: Event) {
      const target = e.target as HTMLAnchorElement

      if (target.tagName === 'A') {
        window.location.href = target.href

        return
      }

      if (!this.buttonIsHovered) return

      clearTimeout(this.wave.timeout as number)

      this.buttonIsHovered = false
      this.hover.classList.remove('is-active')

      this.tl.play(0)

      gsap.to(this.wave, {
        op: 0,
        duration: 0.7,
        ease: 'expo.inOut',
        overwrite: true,
      })
    }

    /**
     * Set size
     */
    setSize() {
      this.grid.bounding = this.grid.el.getBoundingClientRect()
      this.bounding = this.container.getBoundingClientRect()

      this.ctaMaxSize = Math.min(this.bounding.width, this.bounding.height) - 32
      this.cta.style.setProperty('--size', this.ctaMaxSize + 'px')
    }

    /**
     * Set grid
     */
    setGrid() {
      const { grid } = this

      const width = this.grid.bounding.width
      const height = this.grid.bounding.height

      grid.width = width
      grid.height = height

      grid.svg.style.width = width + 'px'
      grid.svg.style.height = height + 'px'

      // Points
      grid.points = []

      grid.vLines = window.safeWidth > 767 ? 12 : 8
      grid.gapX = width / grid.vLines

      grid.gapY = this.bounding.height / 8
      grid.hLines = Math.floor(height / grid.gapY)

      const offsetY = height - grid.gapY * grid.hLines

      const center = {
        x: width / 2,
        y: height - this.bounding.height / 2,
      }

      for (let i = 0; i <= grid.vLines; i++) {
        const row = []

        for (let j = 0; j <= grid.hLines; j++) {
          const point = {
            x: grid.gapX * i,
            y: grid.gapY * j + (j !== 0 ? offsetY : 0),
            ax: 0, // Acceleration
            ay: 0,
            vx: 0, // Velocity
            vy: 0,
            wx: 0, // Wave
            wy: 0,
            mx: 0, // Movement
            my: 0,
            ox: 0, // Offset
            oy: 0,
            dx: 0, // Distance
            dy: 0,
            dist: 0,
          }

          const dx = point.x - center.x
          const dy = point.y - center.y
          const angle = Math.atan2(dy, dx)

          point.dist = Math.hypot(dx, dy)
          if (point.dist === 0) {
            point.dx = 0
            point.dy = 0
          } else {
            point.dx = Math.cos(angle) * (width / 2 / point.dist) * 5
            point.dy = Math.sin(angle) * (width / 2 / point.dist) * 5
          }

          row.push(point)
        }

        grid.points.push(row)
      }
    }

    /**
     * Create pulse timeline
     */
    createPulseTimeline() {
      const text = this.container.querySelector('.js-button-text')!

      this.tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.2,
      })

      this.tl.call(() => {
        this.wave.state = 'pulse'
      })

      this.tl.fromTo(
        text,
        {
          scale: 0.85,
        },
        {
          scale: 1.05,
          duration: 2.7,
          ease: 'power2.in',
        }
      )

      this.tl.call(this.wavePulse.bind(this), [])

      this.tl.to(text, {
        scale: 0.85,
        duration: 0.15,
        ease: 'power4.out',
      })
    }

    /**
     * Move points
     */
    movePoints(time: number) {
      const { grid, wave } = this

      grid.points.forEach((col: any[], x: number) => {
        col.forEach((point: any, y: number) => {
          if (y === 0 || point.dist === 0) return

          const d = Math.abs(point.dist - wave.progress)
          const l = 30

          if (d < l) {
            const s = 1 - d / l
            const a = Math.atan2(point.dy, point.dx)
            const f = Math.cos(d * 0.01) * s

            point.vx += Math.cos(a) * f * l * 0.5 * wave.strength
            point.vy += Math.sin(a) * f * l * 0.5 * wave.strength
          }

          point.vx += (0 - point.wx) * 0.001 // String tension
          point.vy += (0 - point.wy) * 0.001

          point.vx *= 0.9 // Friction or duration
          point.vy *= 0.9

          point.wx += point.vx * 3 // Strength
          point.wy += point.vy * 3

          const moveMult = this.options.slowImpact ? 0.3 : 0.1
          point.mx = point.wx * moveMult
          point.my = point.wy * moveMult

          if (this.options.isFlat) {
            point.ox = 0
            point.oy = 0
          } else {
            point.ox = point.dx / Math.hypot(window.safeHeight, window.safeWidth)
            point.oy = point.dy / Math.hypot(window.safeHeight, window.safeWidth)

            point.ox = this.easeOut(point.ox)
            point.oy = this.easeOut(point.oy)

            point.ox *= grid.gapX * 75 * (point.dist / this.ctaMaxSize)
            point.oy *= grid.gapY * 75 * (point.dist / this.ctaMaxSize)
          }
        })
      })
    }

    /**
     * Ease out
     */
    easeOut(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    /**
     * Draw lines
     */
    drawLines() {
      const { grid } = this

      let d = ''

      // Vertical lines
      grid.points.forEach((col: any[]) => {
        col.forEach((point: any, i: number) => {
          const p = this.movedPoint(point)

          if (i === 0) {
            d += `M ${p.x} ${p.y} `
          } else {
            d += `L ${p.x} ${p.y} `
          }
        })
      })

      // Horizontal lines
      for (let y = 0; y < grid.hLines; y++) {
        grid.points.forEach((col, x) => {
          const point = col[y]
          const p = this.movedPoint(point)

          if (x === 0) {
            d += `M ${p.x} ${p.y} `
          } else {
            d += `L ${p.x} ${p.y} `
          }
        })
      }

      grid.path.setAttribute('d', d)
    }

    /**
     * Get point coordinates with movement added
     */
    movedPoint(point: any) {
      return {
        x: point.x + point.mx + point.ox * this.wave.op,
        y: point.y + point.my + point.oy * this.wave.op,
      }
    }

    /**
     * Wave pulse
     */
    wavePulse() {
      if (this.buttonIsHovered) return

      const { wave } = this

      wave.progress = 0
      wave.state = 'pulse'
      wave.speed = window.safeWidth > 767 ? (this.options.slowImpact ? 8 : 20) : (this.options.slowImpact ? 5 : 15)
      wave.strength = window.safeWidth > 767 ? (this.options.slowImpact ? 1 : 1) : (this.options.slowImpact ? 0.3 : 0.35)
    }

    /**
     * Wave shock
     */
    waveShock() {
      const { wave } = this

      if (!this.buttonIsHovered || wave.state === 'shock') return

      wave.progress = 0
      wave.state = 'shock'
      wave.speed = this.options.slowImpact ? 12 : 30
      wave.strength = this.options.slowImpact ? 10 : 5
    }

    /**
     * Tick
     */
    tick(time: any) {
      const { wave } = this

      if (wave.progress < this.grid.height) {
        if (wave.state !== 'paused') {
          wave.progress += wave.speed
        }
      }

      this.movePoints(time)
      this.drawLines()
    }
  }

  

