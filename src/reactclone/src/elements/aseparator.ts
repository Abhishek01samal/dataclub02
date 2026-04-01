import Emitter from '@clone/utils/Emitter'

class ASeparator extends HTMLElement {
  chars!: NodeListOf<HTMLElement>
  codes!: NodeListOf<HTMLElement>
  isPaused = true

  connectedCallback() {
    this.codes = this.querySelectorAll('.js-code')
    this.chars = this.querySelectorAll('.js-char')

    this.isPaused = true

    this.bindEvents()
  }

  bindEvents() {
    this.addEventListener('intersect', this.onIntersect.bind(this), {
      passive: true,
    })
  }

  onIntersect(e: Event) {
    const ce = e as CustomEvent<{ isIntersecting: boolean }>
    this.isPaused = !ce.detail.isIntersecting

    if (this.isPaused) {
      Emitter.off('tick', this.tick, this)
    } else {
      Emitter.on('tick', this.tick, this)
    }
  }

  tick() {
    this.chars.forEach((char) => {
      if (char.classList.contains('a__char--blank') || Math.random() > 0.1) return

      char.classList.remove('a__char--0')
      char.classList.remove('a__char--1')
      char.classList.add('a__char--' + (Math.random() > 0.5 ? '0' : '1'))
    })
  }
}

if (!customElements.get('a-separator')) {
  customElements.define('a-separator', ASeparator)
}
