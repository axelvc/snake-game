import { Snake } from './snake.js'
import { Fruit } from './fruit.js'
import { Canvas } from './canvas.js'
import { Controls } from './controls.js'

export interface CellPosition {
  x: number
  y: number
}

export interface GameSizes {
  cell: number
  columns: number
  rows: number
}

export class Game {
  gameSizes: GameSizes = {
    cell: 25,
    columns: 20,
    rows: 20,
  }
  snake: Snake = new Snake()
  fruit: Fruit = new Fruit()
  canvas: Canvas = new Canvas(this.gameSizes)
  controls: Controls = new Controls()

  constructor() {
    this.controls.addKeymap({
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
      left: 'ArrowLeft',
    })
    this.controls.addKeymap({ up: 'k', right: 'l', down: 'j', left: 'h' })
    this.controls.addKeymap({ up: 'w', right: 'd', down: 's', left: 'a' })
  }
}

new Game()
