import { GameElement, GameSizes } from './game'
import { CellPosition } from './_index'

export class Fruit implements GameElement {
  position: CellPosition | null = null

  reset() {
    this.position = null
  }

  updatePosition({ cell, columns, rows }: GameSizes) {
    this.position = {
      x: Math.floor(Math.random() * columns) * cell,
      y: Math.floor(Math.random() * rows) * cell,
    }
  }
}
