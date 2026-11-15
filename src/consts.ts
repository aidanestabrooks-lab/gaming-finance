export const SITE = {
  name: 'Gaming Finance',
  tagline: 'Game theory, geopolitics, and finance, one firm or event at a time',
  description:
    'A weekly research series. Each week one project analyzes a firm, a geopolitical event, or a market situation through the lens of game theory, geopolitics, and finance, written for everyday investors.',
  author: 'Aidan Estabrooks',
  startYear: 2026,
};

export const TAGS = ['Firms', 'Geopolitics', 'Game Theory', 'Markets', 'CFA'] as const;
export type Tag = (typeof TAGS)[number];

// TODO: set this to your Buttondown username once the account exists.
// The signup form stays visibly disabled until it is filled in.
export const BUTTONDOWN_USERNAME = '';

export const DISCLAIMER =
  'Gaming Finance is educational content, not investment advice. Nothing here is a recommendation to buy or sell any security. Do your own research and consult a licensed professional before making investment decisions.';

/** Prefix a site-root path with the configured base (needed for GitHub Pages project sites). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
