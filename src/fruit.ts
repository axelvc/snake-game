import { CanvasSizes } from './canvas'
import { GameElement } from './game'
import { CellPosition, compareCells } from './game.js'

export class Fruit implements GameElement {
  position: CellPosition | null = null

  reset() {
    this.position = null
  }

  inSnakePosition(snakePositions: CellPosition[]) {
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
