# MeraSoftware Service Website

Modern marketing site for MeraSoftware with client portal integration.

## Quick Start
- `npm install`
- Copy `.env.example` to `.env` and set live URLs.
- `npm start` for local dev, `npm run build` for production bundle.

## Environment Variables
| Key | Description |
| --- | --- |
| `REACT_APP_BACKEND_URL` | Base backend URL that serves `/api/signin`, `/api/user-details`, etc. |
| `REACT_APP_CUSTOMER_PORTAL_URL` | Full URL of the client portal subdomain (opens after login / dashboard buttons). |
| `REACT_APP_STAFF_PORTAL_URL` | Link used by “Staff Login” buttons (optional). |

> The React build must be rebuilt every time these variables change.

## Cross-Domain Login Checklist
Frontend is already wired to share login state; complete the following platform tasks so a user logging in on `merasoftware.com` is recognised on the client subdomain.

### You need to do this on the backend
- **Set cookie scope:** When issuing the auth cookie (Signin response), set  
  `Domain=.merasoftware.com; Path=/; Secure; HttpOnly; SameSite=None`.  
  Do the same attributes when clearing the cookie on logout.
- **Enable credentials for both domains:** CORS config must allow `https://merasoftware.com` and the client subdomain origin, with `Access-Control-Allow-Credentials: true`.
- **Return user details:** Keep `/api/user-details` available; both frontends call it on load to confirm the session.

### You need to do this in infrastructure/DNS
- Point `merasoftware.com` → new marketing build (this project).
- Point client subdomain (for example `client.merasoftware.com`) → existing portal.
- Ensure TLS certificate covers the root domain **and** `*.merasoftware.com`.

### After deploying
1. Log in on `merasoftware.com` -> confirm the modal closes and a new tab opens to the client portal.
2. The client portal should show the user already logged in (no extra password step).
3. Logout from either domain should clear the session everywhere.
4. Repeat with a staff login if you expose that link.

## Useful Scripts
- `npm start` – development server with hot reload.
- `npm run build` – production build in `build/`.
- `npm test` – CRA test runner (optional).

## Folder Highlights
- `src/components/Header.js` – shared auth-aware header and login modal triggers.
- `src/context/AuthContext.js` – handles login, logout, and persistence.
- `src/pages/Home.js` – hero CTA, portal buttons, and reviews section hooks.

## Notes
- Build currently emits ESLint warnings for placeholder links; address when you have final URLs.
- For the “coming soon” alert in the reviews section, replace with the real submission flow when ready.
