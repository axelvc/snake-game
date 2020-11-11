export type keyDirection = 'up' | 'right' | 'down' | 'left'

export interface ControlsObserver {
  updateDirection(direction: keyDirection): void
}

type keymap = {
  [key in keyDirection]: string
}

interface ControlsInterface {
  addKeymap(map: keymap): void
  addObserver(observer: ControlsObserver): void
}

export class Controls implements ControlsInterface {
  private observers: ControlsObserver[] = []
  private keymaps: keymap[] = []
  direction: string | null = null

  constructor() {
    document.addEventListener('keydown', this.validateKey.bind(this))
  }

  private getKeyDirection(keyPressed: string): keyDirection | void {
    for (const keymap of this.keymaps) {
      for (const [direction, key] of Object.entries(keymap)) {
        if (key === keyPressed) {
          return direction as keyDirection
        }
      }
    }
  }

  private validateKey({ key }: KeyboardEvent) {
    const direction: keyDirection | void = this.getKeyDirection(key)

    if (!direction) return

    for (const observer of this.observers) {
      observer.updateDirection(direction)
    }
  }

  addKeymap(map: keymap) {
    this.keymaps.push(map)
  }

  addObserver(observer: ControlsObserver) {
    this.observers.push(observer)
  }
}
