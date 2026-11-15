# Gaming Finance

Weekly research series: one project a week analyzing a firm, a geopolitical event, or a market situation through game theory, geopolitics, and finance, written for everyday investors.

Built with [Astro](https://astro.build). Deployed to GitHub Pages on every push to `main`.

## Commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Local dev server at `http://localhost:4321`    |
| `npm run build`   | Production build to `dist/`                    |
| `npm run preview` | Serve the production build locally             |

## Publishing a project

Add a markdown file to `src/content/projects/` and push. See [src/content/README.md](src/content/README.md) for the frontmatter template.

## Configuration

- `src/consts.ts`: site name, tagline, author, Buttondown username, disclaimer text.
- `astro.config.mjs`: `site` and `base`. When a custom domain is added, set `site` to the domain and remove `base`.
- `src/styles/global.css`: color and type tokens (light and dark).
