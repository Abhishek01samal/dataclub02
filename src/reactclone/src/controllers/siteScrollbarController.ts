import Emitter from '@clone/utils/Emitter'

export function initSiteScrollbar(el: HTMLElement) {
  new Scrollbar(el)
}

class Scrollbar {
  el: HTMLElement
  thumb: HTMLElement

  drag: {
    start: {
      y: number
      scroll: number
    }
  }

  isDragging: boolean

  constructor(el: HTMLElement) {
    this.el = el
    this.thumb = el.querySelector('.js-thumb') as HTMLElement

    this.drag = {
      start: {
        y: 0,
        scroll: 0,
      },
    }

    this.isDragging = false

    document.documentElement.classList.add('has-scrollbar')

    this.bindEvents()
  }

  bindEvents() {
    const { thumb } = this

    Emitter.on('resize', this.setScrollbar, this)
    Emitter.on('scroll', this.setScrollbar, this)
    Emitter.on('siteLoaded', this.setScrollbar, this, true)
    Emitter.on('updateViewport', this.setScrollbar, this, true)

    thumb.addEventListener('mousedown', this.onDragStart.bind(this), {
      passive: false,
    })
    thumb.addEventListener('touchstart', this.onDragStart.bind(this), {
      passive: false,
    })

    document.addEventListener('mousemove', this.onDragMove.bind(this), {
      passive: false,
    })
    document.addEventListener('touchmove', this.onDragMove.bind(this), {
      passive: false,
    })

    document.addEventListener('mouseup', this.onDragEnd.bind(this), {
      passive: false,
    })
    document.addEventListener('touchend', this.onDragEnd.bind(this), {
      passive: false,
    })
  }

  setScrollbar() {
    const scrollbarHeight =
      (window.safeHeight / document.body.scrollHeight) * window.safeHeight
    const scrollbarTop =
      window.scrollProgress * (window.safeHeight - scrollbarHeight)

    this.el.style.setProperty('--scrollbar-height', `${scrollbarHeight}px`)
    this.el.style.setProperty('--scrollbar-top', `${scrollbarTop}px`)
  }

  onDragStart(e: MouseEvent | TouchEvent) {
    const { el, drag } = this

    this.isDragging = true

    drag.start.y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY
    drag.start.scroll = window.scrollProgress

    el.classList.add('is-dragging')

    e.preventDefault()
  }

  onDragMove(e: MouseEvent | TouchEvent) {
    if (!this.isDragging) return

    const { drag } = this

    const dragY =
      e instanceof MouseEvent ? e.clientY : e.touches && e.touches[0].clientY
    const dragDelta = dragY - drag.start.y
    const dragProgress = dragDelta / window.safeHeight
    const newScrollProgress = drag.start.scroll + dragProgress
    const scrollMove = newScrollProgress * window.maxScrollTop

    window.scrollTo(0, scrollMove)

    e.preventDefault()
  }

  onDragEnd(e: Event) {
    if (!this.isDragging) return

    const { el } = this

    this.isDragging = false
    el.classList.remove('is-dragging')

    e.preventDefault()
  }
}
