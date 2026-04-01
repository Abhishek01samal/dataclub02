class AWork extends HTMLElement {
  static observedAttributes = ['progress']

  link!: HTMLAnchorElement
  video!: HTMLVideoElement

  isPlaying = false

  connectedCallback() {
    this.video = this.querySelector('.js-video') as HTMLVideoElement
    this.link = this.querySelector('a') as HTMLAnchorElement

    this.isPlaying = false

    this.link.addEventListener('click', this.onClick.bind(this))
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'progress') {
      this.style.setProperty('--progress', newValue || '')

      if (newValue === '1' || newValue === '-1') {
        if (this.isPlaying) {
          this.outView()
        }
      } else {
        if (!this.isPlaying) {
          this.inView()
        }
      }
    }
  }

  inView() {
    this.video.play()
    this.isPlaying = true

    this.classList.add('is-inview')
  }

  outView() {
    this.video.pause()
    this.isPlaying = false

    this.classList.remove('is-inview')
  }

  onClick(event: MouseEvent) {
    if (this.link.href.includes('#')) {
      event.preventDefault()
    }
  }
}

if (!customElements.get('a-work')) {
  customElements.define('a-work', AWork)
}
