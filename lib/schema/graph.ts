/**
 * graph.ts — the root @graph builder.
 *
 * CLAUDE.md 2.2: no page ships without JSON-LD, no page hand-writes a script tag, and no page
 * emits two Organization nodes. Every page calls buildGraph() exactly once.
 */

import { site, abs, ID } from '@/lib/site.config';
import type { SchemaNode, Crumb } from './types';

/** Root nodes. Identical on every page — that is the point. Consolidation, not fragmentation. */
function rootNodes(): SchemaNode[] {
  const org: SchemaNode = {
    '@type': ['Organization', 'OnlineBusiness'],
    '@id': ID.organization,
    name: site.name,
    url: abs('/'),
    logo: { '@id': ID.logo },
    description: site.description,
    foundingDate: site.founded,
    founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.role, description: site.founder.bio },
    knowsAbout: [...site.knowsAbout],
  };

  if (site.legalName) org.legalName = site.legalName;
  if (site.sameAs.length) org.sameAs = [...site.sameAs];

  const contactPoints = [
    site.contact.membership && {
      '@type': 'ContactPoint',
      contactType: 'membership',
      email: site.contact.membership,
    },
    site.contact.sponsorship && {
      '@type': 'ContactPoint',
      contactType: 'sponsorship',
      email: site.contact.sponsorship,
    },
    site.contact.investors && {
      '@type': 'ContactPoint',
      contactType: 'investor relations',
      email: site.contact.investors,
    },
  ].filter(Boolean);
  if (contactPoints.length) org.contactPoint = contactPoints;

  return [
    org,
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: abs('/'),
      name: site.name,
      publisher: { '@id': ID.organization },
      inLanguage: site.locale,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: abs('/search/?q={search_term_string}'),
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: abs(site.logo.path),
      width: site.logo.width,
      height: site.logo.height,
    },
  ];
}

function breadcrumbNode(url: string, crumbs: Crumb[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': ID.breadcrumb(url),
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}

export interface GraphInput {
  /** Path only, e.g. '/academy/ceu/texas/'. Never a full URL. */
  path: string;
  /** Page type. Defaults to WebPage; use CollectionPage for hub indexes. */
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ProfilePage' | 'ContactPage';
  crumbs: Crumb[];
  /**
   * Template-specific primary entities from lib/schema/entities.ts.
   * These are appended to the graph and referenced by WebPage.mainEntity.
   */
  primary?: SchemaNode[];
  /** @id of the node WebPage.mainEntity should point at. Usually primary[0]['@id']. */
  mainEntityId?: string;
}

export function buildGraph({
  path,
  pageType = 'WebPage',
  crumbs,
  primary = [],
  mainEntityId,
}: GraphInput) {
  const url = abs(path);

  const webPage: SchemaNode = {
    '@type': pageType,
    '@id': ID.webpage(url),
    url,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.organization },
    breadcrumb: { '@id': ID.breadcrumb(url) },
    inLanguage: site.locale,
  };

  const resolvedMain = mainEntityId ?? primary[0]?.['@id'];
  if (typeof resolvedMain === 'string') {
    webPage.mainEntity = { '@id': resolvedMain };
  }

  const graph = [...rootNodes(), webPage, breadcrumbNode(url, crumbs), ...primary];

  // Guard against the failure mode that breaks entity consolidation.
  const orgCount = graph.filter((n) => n['@id'] === ID.organization).length;
  if (orgCount > 1) {
    throw new Error(
      `Schema error on ${path}: ${orgCount} Organization nodes. ` +
        'Reference the root by @id instead of redeclaring it. See CLAUDE.md 2.2.',
    );
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
