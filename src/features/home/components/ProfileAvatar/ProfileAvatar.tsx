import { useState, useRef, useCallback, type CSSProperties, type PointerEvent } from 'react';
import { motion } from 'motion/react';

export interface ProfileAvatarProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  /** Shown on the image wrapper, e.g. w-40 h-40 sm:w-48 sm:h-48 */
  sizeClassName?: string;
}

/**
 * Portrait with interactive conic “pointer follow” ring (CSS variable `--ring-angle`).
 */
export const ProfileAvatar = ({
  imageSrc,
  imageAlt,
  className = '',
  sizeClassName = 'w-40 h-40 sm:w-48 sm:h-48',
}: ProfileAvatarProps) => {
  const safeRootClassName = className.trim();
  const safeSizeClassName = sizeClassName.trim() || 'w-40 h-40 sm:w-48 sm:h-48';
  const [isHovering, setIsHovering] = useState(false);
  const [baseAngle, setBaseAngle] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const currentAngleRef = useRef(0);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!ringRef.current) return;

    const rect = ringRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angleRadians = Math.atan2(deltaY, deltaX);

    let angleDegrees = (angleRadians * 180) / Math.PI + 90;
    angleDegrees = (angleDegrees + 360) % 360;

    currentAngleRef.current = angleDegrees;
    ringRef.current.style.setProperty('--ring-angle', `${angleDegrees.toFixed(2)}deg`);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setBaseAngle(currentAngleRef.current);
    setIsHovering(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={safeRootClassName ? `relative shrink-0 ${safeRootClassName}` : 'relative shrink-0'}
    >
      <div
        ref={ringRef}
        className="absolute -inset-3 rounded-full"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{ '--ring-angle': '0deg' } as CSSProperties}
      >
        <div
          className={`absolute inset-0 rounded-full ${isHovering ? '' : 'animate-spin-slow'}`}
          style={{
            background: isHovering
              ? 'conic-gradient(from var(--ring-angle), transparent, var(--accent-primary), transparent)'
              : `conic-gradient(from ${baseAngle}deg, transparent, var(--accent-primary), transparent)`,
            animationDuration: '8s',
          }}
        />
        <div className="absolute inset-[2px] rounded-full bg-page" />
      </div>

      <div
        className={`relative ${safeSizeClassName} rounded-full overflow-hidden border-2 border-border-subtle pointer-events-none`}
      >
        <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover object-center" />
      </div>
    </motion.div>
  );
};
