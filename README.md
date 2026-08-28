# LumaFlow publisher website

This is a dependency-free static website for the LumaFlow Unity publisher profile. It is designed to be deployed from the root of this directory, so all asset paths are relative and work both for a project site (`https://OWNER.github.io/REPOSITORY/`) and a user/organization site (`https://OWNER.github.io/`).

## Deploy with GitHub Pages

1. Create or use a GitHub repository for this directory and push its `main` branch.
2. In the repository, open **Settings → Pages**, set **Source** to **GitHub Actions**, and save.
3. The included workflow (`.github/workflows/pages.yml`) deploys this directory on each push to `main`. The Pages URL is displayed in the workflow result and is normally:
   - `https://OWNER.github.io/REPOSITORY/` for a project repository; or
   - `https://OWNER.github.io/` when the repository is named `OWNER.github.io`.

## Before publishing

Replace each occurrence of the following values in `index.html`:

- The public repository is [sahland/lumaflow-web](https://github.com/sahland/lumaflow-web).

When the final public site URL is known, add an absolute `<link rel="canonical">`, `og:url`, and absolute `og:image` URL in `index.html`.

The logo in `assets/brand/lumaflow.png` is copied from the package documentation source. No performance results are published: the repository documents a measurement protocol, but its release budgets and shareable benchmark values are not yet locked.
