import { Controls, ControlsObserver, keyDirection } from './controls.js'
import { Canvas, CanvasSizes } from './canvas.js'
import { Snake } from './snake.js'
import { Fruit } from './fruit.js'

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
  stats = {
    current: 0,
    best: 0,
  }

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

    // Listen virtual controls
    const virtualControls: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '#controls button',
    )

    virtualControls.forEach((button) => {
      button.onclick = this.controls.updateDirection.bind(
        this.controls,
        button.id as keyDirection,
      )
    })

    // Set initial position of the snake and the fruit
    this.snake.reset(this.canvas.sizes)
    this.fruit.reset()

    this.printGame()
  }

  get score(): number {
    return this.stats.current
  }

  set score(score: number) {
    const scoreElement = document.getElementById('current-score')!
    const bestScoreElement = document.getElementById('best-score')!

    // Update score
    if (score > this.stats.best) {
      this.stats.best = score
    }
    this.stats.current = score

    // Print new score
    scoreElement.innerText = score.toString()
    scoreElement.innerText = score.toString()
    bestScoreElement.innerText = this.stats.best.toString()
  }

  printGame() {
    this.canvas.print(this.snake.position, this.fruit.position)
  }

  updateIndicator(turnOn: boolean) {
    const indicator = document.getElementById('play-indicator')!

    if (turnOn) {
      indicator.classList.add('active')
    } else {
      indicator.classList.remove('active')
    }
  }

  updateGame() {
    const fruitCollected = this.fruit.inSnakePosition(this.snake.position)

    // Update snake
    this.snake.updatePosition(this.canvas.sizes, fruitCollected)

    // Update fruit position
    if (fruitCollected) {
      this.fruit.updatePosition(this.canvas.sizes, this.snake.position)
      this.score += 1
    }

    // Check if lose the game
    if (this.snake.checkCollision(this.canvas.sizes)) {
      this.reset()
    }

    // Check if win the game
    if (this.snake.isFull(this.canvas.sizes)) {
      this.reset()
    }

    this.printGame()
  }

  reset() {
    // Stop game
    clearInterval(this.gameId!)
    this.gameId = null

    // Reset all
    this.updateIndicator(false)
    this.snake.reset(this.canvas.sizes)
    this.fruit.reset()
    this.printGame()
    this.score = 0

    // Observe controls again
    this.controls.addObserver(this)
  }

  onDirectionChange() {
    // Unobserve controls
    this.controls.removeObserver(this)

    // Start game
    this.fruit.updatePosition(this.canvas.sizes, this.snake.position)
    this.gameId = setInterval(this.updateGame.bind(this), 100)
    this.updateIndicator(true)
  }
}

new Game()
