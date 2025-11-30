# Portfolio app (React + Vite)

This project uses Vite + React to power the portfolio site.

## Environment variables

The portfolio case studies are gated behind a password. Configure it with:

```bash
# .env
VITE_CASE_STUDY_PASSWORD=YourChosenPassword
```

Vite exposes variables prefixed with `VITE_` to the client. If `VITE_CASE_STUDY_PASSWORD` is not set (e.g., in local development), the app falls back to the default password defined in `src/pages/Portfolio.jsx`.
