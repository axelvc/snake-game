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

class Game {
  gameSizes: GameSizes = {
    cell: 25,
    columns: 20,
    rows: 20,
  }
  snake: Snake = new Snake()
  fruit: Fruit = new Fruit()
  canvas: Canvas = new Canvas(this.gameSizes)
  controls: Controls[]

  constructor() {
    this.controls = [
      new Controls({
        up: 'ArrowUp',
        right: 'ArrowRight',
        down: 'ArrowDown',
        left: 'ArrowLeft',
      }),
      new Controls({ up: 'k', right: 'l', down: 'j', left: 'h' }),
      new Controls({ up: 'w', right: 'd', down: 's', left: 'a' }),
    ]
  }
}

new Game()
