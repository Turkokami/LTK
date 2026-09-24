/**
 * TODO_REGISTRY — the sentinel for values that must come from the real world.
 *
 * CLAUDE.md 2.5. Renders a visible amber flag in development. Fails the production build.
 * That is intentional: a wrong CEU number is worse than no page.
 */
export function TODO_REGISTRY(id: string, what: string): string {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      `REGISTRY BLOCKER ${id} unresolved: ${what}. ` +
        'Resolve it in REGISTRY.md and supply the real value before deploying.',
    );
  }
  return `[[${id} — ${what}]]`;
}

export function isRegistryStub(value: string): boolean {
  return value.startsWith('[[') && value.endsWith(']]');
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/** Human-readable date for the "last verified" line. Keep in sync with dateModified. */
export function formatVerified(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
