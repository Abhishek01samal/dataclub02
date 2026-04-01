import Emitter from '@clone/utils/Emitter'
import Ticker from '@clone/utils/Ticker'

export function initSAbout(el: HTMLElement) {
  new Section(el)
}

  class Section {
    el: HTMLElement
    inner: HTMLElement
    svg: HTMLElement
    path: HTMLElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    awards: NodeListOf<HTMLElement>

    smileyImages: {
      main: HTMLImageElement
      contrasted: HTMLImageElement
    }

    bounding: {
      left: number
      top: number
      width: number
      height: number
      innerWidth: number
      innerHeight: number
      offsetY: number
    }

    scroll: {
      start: number
      end: number
      p: number
      sp: number
    }

    lines: any[]
    smileys: any[]

    isPaused: boolean
    isForced: boolean

    /**
     * Constructor
     */
    constructor(el: HTMLElement) {
      this.el = el
      this.inner = this.el.querySelector('.js-inner')
      this.svg = this.el.querySelector('.js-grid')
      this.path = this.el.querySelector('.js-path')
      this.canvas = this.el.querySelector('.js-canvas') as HTMLCanvasElement
      this.ctx = this.canvas.getContext('2d')!
      this.awards = this.el.querySelectorAll('.js-award')

      // Properties
      this.lines = []
      this.smileys = []

      this.isPaused = true
      this.isForced = false

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
      this.createSmiley()

      this.setSize()
      this.setScroll()

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
      Emitter.on('scroll', this.onScroll, this)

      // Reveal on scroll
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.5,
        }
      )

      this.awards.forEach((award) => {
        observer.observe(award)

        const awardInteraction = this.onAwardInteraction.bind(this, award)
        award.addEventListener('mouseenter', awardInteraction, {
          passive: true,
        })
        award.addEventListener('touchstart', awardInteraction, {
          passive: true,
        })
      })

      this.el.addEventListener('intersect', this.onIntersect.bind(this), {
        passive: true,
      })
    }

    /**
     * Resize handler
     */
    onResize(widthChanged: boolean, heightChanged: boolean) {
      if (widthChanged) {
        this.setSize()
        this.setScroll()

        this.isForced = true
      }
    }

    /**
     * Scroll handler
     */
    onScroll(scrollY) {
      const { scroll } = this

      const trigger = scrollY + window.safeHeight

      if (trigger < scroll.start) {
        scroll.p = 0
      } else if (trigger > scroll.end) {
        scroll.p = 1
      } else {
        scroll.p = (trigger - scroll.start) / (scroll.end - scroll.start)
      }
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
        Emitter.on('tick', this.tick, this)
      }
    }

    /**
     * Award interaction handler
     */
    onAwardInteraction(award) {
      award.classList.add('is-active')

      this.throwSmileys(award)

      setTimeout(() => {
        award.classList.remove('is-active')
      }, 100)
    }

    /**
     * Create smiley
     */
    createSmiley() {
      const mainImg = new Image(100, 100)
      mainImg.src = '/images/asset-smiley--main.svg'

      const contrastedImg = new Image(100, 100)
      contrastedImg.src = '/images/asset-smiley--contrasted.svg'

      this.smileyImages = {
        main: mainImg,
        contrasted: contrastedImg,
      }
    }

    /**
     * Set size
     */
    setSize() {
      const { canvas, svg } = this

      const bounding = this.el.getBoundingClientRect()

      this.bounding = {
        left: bounding.left,
        top: bounding.top,
        width: this.el.clientWidth,
        height: this.el.clientHeight,
        innerWidth: this.inner.clientWidth,
        innerHeight: this.inner.clientHeight,
        offsetY: 0,
      }

      svg.style.width = `${this.bounding.width}px`
      svg.style.height = `${this.bounding.height}px`

      canvas.width = this.bounding.width
      canvas.height = this.bounding.height
    }

    /**
     * Set scroll
     */
    setScroll() {
      const { bounding } = this

      this.scroll = {
        start: bounding.top + window.scrollY,
        end:
          bounding.top + window.scrollY + bounding.height + window.safeHeight,
        p: 0,
        sp: 0,
      }

      this.onScroll(window.scrollY)
      this.scroll.sp = this.scroll.p
    }

    /**
     * Set lines
     */
    setLines() {
      const { bounding } = this

      this.lines = []

      // Calculate gaps and inner position
      const innerX = (bounding.width - bounding.innerWidth) / 2
      const innerY =
        (bounding.height - bounding.innerHeight) / 2 + bounding.offsetY

      const vLines = window.safeWidth > 767 ? 12 : 8
      const hLines = 4

      const outerGapX = bounding.width / vLines
      const outerGapY = bounding.height / vLines
      const innerGapX = bounding.innerWidth / vLines
      const innerGapY = bounding.innerHeight / vLines
      const hGap = 1 / hLines

      // Corner lines
      const outer = {
        x1: 0,
        x2: bounding.width,
        y1: 0,
        y2: bounding.height,
      }
      const inner = {
        x1: innerX,
        x2: innerX + bounding.innerWidth,
        y1: innerY,
        y2: innerY + bounding.innerHeight,
      }
      const corners = []

      // Top left
      corners.push([
        { x: outer.x1, y: outer.y1 },
        { x: inner.x1, y: inner.y1 },
      ])

      // Top right
      corners.push([
        { x: outer.x2, y: outer.y1 },
        { x: inner.x2, y: inner.y1 },
      ])

      // Bottom right
      corners.push([
        { x: outer.x2, y: outer.y2 },
        { x: inner.x2, y: inner.y2 },
      ])

      // Bottom left
      corners.push([
        { x: outer.x1, y: outer.y2 },
        { x: inner.x1, y: inner.y2 },
      ])

      // Top & bottom lines, vertical
      for (let i = 1; i < vLines; i++) {
        this.lines.push([
          { x: outerGapX * i, y: outer.y1 },
          { x: innerX + innerGapX * i, y: inner.y1 },
        ])

        this.lines.push([
          { x: outerGapX * i, y: outer.y2 },
          { x: innerX + innerGapX * i, y: inner.y2 },
        ])
      }

      // Top lines, horizontal
      for (let i = 1; i < hLines; i++) {
        const index = 1 - Math.pow(1 - hGap * i, 2)

        const l1 = corners[0]
        const l2 = corners[1]

        // Get a point at i * hGap
        const p1 = {
          x: l1[0].x + (l1[1].x - l1[0].x) * index,
          y: l1[0].y + (l1[1].y - l1[0].y) * index,
        }

        const p2 = {
          x: l2[0].x + (l2[1].x - l2[0].x) * index,
          y: l2[0].y + (l2[1].y - l2[0].y) * index,
        }

        this.lines.push([p1, p2])
      }

      // Bottom lines, horizontal
      for (let i = 1; i < hLines; i++) {
        const index = 1 - Math.pow(1 - hGap * i, 2)

        const l1 = corners[3]
        const l2 = corners[2]

        // Get a point at i * hGap
        const p1 = {
          x: l1[0].x + (l1[1].x - l1[0].x) * index,
          y: l1[0].y + (l1[1].y - l1[0].y) * index,
        }

        const p2 = {
          x: l2[0].x + (l2[1].x - l2[0].x) * index,
          y: l2[0].y + (l2[1].y - l2[0].y) * index,
        }

        this.lines.push([p1, p2])
      }

      // Right & left lines, vertical
      for (let i = 0; i <= vLines; i++) {
        this.lines.push([
          { x: outer.x1, y: outerGapY * i },
          { x: inner.x1, y: innerY + innerGapY * i },
        ])

        this.lines.push([
          { x: outer.x2, y: outerGapY * i },
          { x: inner.x2, y: innerY + innerGapY * i },
        ])
      }

      // Right lines, horizontal
      for (let i = 1; i < hLines; i++) {
        const index = 1 - Math.pow(1 - hGap * i, 2)

        const l1 = corners[1]
        const l2 = corners[2]

        // Get a point at i * hGap
        const p1 = {
          x: l1[0].x + (l1[1].x - l1[0].x) * index,
          y: l1[0].y + (l1[1].y - l1[0].y) * index,
        }

        const p2 = {
          x: l2[0].x + (l2[1].x - l2[0].x) * index,
          y: l2[0].y + (l2[1].y - l2[0].y) * index,
        }

        this.lines.push([p1, p2])
      }

      // Left lines, horizontal
      for (let i = 1; i < hLines; i++) {
        const index = 1 - Math.pow(1 - hGap * i, 2)

        const l1 = corners[0]
        const l2 = corners[3]

        // Get a point at i * hGap
        const p1 = {
          x: l1[0].x + (l1[1].x - l1[0].x) * index,
          y: l1[0].y + (l1[1].y - l1[0].y) * index,
        }

        const p2 = {
          x: l2[0].x + (l2[1].x - l2[0].x) * index,
          y: l2[0].y + (l2[1].y - l2[0].y) * index,
        }

        this.lines.push([p1, p2])
      }

      this.drawLines()
    }

    /**
     * Draw lines
     */
    drawLines() {
      let d = ''

      this.lines.forEach((points) => {
        let p1 = points[0]
        let p2 = points[1]

        d += 'M ' + p1.x + ' ' + p1.y + ' L ' + p2.x + ' ' + p2.y + ' '
      })

      this.path.setAttribute('d', d)
    }

    /**
     * Throw smileys
     */
    throwSmileys(award) {
      const { el, ctx, smileyImages, smileys } = this

      const image = document.documentElement.classList.contains(
        'theme-contrasted'
      )
        ? smileyImages.contrasted
        : smileyImages.main

      const elBounding = el.getBoundingClientRect()
      const awardBounding = award.getBoundingClientRect()

      const x = awardBounding.left + awardBounding.width * 0.5 - elBounding.left
      const y = awardBounding.top + awardBounding.height * 0.5 - elBounding.top

      const maxSmileys = window.safeWidth > 767 ? 10 : 5
      for (let i = 0; i < maxSmileys; i++) {
        const smiley = new Smiley(ctx, image, x, y)

        smileys.push(smiley)
      }
    }

    /**
     * Move smileys
     */
    moveSmileys() {
      const { bounding, smileys } = this

      smileys.forEach((smiley) => {
        smiley.move()

        if (smiley.y > bounding.height) {
          smileys.splice(smileys.indexOf(smiley), 1)
        }
      })
    }

    /**
     * Draw canvas
     */
    drawCanvas() {
      const { bounding, ctx, smileys } = this

      ctx.fillStyle = 'red'

      ctx.clearRect(0, 0, bounding.width, bounding.height)

      smileys.forEach((smiley) => {
        smiley.draw()
      })
    }

    /**
     * Tick
     */
    tick() {
      const { bounding, el, scroll } = this

      // Smooth scroll
      scroll.sp += (scroll.p - scroll.sp) * 0.2
      const sd = Math.round((scroll.p - scroll.sp) * 1000) / 1000

      bounding.offsetY =
        (window.safeWidth > 767 ? 400 : 200) * (this.scroll.sp * 2 - 1)

      el.style.setProperty('--offset-y', `${this.bounding.offsetY}px`)

      // Lines
      if (sd !== 0 || this.isForced) {
        this.setLines()
        this.drawLines()
      }

      // Smileys
      if (this.smileys.length) {
        this.moveSmileys()
        this.drawCanvas()
      }

      this.isForced = false
    }
  }

  class Smiley {
    ctx: CanvasRenderingContext2D
    image: HTMLImageElement

    width: number
    height: number
    x: number
    y: number
    r: number
    a: number
    va: number
    vx: number
    vy: number
    vr: number

    /**
     * Constructor
     */
    constructor(ctx, image, x, y) {
      // Elements
      this.ctx = ctx
      this.image = image

      // Properties
      this.width = 48
      this.height = 48
      this.x = x
      this.y = y
      this.r = 0
      this.a = 0.25 + Math.random() * 0.75
      this.vx = (Math.random() * 2 - 1) * 5
      this.vy = Math.random() * -10 - 5
      this.vr = (Math.random() * 2 - 1) * 10
      this.va = Math.random() * 0.01
    }

    /**
     * Move smiley
     */
    move() {
      this.vy += 0.45

      this.x += this.vx
      this.y += this.vy
      this.r += this.vr
      this.a += this.va
    }

    /**
     * Draw smiley
     */
    draw() {
      const { ctx, image } = this

      ctx.save()

      ctx.translate(
        this.x + this.width * 0.5 * this.a,
        this.y + this.height * 0.5 * this.a
      )

      ctx.rotate((this.r * Math.PI) / 180)

      ctx.translate(
        -this.x - this.width * 0.5 * this.a,
        -this.y - this.height * 0.5 * this.a
      )

      ctx.drawImage(
        image,
        this.x,
        this.y,
        this.width * this.a,
        this.height * this.a
      )

      ctx.restore()
    }
  }

  

