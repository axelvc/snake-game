import { CanvasSizes } from './canvas'
import { GameElement } from './game'
import { CellPosition } from './_index'

export class Fruit implements GameElement {
  position: CellPosition | null = null

  reset() {
    this.position = null
  }

  updatePosition({ cell, columns, rows }: CanvasSizes) {
    this.position = {
      x: Math.floor(Math.random() * columns) * cell,
      y: Math.floor(Math.random() * rows) * cell,
    }
  }
}
