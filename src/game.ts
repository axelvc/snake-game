import { Snake } from './snake.js'
import { Fruit } from './fruit.js'
import { Canvas, CanvasSizes } from './canvas.js'
import { Controls, ControlsObserver } from './controls.js'

export interface CellPosition {
  x: number
  y: number
}

export function compareCells(cell1: CellPosition, cell2: CellPosition) {
  return cell1.x === cell2.x && cell1.y === cell2.y
}

export interface GameElement {
  position: CellPosition[] | CellPosition | null
  updatePosition(sizes: CanvasSizes, ...params: any): void
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
    const fruitCollected = this.fruit.inSnakePosition(this.snake.position)

    this.snake.updatePosition(this.canvas.sizes, fruitCollected)

    try {
      this.snake.checkCollision(this.canvas.sizes)
    } catch {
      this.stop()
    }

    if (fruitCollected) {
      this.fruit.updatePosition(this.canvas.sizes, this.snake.position)
    }

    this.canvas.print(this.snake.position, this.fruit.position)
  }

  stop() {
    // Stop game
    clearInterval(this.gameId!)
    this.gameId = null

    // Reset all
    this.snake.reset(this.canvas.sizes)
    this.fruit.reset()
    this.canvas.print(this.snake.position, this.fruit.position)
    this.controls.addObserver(this)
  }

  start() {
    this.fruit.updatePosition(this.canvas.sizes, this.snake.position)
    this.gameId = setInterval(this.updateGame.bind(this), 300)
  }

  onDirectionChange() {
    this.controls.removeObserver(this)
    this.start()
  }
}

new Game()
