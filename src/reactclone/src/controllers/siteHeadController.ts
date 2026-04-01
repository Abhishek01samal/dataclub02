import Emitter from '@clone/utils/Emitter'
import Ticker from '@clone/utils/Ticker'
import { gsap } from 'gsap'

export function initSiteHead(el: HTMLElement) {
  new Section(el)
}

class Section {
  el: HTMLElement
  contrastButton: HTMLElement
  consoleEl: HTMLElement
  contrastMask: HTMLElement
  links: NodeListOf<HTMLElement>

  messages: string[]
  message: string
  messageLineBreak: boolean
  lastMessage: string
  lastTypeTime: number
  writeDelay: number
  canWrite: boolean
  isPaused: boolean

  constructor(el: HTMLElement) {
    this.el = el
    this.contrastButton = document.querySelector('.js-contrast') as HTMLElement
    this.consoleEl = el.querySelector('.js-console') as HTMLElement
    this.contrastMask = document.querySelector('.js-contrast-mask') as HTMLElement
    this.links = el.querySelectorAll('.js-menu-link')

    this.messages = [
      'Preparing for inevitable debugging',
      'Compiling designer dreams…into developer nightmares',
      'Please wait while I overthink this',
      'Optimizing… but nothing’s perfect',
      'Configuring the next minor inconvenience',
      'Fetching assets… contemplating the futility of it all',
      'Re-routing your expectations… expect delays',
      'Trying to animate enthusiasm… it’s not going well',
      'Stuck in an infinite loop',
      'Loading… still pointless',
      'Simulating progress… sort of',
      'This will probably break soon',
      'Simulating something useful',
      'Progress bar full of lies',
      'Finding meaning in the code',
      'Calculating failure probabilities',
      'Please wait… indefinitely',
      'Loading… almost there!',
      'Animating pixels with love',
      'Integrating magic and code',
      'Optimizing creativity… stand by',
      'Design and code handshake',
      'Fetching creativity… almost done!',
      'Preparing awesomeness',
      'Simulating brilliance… probably',
      'Everything is under control',
      'Loading coolness… almost ready',
      'Calibrating designer dreams',
      'Fusing design and animation',
      'Running creativity protocols',
      'Crafting magic… please wait',
      'Making things pretty… hold on',
      'Loading… this might take a bit',
      'Animating pixels… somewhat precisely',
      'Integrating code and reality',
      'Halfway done… maybe',
      'Optimizing… cautiously hopeful',
      'Design meets code… fingers crossed',
      'Fetching some interesting stuff',
      'Preparing… slowly but surely',
      'Aligning pixels… carefully',
      'Calibrating… what exactly? Good question',
      'Waiting… patience is key',
      'Simulating… something, probably',
      'Loading… feel free to blink',
      'Running some clever algorithms',
      'Almost there… give or take',
      'Integrating… like a pro',
      'Crafting… without breaking anything',
      'Adjusting fonts… nearly invisible',
      'Piecing it together… stay tuned',
      'Loading… nothing to see yet',
      'Running final checks… hopefully',
      'Almost ready… trust me',
      'Building… it’s getting there',
      'Loading… but why rush?',
      'Please wait… or don’t, whatever',
      'Initializing… prepare for bugs',
      'Optimizing… but who cares?',
      'Deploying… probably not broken',
      'Making things work… hopefully',
      'Running… but not too fast',
      'Testing patience… stay calm',
      'Initializing… no promises',
      'Loading… but who’s counting?',
      'Loading… could be worse',
    ]
    this.message = ''
    this.messageLineBreak = false
    this.lastMessage = ''
    this.lastTypeTime = 0
    this.writeDelay = 0
    this.canWrite = false
    this.isPaused = true

    Ticker.nextTick(this.init, this)
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.contrastButton.addEventListener('click', this.toggleContrast.bind(this), {
      passive: true,
    })

    this.links.forEach((link) => {
      link.addEventListener('click', this.moveToSection.bind(this))
    })

    document.addEventListener('intro', this.intro.bind(this), { once: true })

    this.el.addEventListener('intersect', this.onIntersect.bind(this), {
      passive: true,
    })
  }

  onIntersect(e: Event) {
    const ce = e as CustomEvent<{ isIntersecting: boolean }>
    this.isPaused = !ce.detail.isIntersecting

    if (this.isPaused) {
      Emitter.off('tick', this.updateConsole, this)
    } else {
      Emitter.on('tick', this.updateConsole, this)
    }
  }

  intro() {
    const logo = this.el.querySelector('.js-logo')
    const menuItems = this.el.querySelectorAll('.js-menu-item')
    const qrCode = this.el.querySelector('.js-qr-code')

    const items = [logo, ...menuItems]

    const tl = gsap.timeline()

    tl.set(this.el, {
      opacity: 1,
    })

    tl.from(
      this.el,
      {
        y: '-100%',
        duration: 1.5,
        ease: 'expo.inOut',
      },
      1
    )

    tl.from(
      items,
      {
        y: '-100%',
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
      },
      1.5
    )

    tl.fromTo(
      qrCode,
      {
        '--bg-p': '0%',
      },
      {
        '--bg-p': '100%',
        duration: 1.5,
        ease: 'expo.out',
      },
      1.75
    )

    tl.call(
      () => {
        this.canWrite = true
      },
      null,
      1.5
    )
  }

  toggleContrast() {
    let fromX = '0'
    let toX = '-100%'

    if (document.documentElement.classList.contains('theme-contrasted')) {
      fromX = '-100%'
      toX = '0'
    }

    gsap.fromTo(
      this.contrastMask,
      {
        x: fromX,
      },
      {
        x: toX,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          this.contrastMask.style.transform = ''

          if (toX === '0') {
            document.documentElement.classList.remove('theme-contrasted')
          } else {
            document.documentElement.classList.add('theme-contrasted')
          }

          Emitter.emit(
            'contrastchange',
            document.documentElement.classList.contains('theme-contrasted')
              ? 'contrasted'
              : 'default'
          )
        },
      }
    )

    if (toX !== '0') {
      document.documentElement.classList.add('theme-contrasted')
    }
  }

  moveToSection(e: MouseEvent) {
    e.preventDefault()

    const id = (e.currentTarget as HTMLAnchorElement).getAttribute('href')

    window.lenis.scrollTo(id, {
      duration: 1.5,
      easing: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    })
  }

  updateConsole(time: number) {
    if (!this.canWrite || time - this.lastTypeTime < this.writeDelay) {
      return
    }

    if (this.message === '') {
      this.message = this.getRandomMessage()
      this.writeDelay = 2000
    } else {
      if (this.message === this.lastMessage || this.messageLineBreak) {
        this.consoleEl.textContent += '\n'
      }

      const char = this.message.charAt(0)
      this.message = this.message.substring(1)

      if (char === ',') {
        this.writeDelay = 100
      } else if (char === ' ') {
        this.writeDelay = 100
      } else if (char === '') {
        this.writeDelay = 200
      } else if (char === '…') {
        this.writeDelay = 400
      } else if (char === '.') {
        this.writeDelay = 400
      } else {
        this.writeDelay = 20
      }

      this.consoleEl.textContent += char

      if (char === '…') {
        this.messageLineBreak = true
      } else {
        this.messageLineBreak = false
      }
    }

    this.consoleEl.textContent = this.consoleEl.textContent
      .split('\n')
      .slice(-5)
      .join('\n')

    this.lastTypeTime = time
  }

  getRandomMessage() {
    let message = this.messages[Math.floor(Math.random() * this.messages.length)]

    if (message === this.lastMessage) {
      message = this.getRandomMessage()
    }

    this.lastMessage = message

    return message
  }
}
