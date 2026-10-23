# Zexin Li — personal homepage

A small, terminal-inspired personal website. Plain HTML, CSS, and JavaScript; no build step or external dependencies.

## Local preview

Serve this directory with a static HTTP server, for example:

```sh
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Contents

- `index.html`: introduction, interests, perspective, and links
- `styles.css`: responsive layout and visual styles
- `app.js`: local terminal commands and New York clock
- `favicon.svg`: site icon

The terminal is a browser-local interface with predefined informational commands. It does not execute shell commands or send visitor input to a server.

## Publishing

GitHub Pages serves the root of `main`. `.nojekyll` keeps the site buildless. All assets use relative paths, so the site works under a repository path.

Edit the source files and push to `main` to update the site.
