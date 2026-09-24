/**
 * The ONLY place a ld+json script tag is written. CLAUDE.md 2.2.
 * Always fed by buildGraph() — never a hand-assembled object.
 */
export function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered, from our own typed builders. No user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
