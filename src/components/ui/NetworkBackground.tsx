import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface NetworkBackgroundProps {
  nodeCount?: number;
  connectionDistance?: number;
  mouseDistance?: number;
  className?: string;
}

const NetworkBackground = ({
  nodeCount = 50,
  connectionDistance = 150,
  mouseDistance = 200,
  className = '',
}: NetworkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Point[] = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Theme colors
    let nodeColor = 'rgba(120, 113, 108, 0.5)'; // Default stone
    let lineColor = 'rgba(120, 113, 108, 0.15)';
    let highlightColor = 'rgba(245, 158, 11, 0.4)'; // Default amber

    const updateThemeColors = () => {
      const style = getComputedStyle(document.documentElement);

      // Read CSS variables
      const accent = style.getPropertyValue('--accent-primary').trim() || '#f59e0b';

      const isDark = document.documentElement.classList.contains('dark');

      if (isDark) {
        nodeColor = 'rgba(168, 162, 158, 0.3)'; // Stone 400
        lineColor = 'rgba(168, 162, 158, 0.1)';
      } else {
        nodeColor = 'rgba(120, 113, 108, 0.3)'; // Stone 500
        lineColor = 'rgba(120, 113, 108, 0.1)';
      }

      highlightColor = accent; // We'll handle opacity for this in the draw loop
    };

    // Initialize points
    const initPoints = () => {
      points = [];
      for (let i = 0; i < nodeCount; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    // Handle resize
    const handleResize = () => {
      if (container) {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;

        if (points.length === 0) initPoints();
        updateThemeColors();
      }
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = nodeColor;
      ctx.strokeStyle = lineColor;

      // Update and draw points
      points.forEach((point, i) => {
        // Move
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Connect to other points
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            // Opacity based on distance
            const opacity = 1 - dist / connectionDistance;
            ctx.lineWidth = 1;

            // We need to parse the base color to apply opacity manually if it's not rgba
            // Or just rely on globalAlpha for lines?
            // Let's use the pre-calculated lineColor which has low opacity, and scale it?
            // Simpler: Just set globalAlpha
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Connect to mouse
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseDistance) {
            if (dist < 50) {
                const angle = Math.atan2(dy, dx);
                point.x += Math.cos(angle) * 1;
                point.y += Math.sin(angle) * 1;
            }

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = 1 - dist / mouseDistance;

            ctx.save();
            ctx.strokeStyle = highlightColor;
            ctx.globalAlpha = opacity * 0.4;
            ctx.stroke();
            ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateThemeColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Start loop
    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeCount, connectionDistance, mouseDistance]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default NetworkBackground;
