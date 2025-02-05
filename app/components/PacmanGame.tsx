'use client'

import { useEffect, useRef, useState } from 'react'

// Game constants
const CELL_SIZE = 20
const PACMAN_SIZE = CELL_SIZE - 2
const DOT_SIZE = 4
const POWER_PELLET_SIZE = 8
const GHOST_SIZE = CELL_SIZE - 2
const SPEED = CELL_SIZE / 4

// Smaller maze layout
const MAZE_LAYOUT = [
    '####################',
    '#........##........#',
    '#.####.#.##.#.####.#',
    '#o####.#.##.#.####o#',
    '#..........................#',
    '#.##.##.########.##.##.#',
    '#....##....##....##....#',
    '####.##### ## #####.####',
    '   #.##          ##.#   ',
    '   #.## ###--### ##.#   ',
    '####.## #      # ##.####',
    '    .   #      #   .    ',
    '####.## #      # ##.####',
    '   #.## ######## ##.#   ',
    '   #.##          ##.#   ',
    '####.## ######## ##.####',
    '#........##........#',
    '#.####.#.##.#.####.#',
    '#o..##..........##..o#',
    '####################'
]

interface Position {
    x: number
    y: number
}

interface Ghost {
    pos: Position
    color: string
    direction: string
}

function PacmanGameContent() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const pacmanPos = useRef<Position>({ x: CELL_SIZE * 10, y: CELL_SIZE * 15 })
    const direction = useRef<string>('right')
    const mouthAngle = useRef<number>(0)
    const mouthClosing = useRef<boolean>(false)
    const dots = useRef<Position[]>([])
    const powerPellets = useRef<Position[]>([])
    const ghosts = useRef<Ghost[]>([])
    const powerMode = useRef<boolean>(false)

    const initializeGame = () => {
        dots.current = []
        powerPellets.current = []
        MAZE_LAYOUT.forEach((row, y) => {
            row.split('').forEach((cell, x) => {
                if (cell === '.') {
                    dots.current.push({ x: x * CELL_SIZE + CELL_SIZE / 2, y: y * CELL_SIZE + CELL_SIZE / 2 })
                } else if (cell === 'o') {
                    powerPellets.current.push({ x: x * CELL_SIZE + CELL_SIZE / 2, y: y * CELL_SIZE + CELL_SIZE / 2 })
                }
            })
        })

        ghosts.current = [
            { pos: { x: 8 * CELL_SIZE, y: 10 * CELL_SIZE }, color: '#FF0000', direction: 'right' },
            { pos: { x: 10 * CELL_SIZE, y: 10 * CELL_SIZE }, color: '#FFB8FF', direction: 'left' },
            { pos: { x: 12 * CELL_SIZE, y: 10 * CELL_SIZE }, color: '#00FFFF', direction: 'right' },
            { pos: { x: 14 * CELL_SIZE, y: 10 * CELL_SIZE }, color: '#FFB851', direction: 'left' }
        ]
    }

    const drawMaze = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.strokeStyle = '#2121ff'
        ctx.lineWidth = 2

        MAZE_LAYOUT.forEach((row, y) => {
            row.split('').forEach((cell, x) => {
                if (cell === '#') {
                    ctx.fillStyle = '#2121ff'
                    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
                }
            })
        })
    }

    const drawDots = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#ffffff'
        dots.current.forEach(dot => {
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, DOT_SIZE / 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        })
    }

    const drawPowerPellets = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#ffffff'
        powerPellets.current.forEach(pellet => {
            ctx.beginPath()
            ctx.arc(pellet.x, pellet.y, POWER_PELLET_SIZE / 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        })
    }

    const drawPacman = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = '#FFFF00'
        ctx.beginPath()

        // Animate mouth opening/closing
        if (mouthClosing.current) {
            mouthAngle.current -= 0.15
            if (mouthAngle.current <= 0) {
                mouthAngle.current = 0
                mouthClosing.current = false
            }
        } else {
            mouthAngle.current += 0.15
            if (mouthAngle.current >= 0.5) {
                mouthAngle.current = 0.5
                mouthClosing.current = true
            }
        }

        let startAngle = mouthAngle.current
        let endAngle = 2 * Math.PI - mouthAngle.current

        switch (direction.current) {
            case 'right':
                break
            case 'left':
                startAngle = Math.PI + mouthAngle.current
                endAngle = Math.PI - mouthAngle.current
                break
            case 'up':
                startAngle = 1.5 * Math.PI + mouthAngle.current
                endAngle = 1.5 * Math.PI - mouthAngle.current
                break
            case 'down':
                startAngle = 0.5 * Math.PI + mouthAngle.current
                endAngle = 0.5 * Math.PI - mouthAngle.current
                break
        }

        ctx.arc(
            pacmanPos.current.x,
            pacmanPos.current.y,
            PACMAN_SIZE / 2,
            startAngle,
            endAngle
        )
        ctx.lineTo(pacmanPos.current.x, pacmanPos.current.y)
        ctx.fill()
        ctx.closePath()
    }

    const drawGhosts = (ctx: CanvasRenderingContext2D) => {
        ghosts.current.forEach(ghost => {
            ctx.fillStyle = powerMode.current ? '#2121ff' : ghost.color
            ctx.beginPath()
            ctx.arc(
                ghost.pos.x,
                ghost.pos.y - GHOST_SIZE / 4,
                GHOST_SIZE / 2,
                Math.PI,
                0
            )
            ctx.lineTo(
                ghost.pos.x + GHOST_SIZE / 2,
                ghost.pos.y + GHOST_SIZE / 4
            )

            // Wavy bottom
            for (let i = 0; i < 3; i++) {
                ctx.quadraticCurveTo(
                    ghost.pos.x + GHOST_SIZE / 2 - (GHOST_SIZE / 3) * (i + 0.5),
                    ghost.pos.y + GHOST_SIZE / 4 + (i % 2 === 0 ? GHOST_SIZE / 8 : -GHOST_SIZE / 8),
                    ghost.pos.x + GHOST_SIZE / 2 - (GHOST_SIZE / 3) * (i + 1),
                    ghost.pos.y + GHOST_SIZE / 4
                )
            }

            ctx.lineTo(ghost.pos.x - GHOST_SIZE / 2, ghost.pos.y + GHOST_SIZE / 4)
            ctx.fill()
            ctx.closePath()

            // Eyes
            ctx.fillStyle = '#ffffff'
            ctx.beginPath()
            ctx.arc(ghost.pos.x - 3, ghost.pos.y - 4, 2, 0, Math.PI * 2)
            ctx.arc(ghost.pos.x + 3, ghost.pos.y - 4, 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        })
    }

    const moveGhosts = () => {
        ghosts.current.forEach(ghost => {
            const speed = powerMode.current ? SPEED / 2 : SPEED
            const dx = pacmanPos.current.x - ghost.pos.x
            const dy = pacmanPos.current.y - ghost.pos.y

            if (Math.abs(dx) > Math.abs(dy)) {
                ghost.direction = dx > 0 ? 'right' : 'left'
            } else {
                ghost.direction = dy > 0 ? 'down' : 'up'
            }

            const newPos = { ...ghost.pos }
            switch (ghost.direction) {
                case 'right':
                    newPos.x += speed
                    break
                case 'left':
                    newPos.x -= speed
                    break
                case 'up':
                    newPos.y -= speed
                    break
                case 'down':
                    newPos.y += speed
                    break
            }

            if (!isWall(newPos)) {
                ghost.pos = newPos
            }
        })
    }

    const checkCollisions = () => {
        // Check dot collisions
        dots.current = dots.current.filter(dot => {
            if (Math.hypot(dot.x - pacmanPos.current.x, dot.y - pacmanPos.current.y) < PACMAN_SIZE / 2) {
                setScore(prev => prev + 10)
                return false
            }
            return true
        })

        // Check power pellet collisions
        powerPellets.current = powerPellets.current.filter(pellet => {
            if (Math.hypot(pellet.x - pacmanPos.current.x, pellet.y - pacmanPos.current.y) < PACMAN_SIZE / 2) {
                powerMode.current = true
                setTimeout(() => { powerMode.current = false }, 10000)
                setScore(prev => prev + 50)
                return false
            }
            return true
        })

        // Check ghost collisions
        ghosts.current.forEach(ghost => {
            if (Math.hypot(ghost.pos.x - pacmanPos.current.x, ghost.pos.y - pacmanPos.current.y) < PACMAN_SIZE) {
                if (powerMode.current) {
                    setScore(prev => prev + 200)
                    ghost.pos = { x: 10 * CELL_SIZE, y: 10 * CELL_SIZE }
                } else {
                    initializeGame()
                    setScore(0)
                }
            }
        })
    }

    const isWall = (pos: Position): boolean => {
        const gridX = Math.floor(pos.x / CELL_SIZE)
        const gridY = Math.floor(pos.y / CELL_SIZE)
        return gridY >= 0 && gridY < MAZE_LAYOUT.length &&
            gridX >= 0 && gridX < MAZE_LAYOUT[0].length &&
            MAZE_LAYOUT[gridY][gridX] === '#'
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        initializeGame()

        const handleKeyPress = (e: KeyboardEvent) => {
            const speed = SPEED
            const newPos = { ...pacmanPos.current }

            switch (e.key) {
                case 'ArrowRight':
                    newPos.x += speed
                    if (!isWall(newPos)) {
                        direction.current = 'right'
                        pacmanPos.current.x += speed
                    }
                    break
                case 'ArrowLeft':
                    newPos.x -= speed
                    if (!isWall(newPos)) {
                        direction.current = 'left'
                        pacmanPos.current.x -= speed
                    }
                    break
                case 'ArrowUp':
                    newPos.y -= speed
                    if (!isWall(newPos)) {
                        direction.current = 'up'
                        pacmanPos.current.y -= speed
                    }
                    break
                case 'ArrowDown':
                    newPos.y += speed
                    if (!isWall(newPos)) {
                        direction.current = 'down'
                        pacmanPos.current.y += speed
                    }
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        const interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawMaze(ctx)
            drawDots(ctx)
            drawPowerPellets(ctx)
            drawPacman(ctx)
            moveGhosts()
            drawGhosts(ctx)
            checkCollisions()
        }, 1000 / 60)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="game-container glass">
            <div className="game-info">
                <div className="score">Score: {score}</div>
                <div className="game-instructions">
                    Use arrow keys to move
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="pacman-canvas"
            />
        </div>
    )
}

function LoadingGame() {
    return (
        <div className="game-container glass">
            <div className="game-info">
                <div className="score">Loading...</div>
                <div className="game-instructions">
                    Initializing game...
                </div>
            </div>
            <div className="pacman-canvas-placeholder"
                style={{
                    width: '400px',
                    height: '400px',
                    background: '#000'
                }}
            />
        </div>
    )
}

export default function PacmanGame() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <LoadingGame />
    }

    return <PacmanGameContent />
}