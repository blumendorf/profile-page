export interface CompatibilityResult {
  webgpu: boolean;
  browser: string;
  estimatedMemory: number | null;
  canRun: boolean;
  reason?: string;
}

export async function checkCompatibility(): Promise<CompatibilityResult> {
  const browser = detectBrowser();

  // Check WebGPU
  if (!navigator.gpu) {
    return {
      webgpu: false,
      browser,
      estimatedMemory: null,
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
        estimatedMemory: null,
        canRun: false,
        reason: 'No WebGPU adapter found. Your GPU may not be supported.',
      };
    }

    // Estimate available memory
    const memoryInfo = (performance as unknown as { memory?: { jsHeapSizeLimit: number } }).memory;
    const estimatedMemory = memoryInfo
      ? Math.round(memoryInfo.jsHeapSizeLimit / (1024 * 1024 * 1024) * 10) / 10
      : null;

    const minMemory = 4;
    const canRun = !estimatedMemory || estimatedMemory >= minMemory;

    return {
      webgpu: true,
      browser,
      estimatedMemory,
      canRun,
      reason: canRun ? undefined : `Need ${minMemory}GB+ memory. Detected: ${estimatedMemory}GB`,
    };
  } catch {
    return {
      webgpu: false,
      browser,
      estimatedMemory: null,
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

