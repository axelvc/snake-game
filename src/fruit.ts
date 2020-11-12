import { CanvasSizes } from './canvas.js'
import { CellPosition, compareCells, GameElement } from './game.js'

export class Fruit implements GameElement {
  position: CellPosition | null = null

  reset() {
    this.position = null
  }

  inSnakePosition(snakePositions: CellPosition[]) {
    if (!this.position) return false

    return snakePositions.some((cell) => compareCells(cell, this.position!))
  }

  updatePosition(sizes: CanvasSizes, snakePositions: CellPosition[]) {
    do {
      this.position = {
        x: Math.floor(Math.random() * sizes.columns) * sizes.cell,
        y: Math.floor(Math.random() * sizes.rows) * sizes.cell,
      }
    } while (this.inSnakePosition(snakePositions))
  }
}
