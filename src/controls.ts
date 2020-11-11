export type keyDirection = 'up' | 'right' | 'down' | 'left'

export interface ControlsObserver {
  onDirectionChange(direction: keyDirection): void
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
  private direction: keyDirection | null = null

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
    const newDirection: keyDirection | void = this.getKeyDirection(key)

    if (!newDirection) return

    this.direction = newDirection

    // Notify observers
    for (const observer of this.observers) {
      observer.onDirectionChange(this.direction)
    }
  }

  addKeymap(map: keymap) {
    this.keymaps.push(map)
  }

  addObserver(observer: ControlsObserver) {
    this.observers.push(observer)
  }

  removeObserver(observer: ControlsObserver) {
    const id = this.observers.findIndex((o) => o === observer)
    this.observers.splice(id, 1)
  }
}
