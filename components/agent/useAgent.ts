'use client';

import { useSyncExternalStore } from 'react';
import { getAgent, getAgentSession, getServerAgentSession, subscribeAgent, SERVER_AGENT, type AgentSession, type AgentState } from '@/lib/agent/store';

/** The Agent file, live. Server render (and first paint) see the empty file. */
export function useAgent(): AgentState {
  return useSyncExternalStore(subscribeAgent, getAgent, () => SERVER_AGENT);
}

/** Discord sign-in status: configured on this deploy, and who (if anyone) is signed in. */
export function useAgentSession(): AgentSession {
  return useSyncExternalStore(subscribeAgent, getAgentSession, getServerAgentSession);
}
