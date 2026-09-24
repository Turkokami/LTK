/** Shared schema types. Loose by design — schema.org is not a closed vocabulary. */

export type SchemaValue = string | number | boolean | null | SchemaNode | SchemaValue[];
export interface SchemaNode {
  '@type'?: string | string[];
  '@id'?: string;
  [key: string]: SchemaValue | undefined;
}

export interface Crumb {
  name: string;
  /** Path only, e.g. '/academy/'. */
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface PersonRef {
  name: string;
  /** Path to this person's page. Every named expert gets a real URL. CLAUDE.md 12.2 of the audit. */
  path: string;
  jobTitle?: string;
  affiliation?: string;
  sameAs?: string[];
  credential?: {
    category: string;
    identifier?: string;
    issuedBy?: string;
  };
}
