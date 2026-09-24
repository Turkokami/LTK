# SCHEMA.md — the structured-data contract

Nobody in this category scores above 3 on Schema. That is the seam this build exploits, and it is
only worth exploiting if the markup is genuinely correct.

## Rules

1. **One `@graph` per page**, built by `buildGraph()` in `lib/schema/graph.ts`. Nothing else
   writes a `ld+json` tag — `components/JsonLd.tsx` is the only place that renders one.
2. **Stable `@id` on every node.** Root anchors live in `ID` in `lib/site.config.ts`.
3. **Reference the root, never redeclare it.** `buildGraph()` throws if it finds two Organization
   nodes. That guard exists because duplicate root entities fragment a Knowledge Graph entity
   instead of consolidating it.
4. **Schema is generated from data, not hand-maintained.** Hand-maintained markup at 500 pages
   drifts within a quarter.
5. **Never mark up something that is not on the page.** Invisible FAQ markup is a manual-action
   risk, and in a regulatory vertical it is not a risk worth any traffic.

## Root nodes (every page)

`Organization` + `OnlineBusiness` → `WebSite` (with `SearchAction`) → `ImageObject` (logo) →
`WebPage` → `BreadcrumbList`.

## Primary entities by template

| Template | Primary entity | Builder |
|---|---|---|
| State licensing / CEU | `Article` + `FAQPage` + `HowTo` | `stateReferenceEntities()` |
| Forum thread | `DiscussionForumPosting` + `Comment` | `threadEntities()` |
| Product / software review | `Product` + `AggregateRating` | `productReviewEntities()` |
| Comparison | `ItemList` of `Product` + `FAQPage` | *to build* |
| Live session / tournament | `Event` → `VideoObject` post-event | `eventEntities()` |
| Course | `Course` + `CourseInstance` | *to build* |
| Job | `JobPosting` | `jobEntities()` |
| Member profile | `ProfilePage` + `Person` | `personNode()` |
| Sponsorship tier | `Offer` | `sponsorTierEntities()` |
| Salary data | `Dataset` | *to build* |

## Policy lines

- **`AggregateRating` comes only from verified-member ratings.** Never from an editorial score,
  never blended. If members have not rated it, the node is omitted.
- **Sessions swap primary entity after they happen.** `Event` with `offers` before; `VideoObject`
  with a full timestamped `transcript` after, retaining the Event node as `recordedIn`. Video is
  invisible to text retrieval; transcripts are not.
- **Person nodes need real credentials.** `hasCredential` carries category, identifier and issuing
  body. A Person node with a name and nothing else does no E-E-A-T work.
- **Every regulatory `Article` carries `reviewedBy`** pointing at a named human's Person node, and
  its `dateModified` equals the visible "last verified" date. Keep them in sync or both become
  worthless.

## Validation

Before any commit that touches schema:

1. Rich Results Test on one URL per affected template
2. Schema Markup Validator for full `@graph` integrity
3. Paste the status in the commit body
