# TMC Luxury Miami — Pilot App

Internal clickable pilot, 4 roles (Owner, Investor, Internal/Admin, PM), built with Next.js.
Sample data only. No real backend yet — this is Stage 1 of the roadmap (Stage 2 wires up Supabase/auth/roles for production).

## What's real vs. what's a placeholder

Every feature in this app was generated from `TMC_Luxury_Functionalities_v14.xlsx`, column **MVP**:

- **MVP = SI** -> the feature actually works in this pilot (with sample data, stored only in your browser tab).
- **MVP = blank** -> the feature is visible but tapping it shows "Under construction."
- **MVP = NO** -> the feature is not shown at all.

To change what's active, edit `src/data/functionalities.json` (regenerated from the Excel) or update the Excel and re-export.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for deployment

```bash
npm run build
```

This produces a static site in the `out/` folder (configured via `output: "export"` in `next.config.ts`) - no server required.

## Deploy to Netlify via GitHub

1. Create a new repository on GitHub and push this project:
   ```bash
   git init
   git add .
   git commit -m "TMC Luxury Miami pilot"
   git branch -M main
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```
2. In Netlify: **Add new project -> Import an existing project -> GitHub** -> select this repo.
3. Build settings (Netlify usually auto-detects these for Next.js, confirm they match):
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Deploy. Netlify gives you a live URL immediately, and redeploys automatically on every push to `main`.

## Project structure

- `src/app/<role>/<section>/page.tsx` - one page per role/section (Owner: home, services, finance, profile; Investor: portfolio, properties, reports, profile; Admin: tickets, contractors, properties, billing; PM: command, team, financials, profile)
- `src/components/Shell.tsx` - shared UI: bottom nav, top bar, feature rows, toast, SOS button
- `src/lib/store.tsx` - in-memory app state (role, tickets, invoices) and actions
- `src/lib/functionalities.ts` - reads `src/data/functionalities.json` and exposes helpers used to decide what's active/disabled/hidden
- `src/data/functionalities.json` - the 95 functionalities from the Excel, with MVP status
