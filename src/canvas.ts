import { CellPosition } from './game'

export interface CanvasSizes {
  cell: number
  columns: number
  rows: number
}

export class Canvas {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private colors = {
    background: '#f5f5f5',
    fruit: '#F15152',
    snakeHead: '#368F8B',
    snakeBody: '#48A9A6',
  }
  sizes: CanvasSizes

  constructor(sizes: CanvasSizes) {
    this.sizes = sizes

    // Get canvas
    this.canvas = document.getElementById('game') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!

    // Set canvas size
    this.canvas.width = sizes.cell * sizes.columns
    this.canvas.height = sizes.cell * sizes.rows
  }

  private clean() {
    this.ctx.fillStyle = this.colors.background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawCell({ x, y }: CellPosition, color: string) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, this.sizes.cell, this.sizes.cell)
  }

  private drawSnake(position: CellPosition[]) {
    // Draw snake head
    this.drawCell(position[0], this.colors.snakeHead)

    // Draw snake body
    for (const cell of position.slice(1)) {
      this.drawCell(cell, this.colors.snakeBody)
    }
  }

  private drawFruit(position: CellPosition | null) {
    if (position) {
      this.drawCell(position, this.colors.fruit)
    }
  }

  print(snakePosition: CellPosition[], fruitPosition: CellPosition | null) {
    this.clean()
    this.drawSnake(snakePosition)
    this.drawFruit(fruitPosition)
  }
}
