# Lokshin Gigs — Frontend

Plain HTML/CSS/JS frontend for the Lokshin Gigs community freelance marketplace.

## Local Development

Serve the `public/` folder with any static server:

```
npx serve public -p 3001
```

Open: http://localhost:3001

Make sure the backend is running on http://localhost:3000

## Deployment (Vercel)

1. Push this folder to GitHub
2. Connect to Vercel
3. Set Root Directory to `public`
4. In each HTML page set:
   window.API_BASE = 'https://lokshin-gigs-backend-1.onrender.com';

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
