export interface CompatibilityResult {
  webgpu: boolean;
  browser: string;
  canRun: boolean;
  reason?: string;
}

// WebGPU types (not in lib.dom by default)
interface GPUAdapter {
  requestDevice(): Promise<unknown>;
}

interface GPU {
  requestAdapter(): Promise<GPUAdapter | null>;
}

declare global {
  interface Navigator {
    gpu?: GPU;
  }
}

export async function checkCompatibility(): Promise<CompatibilityResult> {
  const browser = detectBrowser();

  // Check WebGPU
  if (!navigator.gpu) {
    return {
      webgpu: false,
      browser,
      canRun: false,
      reason: 'WebGPU not available. Try Chrome 113+ or Edge 113+.',
    };
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return {
        webgpu: false,
        browser,
        canRun: false,
        reason: 'No WebGPU adapter found. Your GPU may not be supported.',
      };
    }

    return {
      webgpu: true,
      browser,
      canRun: true,
    };
  } catch {
    return {
      webgpu: false,
      browser,
      canRun: false,
      reason: 'Error checking WebGPU compatibility.',
    };
  }
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  return 'Unknown';
}
