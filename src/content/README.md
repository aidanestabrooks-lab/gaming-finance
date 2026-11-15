# Publishing a new project

Every project is one markdown file in `src/content/projects/`. The filename becomes the URL:
`week-05-example.md` is served at `/projects/week-05-example`.

To publish: add the file, commit, push to `main`. GitHub Actions builds and deploys in about two minutes.

## Frontmatter template

```yaml
---
title: "Title of the project"
date: 2026-11-20            # YYYY-MM-DD. Newest date is featured on the home page.
week: 5                     # Week number shown as a badge.
tags: [Firms, Game Theory]  # One or more of: Firms, Geopolitics, Game Theory, Markets
summary: "One or two sentences. Shown on cards, in the RSS feed, and under the title."
takeaways:
  - "First takeaway for investors."
  - "Second takeaway."
sources:
  - title: "Name of the source"
    url: https://example.com/report
charts:                     # Optional. Rendered below the body with Chart.js.
  - title: "What the chart shows"
    type: line              # line or bar
    labels: ["2022", "2023", "2024"]
    series:
      - name: "Series A"
        data: [10, 12, 15]
      - name: "Series B"
        data: [8, 9, 14]
    note: "Source and units. Keep it short."
draft: false                # true hides the project from the site and the build.
---

Body in markdown. Headings start at `##`. Images go in `public/images/` and are referenced as
`/gaming-finance/images/name.png` until a custom domain is set up (then `/images/name.png`).
```

## Rules the build enforces

- `tags` must only use the four allowed values, or the build fails with a clear error.
- `week` must be a positive whole number.
- Every `sources` entry needs a valid URL.
- `takeaways` needs at least one item.
