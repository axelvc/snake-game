import { CanvasSizes } from './canvas.js'
import { ControlsObserver, keyDirection } from './controls.js'
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

  private checkSelfCollision(): boolean {
    const head = this.position[0]

    return this.position.slice(1).some((cell) => compareCells(cell, head))
  }

  private checkRangeCollision({ cell, columns, rows }: CanvasSizes): boolean {
    const head = this.position[0]
    const limits = [-cell, columns * cell, rows * cell]

    return limits.includes(head.x) || limits.includes(head.y)
  }

  onDirectionChange(direction: keyDirection) {
    if (this.position.length === 1 || !this.isStepBack(direction)) {
      this.direction = direction
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

  checkCollision(sizes: CanvasSizes): boolean {
    return this.checkSelfCollision() || this.checkRangeCollision(sizes)
  }

  isFull(sizs: CanvasSizes) {
    return sizs.columns * sizs.rows === this.position.length
  }
}
