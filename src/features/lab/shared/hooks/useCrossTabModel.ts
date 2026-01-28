/**
 * React hook for cross-tab model coordination.
 * Provides easy-to-use state and methods for managing model state across tabs.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getCrossTabCoordinator,
  type CrossTabState,
  type ModelStatus,
} from '../utils/cross-tab-state';

export interface OtherTabInfo {
  tabId: string;
  modelId: string;
  status: ModelStatus;
}

export interface CrossTabModelState {
  /** This tab's unique ID */
  thisTabId: string;
  /** Whether another tab is actively using a model */
  isModelInUseByOtherTab: boolean;
  /** Info about the other tab using the model (if any) */
  otherTabInfo: OtherTabInfo | null;
  /** All active tabs */
  activeTabs: OtherTabInfo[];
  /** Update this tab's status */
  updateStatus: (status: ModelStatus, modelId: string) => void;
  /** Whether user has dismissed the warning */
  warningDismissed: boolean;
  /** Dismiss the warning */
  dismissWarning: () => void;
}

/**
 * Hook for cross-tab model coordination
 */
export function useCrossTabModel(): CrossTabModelState {
  const coordinatorRef = useRef(getCrossTabCoordinator());
  const [state, setState] = useState<CrossTabState>(() =>
    coordinatorRef.current.getState()
  );
  const [warningDismissed, setWarningDismissed] = useState(false);

  // Subscribe to state changes
  useEffect(() => {
    const coordinator = coordinatorRef.current;

    const unsubscribe = coordinator.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  // Reset warning dismissed when other tab status changes
  useEffect(() => {
    const otherTab = getOtherTabUsingModel(state, coordinatorRef.current.getTabId());
    if (!otherTab) {
      setWarningDismissed(false);
    }
  }, [state]);

  const updateStatus = useCallback((status: ModelStatus, modelId: string) => {
    coordinatorRef.current.updateStatus(status, modelId);
  }, []);

  const dismissWarning = useCallback(() => {
    setWarningDismissed(true);
  }, []);

  const thisTabId = coordinatorRef.current.getTabId();
  const otherTabInfo = getOtherTabUsingModel(state, thisTabId);
  const activeTabs = getActiveTabs(state, thisTabId);

  return {
    thisTabId,
    isModelInUseByOtherTab: otherTabInfo !== null,
    otherTabInfo,
    activeTabs,
    updateStatus,
    warningDismissed,
    dismissWarning,
  };
}

/**
 * Get info about another tab that's using the model
 */
function getOtherTabUsingModel(
  state: CrossTabState,
  thisTabId: string
): OtherTabInfo | null {
  for (const [tabId, tabState] of Object.entries(state.tabs)) {
    if (tabId !== thisTabId) {
      if (
        tabState.status === 'loading' ||
        tabState.status === 'ready' ||
        tabState.status === 'generating'
      ) {
        return {
          tabId: tabState.tabId,
          modelId: tabState.modelId,
          status: tabState.status,
        };
      }
    }
  }
  return null;
}

/**
 * Get all active tabs (excluding this one)
 */
function getActiveTabs(state: CrossTabState, thisTabId: string): OtherTabInfo[] {
  return Object.entries(state.tabs)
    .filter(([tabId]) => tabId !== thisTabId)
    .map(([, tabState]) => ({
      tabId: tabState.tabId,
      modelId: tabState.modelId,
      status: tabState.status,
    }));
}

