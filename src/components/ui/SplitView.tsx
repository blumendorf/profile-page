import { ReactNode, useRef, useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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

      {/* Subtle Draggable Divider */}
      <motion.div
        className="absolute top-0 bottom-0 w-6 z-50 cursor-ew-resize flex items-center justify-center"
        style={{ left: dividerLeft }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => setIsHoveringDivider(true)}
        onPointerLeave={() => setIsHoveringDivider(false)}
      >
        {/* Thin divider line */}
        <motion.div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--border-active) 15%, var(--border-active) 85%, transparent)'
          }}
          animate={{
            opacity: isHoveringDivider ? 1 : 0.5,
          }}
        />

        {/* Small circular handle */}
        <motion.div
          className="relative w-5 h-5 rounded-full bg-page border border-border-active
                     flex items-center justify-center"
          animate={{
            scale: isHoveringDivider ? 1.2 : 1,
            borderColor: isHoveringDivider ? 'var(--accent-primary)' : 'var(--border-active)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Two small dots */}
          <div className="flex gap-0.5">
            <motion.div
              className="w-0.5 h-0.5 rounded-full"
              animate={{
                backgroundColor: isHoveringDivider ? 'var(--accent-primary)' : 'var(--text-muted)',
              }}
            />
            <motion.div
              className="w-0.5 h-0.5 rounded-full"
              animate={{
                backgroundColor: isHoveringDivider ? 'var(--accent-primary)' : 'var(--text-muted)',
              }}
            />
          </div>
        </motion.div>

{/* Labels appear on hover - positioned above the line */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-[calc(100%+8px)] whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHoveringDivider ? 1 : 0 }}
        >
          <span className="text-[10px] font-mono text-text-muted bg-page/90 px-1.5 py-0.5 rounded">
            non-technical
          </span>
        </motion.div>

        <motion.div
          className="absolute -top-6 left-1/2 translate-x-2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHoveringDivider ? 1 : 0 }}
        >
          <span className="text-[10px] font-mono text-text-muted bg-page/90 px-1.5 py-0.5 rounded">
            technical
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplitView;
