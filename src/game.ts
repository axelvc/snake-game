import { Snake } from './snake.js'
import { Fruit } from './fruit.js'
import { Canvas, CanvasSizes } from './canvas.js'
import { Controls, ControlsObserver } from './controls.js'

export interface CellPosition {
  x: number
  y: number
}

export interface GameElement {
  position: CellPosition[] | CellPosition | null
  updatePosition(sizes: CanvasSizes): void
  reset(sizes: CanvasSizes): void
}

export class Game implements ControlsObserver {
  snake: Snake = new Snake()
  fruit: Fruit = new Fruit()
  canvas: Canvas = new Canvas({ cell: 25, columns: 21, rows: 21 })
  controls: Controls = new Controls()
  gameId: number | null = null

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

    // Add controls observers
    this.controls.addObserver(this.snake)
    this.controls.addObserver(this)

    // Set initial position of the snake and the fruit
    this.snake.reset(this.canvas.sizes)
    this.fruit.reset()

    // Print canvas
    this.canvas.print(this.snake.position, this.fruit.position)
  }

  updateGame() {
    this.snake.updatePosition(this.canvas.sizes)
    this.canvas.print(this.snake.position, this.fruit.position)
  }

  start() {
    this.fruit.updatePosition(this.canvas.sizes)
    this.gameId = setInterval(this.updateGame.bind(this), 60)
  }

  onDirectionChange() {
    this.controls.removeObserver(this)
    this.start()
  }
}

new Game()
