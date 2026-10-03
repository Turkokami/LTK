'use client';

import { useSyncExternalStore } from 'react';
import { getAgent, subscribeAgent, SERVER_AGENT, type AgentState } from '@/lib/agent/store';

/** The Agent file, live. Server render (and first paint) see the empty file. */
export function useAgent(): AgentState {
  return useSyncExternalStore(subscribeAgent, getAgent, () => SERVER_AGENT);
}
