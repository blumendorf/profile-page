import { useRef, useCallback } from 'react';

interface UseShineEffectOptions {
  /** Static angle for shine gradient (0-360), used when pointer leaves */
  staticAngle?: number;
}

/**
 * Hook that provides pointer tracking for dynamic shine border effects.
 * Use with CSS class that has --shine-angle variable.
 */
const useShineEffect = <T extends HTMLElement = HTMLElement>({
  staticAngle = 315,
}: UseShineEffectOptions = {}) => {
  const ref = useRef<T>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<T>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate the center of the element
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
    ref.current.style.setProperty('--shine-angle', `${angleDegrees.toFixed(2)}deg`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!ref.current) return;
    // Reset to static angle when pointer leaves
    ref.current.style.setProperty('--shine-angle', `${staticAngle}deg`);
  }, [staticAngle]);

  return {
    ref,
    shineProps: {
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      style: { '--shine-angle': `${staticAngle}deg` } as React.CSSProperties,
    },
  };
};

export default useShineEffect;

