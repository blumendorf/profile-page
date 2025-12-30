import { useRef, useCallback, ReactNode, HTMLAttributes } from 'react';
import cn from '../../utils/cn';

interface ShineCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Whether to track pointer movement for dynamic shine angle */
  trackPointer?: boolean;
  /** Static angle for shine gradient (0-360), used when trackPointer is false */
  staticAngle?: number;
}

/**
 * A card component with a "shine" border effect.
 *
 * CSS trick for the "shine" border:
 * - Uses a pseudo-element with an inset box-shadow
 * - Masks it off at an angle with a linear-gradient
 * - Optionally rotates the shine based on pointer movement
 */
const ShineCard = ({
  children,
  className,
  trackPointer = true,
  staticAngle = 315,
  ...props
}: ShineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!trackPointer || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Get pointer coordinates
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    // Calculate the angle in radians
    const deltaX = pointerX - centerX;
    const deltaY = pointerY - centerY;
    const angleRadians = Math.atan2(deltaY, deltaX);

    // Convert to degrees, offset by +90 so 0° is at the top, and normalize to 0-360 range
    let angleDegrees = (angleRadians * 180) / Math.PI;
    angleDegrees = (angleDegrees + 90 + 360) % 360;

    // Update CSS custom property with the angle
    cardRef.current.style.setProperty('--shine-angle', `${angleDegrees.toFixed(2)}deg`);
  }, [trackPointer]);

  const handlePointerLeave = useCallback(() => {
    if (!trackPointer || !cardRef.current) return;
    // Reset to static angle when pointer leaves
    cardRef.current.style.setProperty('--shine-angle', `${staticAngle}deg`);
  }, [trackPointer, staticAngle]);

  return (
    <div
      ref={cardRef}
      className={cn('shine-card', className)}
      style={{
        '--shine-angle': `${staticAngle}deg`,
      } as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default ShineCard;

