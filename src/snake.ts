import { CanvasSizes } from './canvas'
import { ControlsObserver, keyDirection } from './controls'
import { CellPosition, GameElement, compareCells } from './game.js'

export class Snake implements GameElement, ControlsObserver {
  private direction: keyDirection | null = null
  position: CellPosition[] = []

  private isStepBack(newDirection: keyDirection): boolean {
    switch (this.direction) {
      case 'right':
        return newDirection === 'left'
      case 'left':
        return newDirection === 'right'
      case 'down':
        return newDirection === 'up'
      case 'up':
        return newDirection === 'down'
      default:
        return false
    }
  }

  private getNewPosition({ cell }: CanvasSizes): CellPosition {
    let { x, y } = this.position[0]

    switch (this.direction) {
      case 'right':
        x += cell
        break
      case 'left':
        x -= cell
        break
      case 'down':
        y += cell
        break
      default:
        y -= cell
        break
    }

    return { x, y }
  }

  checkSelfCollision(): never | void {
    const head = this.position[0]

    const collision = this.position
      .slice(1)
      .some((cell) => compareCells(cell, head))

    if (collision) {
      throw new Error('Snake crashed into himself')
    }
  }

  checkRangeCollision({ cell, columns, rows }: CanvasSizes): never | void {
    const head = this.position[0]
    const limits = [-cell, columns * cell, rows * cell]

    if (limits.includes(head.x) || limits.includes(head.y)) {
      throw new Error('Snake crashed with the wall')
    }
  }

  reset({ cell, columns, rows }: CanvasSizes) {
    // Set snake in the center
    this.position = [
      {
        x: cell * Math.floor(columns / 2),
        y: cell * Math.floor(rows / 2),
      },
    ]
  }

  updatePosition(sizes: CanvasSizes, fruitCollected: boolean) {
    this.position.unshift(this.getNewPosition(sizes))

    if (!fruitCollected) {
      this.position.pop()
    }
  }

  onDirectionChange(direction: keyDirection) {
    if (this.position.length === 1 || !this.isStepBack(direction)) {
      this.direction = direction
    }
  }

  checkCollision(sizes: CanvasSizes): never | void {
    this.checkSelfCollision()
    this.checkRangeCollision(sizes)
  }
}
