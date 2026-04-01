import type Lenis from 'lenis'

declare global {
  interface Window {
    safeWidth: number
    safeHeight: number
    maxScrollTop: number
    scrollProgress: number
    lenis: Lenis
  }
}

export {}
