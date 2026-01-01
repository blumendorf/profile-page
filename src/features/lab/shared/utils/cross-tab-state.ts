/**
 * Cross-tab coordination for model state.
 * Uses BroadcastChannel for real-time updates with localStorage fallback for persistence.
 */

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'generating' | 'error';

export interface TabModelState {
  tabId: string;
  modelId: string;
  status: ModelStatus;
  timestamp: number;
}

export interface CrossTabState {
  tabs: Record<string, TabModelState>;
  lastUpdated: number;
}

const CHANNEL_NAME = 'lab-model-state';
const STORAGE_KEY = 'lab-cross-tab-state';
const TAB_TIMEOUT_MS = 30000; // Consider tab dead after 30s without heartbeat
const HEARTBEAT_INTERVAL_MS = 10000;

/**
 * Generate a unique tab ID
 */
function generateTabId(): string {
  return `tab-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get stored state from localStorage
 */
function getStoredState(): CrossTabState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === 'object' && 'tabs' in parsed) {
        return parsed as CrossTabState;
      }
    }
  } catch (e) {
    console.warn('[cross-tab] Failed to parse stored state:', e);
  }
  return { tabs: {}, lastUpdated: Date.now() };
}

/**
 * Save state to localStorage
 */
function saveState(state: CrossTabState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[cross-tab] Failed to save state:', e);
  }
}

/**
 * Clean up stale tabs (no heartbeat for TAB_TIMEOUT_MS)
 */
function cleanupStaleTabs(state: CrossTabState): CrossTabState {
  const now = Date.now();
  const tabs: Record<string, TabModelState> = {};

  for (const [tabId, tabState] of Object.entries(state.tabs)) {
    if (now - tabState.timestamp < TAB_TIMEOUT_MS) {
      tabs[tabId] = tabState;
    }
  }

  return { tabs, lastUpdated: now };
}

export type StateChangeCallback = (state: CrossTabState, thisTabId: string) => void;

/**
 * Cross-tab state coordinator.
 * Manages model state across browser tabs/windows.
 */
export class CrossTabCoordinator {
  private tabId: string;
  private channel: BroadcastChannel | null = null;
  private heartbeatInterval: number | null = null;
  private listeners: Set<StateChangeCallback> = new Set();
  private currentModelId: string = '';
  private currentStatus: ModelStatus = 'idle';

  constructor() {
    this.tabId = generateTabId();
    this.init();
  }

  private init(): void {
    // Set up BroadcastChannel if available
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event: MessageEvent<{ type: string; state?: CrossTabState }>) => {
        this.handleMessage(event.data);
      };
    }

    // Listen for storage events (fallback for cross-origin or older browsers)
    window.addEventListener('storage', this.handleStorageEvent);

    // Clean up on page unload
    window.addEventListener('beforeunload', this.handleUnload);
    window.addEventListener('pagehide', this.handleUnload);

    // Start heartbeat
    this.startHeartbeat();

    // Register this tab as idle initially
    this.updateStatus('idle', '');
  }

  private handleMessage = (data: unknown): void => {
    if (data && typeof data === 'object' && 'type' in data) {
      const message = data as { type: string; state?: CrossTabState };
      if (message.type === 'state-update' && message.state) {
        this.notifyListeners(message.state);
      }
    }
  };

  private handleStorageEvent = (event: StorageEvent): void => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const state = JSON.parse(event.newValue) as CrossTabState;
        this.notifyListeners(state);
      } catch (e) {
        console.warn('[cross-tab] Failed to parse storage event:', e);
      }
    }
  };

  private handleUnload = (): void => {
    // Remove this tab from state
    const state = getStoredState();
    delete state.tabs[this.tabId];
    state.lastUpdated = Date.now();
    saveState(state);

    // Broadcast removal
    this.broadcast({ type: 'state-update', state });
  };

  private startHeartbeat(): void {
    // Send initial heartbeat
    this.sendHeartbeat();

    // Schedule regular heartbeats
    this.heartbeatInterval = window.setInterval(() => {
      this.sendHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);
  }

  private sendHeartbeat(): void {
    // Update our timestamp to indicate we're still alive
    const state = cleanupStaleTabs(getStoredState());

    state.tabs[this.tabId] = {
      tabId: this.tabId,
      modelId: this.currentModelId,
      status: this.currentStatus,
      timestamp: Date.now(),
    };
    state.lastUpdated = Date.now();

    saveState(state);
    this.broadcast({ type: 'state-update', state });
  }

  private broadcast(message: { type: string; state?: CrossTabState }): void {
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {
        console.warn('[cross-tab] Failed to broadcast:', e);
      }
    }
  }

  private notifyListeners(state: CrossTabState): void {
    const cleanState = cleanupStaleTabs(state);
    for (const listener of this.listeners) {
      try {
        listener(cleanState, this.tabId);
      } catch (e) {
        console.error('[cross-tab] Listener error:', e);
      }
    }
  }

  /**
   * Update this tab's model status
   */
  updateStatus(status: ModelStatus, modelId: string): void {
    this.currentStatus = status;
    this.currentModelId = modelId;

    const state = cleanupStaleTabs(getStoredState());
    state.tabs[this.tabId] = {
      tabId: this.tabId,
      modelId,
      status,
      timestamp: Date.now(),
    };
    state.lastUpdated = Date.now();

    saveState(state);
    this.broadcast({ type: 'state-update', state });
    this.notifyListeners(state);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(callback: StateChangeCallback): () => void {
    this.listeners.add(callback);

    // Immediately notify with current state
    const state = cleanupStaleTabs(getStoredState());
    callback(state, this.tabId);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Get current state snapshot
   */
  getState(): CrossTabState {
    return cleanupStaleTabs(getStoredState());
  }

  /**
   * Get this tab's ID
   */
  getTabId(): string {
    return this.tabId;
  }

  /**
   * Check if any other tab is actively using a model
   */
  isModelInUseByOtherTab(): { inUse: boolean; tabId?: string; modelId?: string; status?: ModelStatus } {
    const state = this.getState();

    for (const [tabId, tabState] of Object.entries(state.tabs)) {
      if (tabId !== this.tabId) {
        if (tabState.status === 'loading' || tabState.status === 'ready' || tabState.status === 'generating') {
          return {
            inUse: true,
            tabId,
            modelId: tabState.modelId,
            status: tabState.status,
          };
        }
      }
    }

    return { inUse: false };
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    window.removeEventListener('storage', this.handleStorageEvent);
    window.removeEventListener('beforeunload', this.handleUnload);
    window.removeEventListener('pagehide', this.handleUnload);

    if (this.channel) {
      this.channel.close();
    }

    // Remove this tab from state
    this.handleUnload();
  }
}

// Global singleton instance
let coordinatorInstance: CrossTabCoordinator | null = null;

/**
 * Get the global cross-tab coordinator instance
 */
export function getCrossTabCoordinator(): CrossTabCoordinator {
  if (!coordinatorInstance) {
    coordinatorInstance = new CrossTabCoordinator();
  }
  return coordinatorInstance;
}

