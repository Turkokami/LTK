/**
 * entities.ts — template-specific primary entity builders.
 *
 * One builder per page template. Each returns SchemaNode[] to hand to buildGraph({ primary }).
 * Add a builder here before you add a template that needs it.
 */

import { abs, ID } from '@/lib/site.config';
import type { SchemaNode, FaqItem, PersonRef } from './types';

/* ------------------------------------------------------------------ people */

export function personNode(p: PersonRef): SchemaNode {
  const node: SchemaNode = {
    '@type': 'Person',
    '@id': abs(p.path) + '#person',
    name: p.name,
    url: abs(p.path),
  };
  if (p.jobTitle) node.jobTitle = p.jobTitle;
  if (p.affiliation) node.affiliation = { '@type': 'Organization', name: p.affiliation };
  if (p.sameAs?.length) node.sameAs = p.sameAs;
  if (p.credential) {
    node.hasCredential = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: p.credential.category,
      ...(p.credential.identifier ? { identifier: p.credential.identifier } : {}),
      ...(p.credential.issuedBy
        ? { recognizedBy: { '@type': 'Organization', name: p.credential.issuedBy } }
        : {}),
    };
  }
  return node;
}

/* ------------------------------------------------------ academy: state pages */

export interface StateReferenceInput {
  path: string;
  headline: string;
  stateName: string;
  /** ISO 8601 date. Drives the visible "last verified" line AND dateModified. Keep them equal. */
  dateModified: string;
  author: PersonRef;
  /** A named human who checked the regulatory facts. Not optional in this vertical. */
  reviewedBy?: PersonRef;
  about: string;
  /**
   * Conditional node. Emit ONLY when a visible FAQ block exists on the page.
   * v3.2 rejected FAQPage as a rich-result lever — it is not a reason to invent an FAQ.
   */
  faq?: FaqItem[];
}

export function stateReferenceEntities(i: StateReferenceInput): SchemaNode[] {
  const url = abs(i.path);
  const nodes: SchemaNode[] = [];

  const article: SchemaNode = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: i.headline,
    mainEntityOfPage: { '@id': ID.webpage(url) },
    author: { '@id': abs(i.author.path) + '#person' },
    publisher: { '@id': ID.organization },
    dateModified: i.dateModified,
    spatialCoverage: { '@type': 'State', name: i.stateName },
    about: { '@type': 'Thing', name: i.about },
  };
  if (i.reviewedBy) article.reviewedBy = { '@id': abs(i.reviewedBy.path) + '#person' };
  nodes.push(article, personNode(i.author));
  if (i.reviewedBy) nodes.push(personNode(i.reviewedBy));

  if (i.faq?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: i.faq.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    });
  }


  return nodes;
}

/* -------------------------------------------------------- community: threads */

export interface ThreadInput {
  path: string;
  headline: string;
  body: string;
  datePublished: string;
  author: PersonRef;
  forumPath: string;
  replies?: number;
  likes?: number;
  comments?: { authorName: string; authorPath: string; text: string; datePublished: string }[];
}

export function threadEntities(i: ThreadInput): SchemaNode[] {
  const url = abs(i.path);
  const post: SchemaNode = {
    '@type': 'DiscussionForumPosting',
    '@id': `${url}#post`,
    headline: i.headline,
    url,
    articleBody: i.body,
    datePublished: i.datePublished,
    author: { '@id': abs(i.author.path) + '#person' },
    isPartOf: { '@id': abs(i.forumPath) + '#forum' },
  };

  const stats = [
    typeof i.replies === 'number' && {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/CommentAction',
      userInteractionCount: i.replies,
    },
    typeof i.likes === 'number' && {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/LikeAction',
      userInteractionCount: i.likes,
    },
  ].filter(Boolean);
  if (stats.length) post.interactionStatistic = stats;

  if (i.comments?.length) {
    post.comment = i.comments.map((c) => ({
      '@type': 'Comment',
      author: { '@type': 'Person', name: c.authorName, url: abs(c.authorPath) },
      text: c.text,
      datePublished: c.datePublished,
    }));
  }

  return [post, personNode(i.author)];
}

/* --------------------------------------------------------------- lab: reviews */

export interface ProductReviewInput {
  path: string;
  productName: string;
  brand: string;
  category: string;
  /**
   * CLAUDE.md / BUILD-PLAN Phase 4: AggregateRating comes ONLY from verified-member ratings.
   * Never from an editorial score. This is a policy line, not a preference.
   */
  memberRating?: { value: number; count: number; best?: number };
}

export function productReviewEntities(i: ProductReviewInput): SchemaNode[] {
  const url = abs(i.path);
  const product: SchemaNode = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: i.productName,
    brand: { '@type': 'Brand', name: i.brand },
    category: i.category,
    url,
  };
  if (i.memberRating && i.memberRating.count > 0) {
    product.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: i.memberRating.value,
      reviewCount: i.memberRating.count,
      bestRating: i.memberRating.best ?? 5,
    };
  }
  return [product];
}

/* -------------------------------------------------------------- arena: events */

export interface EventInput {
  path: string;
  name: string;
  startDate: string;
  endDate?: string;
  online?: boolean;
  locationName?: string;
  description: string;
  free?: boolean;
}

export interface EventListInput {
  path: string;
  events: (Omit<EventInput, 'path'> & { slug: string })[];
}

/** Multiple events on one index page. Each gets its own @id off the slug. */
export function eventEntities(i: EventListInput): SchemaNode[] {
  return i.events.flatMap((e) => eventEntity({ ...e, path: i.path }, e.slug));
}

function eventEntity(i: EventInput, slug?: string): SchemaNode[] {
  const url = abs(i.path);
  const node: SchemaNode = {
    '@type': 'Event',
    '@id': `${url}#event${slug ? `-${slug}` : ''}`,
    name: i.name,
    url,
    description: i.description,
    startDate: i.startDate,
    organizer: { '@id': ID.organization },
    eventAttendanceMode: i.online
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: i.online
      ? { '@type': 'VirtualLocation', url }
      : { '@type': 'Place', name: i.locationName ?? '' },
  };
  if (i.endDate) node.endDate = i.endDate;
  if (i.free) {
    node.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url,
    };
  }
  return [node];
}

/* --------------------------------------------------------------- trade: jobs */

export interface JobListInput {
  /** The state jobs page this list lives on. */
  path: string;
  jobs: {
    slug: string;
    title: string;
    summary: string;
    employer: string;
    city: string;
    stateCode: string;
    employmentType: string;
    datePosted: string;
    /** REQUIRED. A posting with no expiry is treated as never expiring — see the template. */
    validThrough: string;
    baseSalary: { min: number; max: number; unit: 'HOUR' | 'YEAR' };
  }[];
}

/**
 * One JobPosting node per open role.
 *
 * Google for Jobs eligibility notes that are easy to get wrong:
 *   - `validThrough` is required here by our own contract, not just Google's. Without it a
 *     posting never expires and the board rots, which is a manual-action risk for the domain.
 *   - `baseSalary` is required by our board policy. We do not accept postings that hide pay,
 *     so there is never a reason to omit it.
 *   - `directApply` is deliberately omitted rather than set false: we do not yet know whether
 *     applications complete on-site, and a wrong value here is worse than a missing one.
 *
 * Never call this with an empty array. A page with no postings gets no JobPosting markup.
 */
export function jobEntities(i: JobListInput): SchemaNode[] {
  return i.jobs.map((j) => ({
    '@type': 'JobPosting',
    '@id': `${abs(i.path)}#job-${j.slug}`,
    title: j.title,
    description: j.summary,
    datePosted: j.datePosted,
    validThrough: j.validThrough,
    employmentType: j.employmentType.toUpperCase().replace(/[\s-]+/g, '_'),
    hiringOrganization: { '@type': 'Organization', name: j.employer },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: j.city,
        addressRegion: j.stateCode,
        addressCountry: 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: j.baseSalary.min,
        maxValue: j.baseSalary.max,
        unitText: j.baseSalary.unit,
      },
    },
  }));
}

/* ---------------------------------------------------------- partners: offers */

export interface SponsorTierInput {
  path: string;
  name: string;
  description: string;
  /** REGISTRY R-16. Omit entirely rather than guessing. */
  price?: { amount: number; currency: 'USD' };
}

export function sponsorTierEntities(tiers: SponsorTierInput[]): SchemaNode[] {
  return tiers.map((t) => {
    const node: SchemaNode = {
      '@type': 'Offer',
      '@id': `${abs(t.path)}#offer-${t.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: t.name,
      description: t.description,
      offeredBy: { '@id': ID.organization },
      category: 'Sponsorship',
    };
    if (t.price) {
      node.price = String(t.price.amount);
      node.priceCurrency = t.price.currency;
    }
    return node;
  });
}
