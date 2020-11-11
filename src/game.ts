import { Snake } from './snake.js'
import { Fruit } from './fruit.js'
import { Canvas, CanvasSizes } from './canvas.js'
import { Controls } from './controls.js'

export interface CellPosition {
  x: number
  y: number
}

export interface GameElement {
  position: CellPosition[] | CellPosition | null
  updatePosition(sizes: CanvasSizes): void
  reset(sizes: CanvasSizes): void
}

export class Game {
  snake: Snake = new Snake()
  fruit: Fruit = new Fruit()
  canvas: Canvas = new Canvas({ cell: 25, columns: 21, rows: 21 })
  controls: Controls = new Controls()

  constructor() {
    // Set keymaps
    this.controls.addKeymap({
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
      left: 'ArrowLeft',
    })
    this.controls.addKeymap({ up: 'k', right: 'l', down: 'j', left: 'h' })
    this.controls.addKeymap({ up: 'w', right: 'd', down: 's', left: 'a' })

    // Add the snake to watch the controls changes
    this.controls.addObserver(this.snake)

    // Set initial position of the snake and the fruit
    this.snake.reset(this.canvas.sizes)
    this.fruit.reset()

    // Print canvas
    this.canvas.print(this.snake.position, this.fruit.position)
  }
}

new Game()
