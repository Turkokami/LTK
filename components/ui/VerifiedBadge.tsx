/**
 * The verification mark. This is the differentiator against every open forum in the category:
 * a licence-verified identity, displayed on every post. REGISTRY R-10.
 */
export function VerifiedBadge({
  stateCode,
  category,
}: {
  stateCode: string;
  category?: string;
}) {
  return (
    <span className="badge-verified" title="Licence verified against the state register">
      <span aria-hidden="true">✓</span>
      <span>
        Verified {stateCode}
        {category ? ` · ${category}` : ''}
      </span>
    </span>
  );
}
