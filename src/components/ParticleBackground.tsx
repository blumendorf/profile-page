import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number = 0
      y: number = 0
      size: number = 0
      speedX: number = 0
      speedY: number = 0

      constructor() {
        if (!canvas) return
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ctx.fillStyle = isDarkMode
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.15)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', () => {
      setCanvasSize()
      init()
    })

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeMediaQuery.addListener(init)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      darkModeMediaQuery.removeListener(init)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

export default ParticleBackground