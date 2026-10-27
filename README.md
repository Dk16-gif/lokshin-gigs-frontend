# Lokshin Gigs — Frontend

Plain HTML/CSS/JS frontend for the Lokshin Gigs community freelance marketplace.

## Local Development

Pages call the API on the same origin (`/api/...`). A plain static server
(`npx serve public -p 3001`) does not proxy `/api`, so use `npx vercel dev`
to apply the `vercel.json` rewrites locally.

## Deployment (Vercel)

1. Push this folder to GitHub
2. Connect to Vercel, with the Root Directory left at the repository root so
   `vercel.json` is applied
3. `vercel.json` rewrites `/api/:path*` to
   `https://lokshin-gigs-backend-1.onrender.com/api/:path*`, so the backend's
   session cookie is set on the Vercel domain. Do not set `window.API_BASE` in
   the pages.

## Pages

- index.html — Landing page
- login.html — Login with email/password or Google
- register.html — Register as Customer or Freelancer
- customer-dashboard.html — Customer job management
- freelancer-dashboard.html — Freelancer job browsing
- admin-dashboard.html — Admin analytics panel
- post-job.html — Post a new job
- profile.html — Edit profile
- terms.html — Terms and conditions
