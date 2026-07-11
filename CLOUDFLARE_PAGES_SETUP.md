# Cloudflare Pages deployment

Use these settings in **Workers & Pages > your Pages project > Settings > Builds & deployments**:

- Framework preset: `React (Vite)`
- Production branch: `main` (or the branch used by your repository)
- Root directory: leave blank when `package.json` is at repository root; use `app` only when the repository contains an outer `app/` folder
- Build command: `npm run build`
- Build output directory: `dist`

The project pins Node.js through `.node-version` and forces the official npm registry through `.npmrc`.

After replacing the repository files, commit and push. In Cloudflare, start a new deployment and clear the build cache if the old failed dependency cache is still being restored.
