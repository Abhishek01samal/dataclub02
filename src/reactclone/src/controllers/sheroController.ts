import Emitter from '@clone/utils/Emitter'
import Ticker from '@clone/utils/Ticker'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(DrawSVGPlugin, SplitText)

export function initSHero(el: HTMLElement) {
  new Section(el)
}

class Section {
  el: HTMLElement
  words: NodeListOf<HTMLElement>

  isPaused: boolean
  isWaiting: boolean
  st!: SplitText

  constructor(el: HTMLElement) {
    this.el = el
    this.words = this.el.querySelectorAll('.js-word')

    this.isPaused = true
    this.isWaiting = true

    if (document.readyState === 'complete') {
      Ticker.nextTick(this.init, this)
    } else {
      Emitter.once('siteLoaded', this.init, this)
    }
  }

  init() {
    this.splitWords()

    this.bindEvents()
  }

  bindEvents() {
    Emitter.on('resize', this.onResize, this)

    document.addEventListener('intro', this.intro.bind(this), { once: true })

    this.el.addEventListener('intersect', this.onIntersect.bind(this), {
      passive: true,
    })

    Emitter.on('tick', this.tick, this)
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

  onResize() {
    this.splitWords()
  }

  intro() {
    const waves = this.el.querySelector('a-waves')
    const lines = waves!.querySelectorAll('.js-line')
    const content = this.el.querySelector('.js-content') as HTMLElement
    const border = this.el.querySelector('.js-border') as HTMLElement
    const chars = content.querySelectorAll('.char__inner')
    const separators = content.querySelectorAll('.js-separator')
    const star = content.querySelector('.js-star')

    const tl = gsap.timeline()

    tl.fromTo(
      lines,
      {
        drawSVG: '100% 100%',
      },
      {
        drawSVG: '0% 100%',
        duration: 3,
        ease: 'expo.out',
        stagger: {
          amount: 0.5,
          from: 'edges',
          ease: 'power3.inOut',
        },
      },
      0.5
    )

    tl.call(() => {
      waves!.dispatchEvent(new CustomEvent('introend'))
    }, null, '-=1')

    tl.set(
      this.el,
      {
        opacity: 1,
      },
      0
    )

    tl.to(
      border,
      {
        scaleY: 0.025,
        y: -content.clientHeight,
        duration: 1,
        ease: 'expo.inOut',
      },
      0
    )

    tl.from(
      waves,
      {
        y: '100%',
        duration: 1.35,
        ease: 'expo.out',
      },
      0
    )

    tl.fromTo(
      content,
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1,
        ease: 'expo.inOut',
      },
      1
    )

    tl.to(
      border,
      {
        scaleY: 1,
        y: 0,
        duration: 1,
        ease: 'expo.inOut',
      },
      1
    )

    tl.from(
      star,
      {
        rotate: 90,
        duration: 2,
        ease: 'expo.out',
      },
      1.5
    )

    tl.fromTo(
      chars,
      {
        y: '-200%',
      },
      {
        y: '-100%',
        duration: 2,
        ease: 'expo.inOut',
        stagger: 0.02,
      },
      0.45
    )

    tl.from(
      separators,
      {
        y: (index: number) => (index % 2 === 0 ? '-100%' : '100%'),
        duration: 1.5,
        ease: 'expo.inOut',
      },
      0.75
    )

    tl.call(() => {
      this.isWaiting = false
    })
  }

  splitWords() {
    if (this.st) {
      this.st.revert()
    }

    this.st = new SplitText(this.words, {
      type: 'words,chars',
      charsClass: 'char',
      wordsClass: 'word',
    })

    this.st.chars.forEach((char: HTMLElement) => {
      const letter = char.textContent || ''

      char.classList.add('char--' + letter)

      const inner = document.createElement('span')
      inner.classList.add('char__inner')

      inner.dataset.letter = letter.toUpperCase()
      inner.innerHTML = letter

      char.innerHTML = inner.outerHTML
    })
  }

  animateChar() {
    if (this.isWaiting || Math.random() > 0.01) return

    const char = this.st.chars[Math.floor(Math.random() * this.st.chars.length)]

    if (
      char.classList.contains('to-top') ||
      char.classList.contains('to-right') ||
      char.classList.contains('to-bottom') ||
      char.classList.contains('to-left')
    )
      return

    const direction = Math.floor(Math.random() * 4)

    const className = 'to-' + ['bottom', 'left', 'top', 'right'][direction]

    char.classList.add(className)

    setTimeout(() => {
      char.classList.remove(className)
    }, 2000)
  }

  tick() {
    this.animateChar()
  }
}
