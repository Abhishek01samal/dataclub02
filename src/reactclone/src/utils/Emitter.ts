type EventHandler = {
  cb: (...args: unknown[]) => void
  context: unknown
  once: boolean
}

class Emitter {
  events: Record<string, EventHandler[]>

  constructor() {
    this.events = {}
  }

  on(
    name: string,
    callback: (...args: unknown[]) => void,
    context: unknown,
    once = false
  ) {
    if (!this.events[name]) {
      this.events[name] = []
    }

    let exists = false
    this.events[name].forEach((object) => {
      if (object.cb === callback && object.context === context) {
        exists = true
      }
    })
    if (exists) {
      return
    }

    this.events[name].push({
      cb: callback,
      context: context,
      once: once,
    })
  }

  once(name: string, callback: (...args: unknown[]) => void, context: unknown) {
    this.on(name, callback, context, true)
  }

  emit(name: string, ...data: unknown[]) {
    const self = this

    if (this.events[name]) {
      this.events[name].forEach((object, index) => {
        object.cb.apply(object.context, data)

        if (object.once) {
          delete self.events[name][index]
        }
      })
    }
  }

  off(name: string, callback: (...args: unknown[]) => void, context: unknown) {
    const self = this

    if (this.events[name]) {
      this.events[name].forEach((object, index) => {
        if (object.cb === callback && object.context === context) {
          delete self.events[name][index]
        }
      })
    }
  }
}

export default new Emitter()
