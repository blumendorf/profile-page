import { ReactNode, useRef, useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { usePersona } from '@/features/shared';

interface SplitViewProps {
  nonTechnicalContent: ReactNode;
  technicalContent: ReactNode;
  className?: string;
}

export const SplitView = ({ nonTechnicalContent, technicalContent, className = '' }: SplitViewProps) => {
  const { splitPosition, setSplitPosition } = usePersona();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [isHoveringDivider, setIsHoveringDivider] = useState(false);

  // Motion values for smooth animations
  const motionPosition = useMotionValue(splitPosition);

  // Transform position to clip paths
  const nonTechnicalClip = useTransform(motionPosition, (pos) =>
    `inset(0 ${100 - pos}% 0 0)`
  );
  const technicalClip = useTransform(motionPosition, (pos) =>
    `inset(0 0 0 ${pos}%)`
  );

  // Sync motion value with state (when not dragging)
  useEffect(() => {
    if (!isDragging.current) {
      animate(motionPosition, splitPosition, { duration: 0.15, ease: 'easeOut' });
    }
  }, [splitPosition, motionPosition]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

    motionPosition.set(percentage);
    setSplitPosition(percentage);
  }, [motionPosition, setSplitPosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Divider position as CSS
  const dividerLeft = useTransform(motionPosition, (pos) => `calc(${pos}% - 12px)`);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Non-Technical side (left) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: nonTechnicalClip }}
      >
        <div className="pointer-events-auto">
          {nonTechnicalContent}
        </div>
      </motion.div>

      {/* Technical side (right) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: technicalClip }}
      >
        <div className="pointer-events-auto">
          {technicalContent}
        </div>
      </motion.div>

      {/* Invisible layout reference */}
      <div className="invisible pointer-events-none" aria-hidden="true">
        {nonTechnicalContent}
      </div>

      {/* Prominent Draggable Divider */}
      <motion.div
        className="absolute top-0 bottom-0 w-8 z-50 cursor-ew-resize flex items-center justify-center"
        style={{ left: dividerLeft }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => setIsHoveringDivider(true)}
        onPointerLeave={() => setIsHoveringDivider(false)}
      >
        {/* Divider line with shadow */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--accent-primary) 10%, var(--accent-primary) 90%, transparent)'
          }}
          animate={{
            opacity: isHoveringDivider ? 1 : 0.8,
            width: isHoveringDivider ? '3px' : '2px',
          }}
        />

        {/* Circular handle with shadow */}
        <motion.div
          className="relative w-8 h-8 rounded-full bg-page border-2 border-accent
                     flex items-center justify-center shadow-lg"
          animate={{
            scale: isHoveringDivider ? 1.15 : 1,
            boxShadow: isHoveringDivider
              ? '0 4px 12px rgba(var(--accent-rgb, 139, 92, 246), 0.4)'
              : '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Three dots for better visibility */}
          <div className="flex gap-0.5">
            <motion.div
              className="w-1 h-1 rounded-full bg-accent"
              animate={{
                scale: isHoveringDivider ? 1.2 : 1,
              }}
            />
            <motion.div
              className="w-1 h-1 rounded-full bg-accent"
              animate={{
                scale: isHoveringDivider ? 1.2 : 1,
              }}
            />
          </div>
        </motion.div>

{/* Labels - positioned on opposite sides, visible on hover only */}
        <motion.div
          className="absolute -top-10 right-full mr-3 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHoveringDivider ? 1 : 0,
            y: isHoveringDivider ? -2 : 0,
          }}
        >
          <span className="text-xs font-mono text-text-primary bg-page px-2 py-1 rounded-sm border border-border-subtle shadow-md">
            non-technical
          </span>
        </motion.div>

        <motion.div
          className="absolute -top-10 left-full ml-3 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHoveringDivider ? 1 : 0,
            y: isHoveringDivider ? -2 : 0,
          }}
        >
          <span className="text-xs font-mono text-text-primary bg-page px-2 py-1 rounded-sm border border-border-subtle shadow-md">
            technical
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplitView;
