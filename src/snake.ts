import { CanvasSizes } from './canvas'
import { ControlsObserver, keyDirection } from './controls'
import { CellPosition, GameElement } from './game'

export class Snake implements GameElement, ControlsObserver {
  private direction: keyDirection | null = null
  position: CellPosition[] = []

  private getNewPosition({ cell }: CanvasSizes): CellPosition {
    const snakeHead = this.position[0]

    switch (this.direction) {
      case 'right':
        snakeHead.x += cell
        break
      case 'left':
        snakeHead.x -= cell
        break
      case 'down':
        snakeHead.y += cell
        break
      default:
        snakeHead.y -= cell
        break
    }

    return snakeHead
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

  updatePosition(sizes: CanvasSizes) {
    this.position.unshift(this.getNewPosition(sizes))
    this.position.pop()
  }

  onDirectionChange(direction: keyDirection) {
    this.direction = direction
  }
}
