# InkSphere — Frontend

A production-ready React (Vite) frontend for the InkSphere blogging API — register/login,
publish stories with cover images, like/bookmark/comment, browse by category, search, and
manage your profile.

## Stack

- **React 19** + **Vite** — build tooling
- **React Router v7** — routing, incl. protected routes
- **Tailwind CSS v4** — styling via the `@tailwindcss/vite` plugin (design tokens in `src/index.css`)
- **Axios** — HTTP client, configured with `withCredentials: true` for the backend's
  httpOnly-cookie session
- **react-hot-toast** — notifications
- **lucide-react** — icons
- **date-fns** — date formatting

## Getting started

```bash
npm install
cp .env.example .env       # point VITE_API_URL at your backend
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment variables

| Variable        | Description                                  | Default                      |
|-----------------|-----------------------------------------------|-------------------------------|
| `VITE_API_URL`  | Base URL of the InkSphere backend API         | `http://localhost:5000/api`  |

### Backend CORS requirement

The backend must send `Access-Control-Allow-Credentials: true` and reflect the exact
frontend origin (not `*`) for the auth cookie to work cross-origin, e.g.:

```js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check-free production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — lint the source with oxlint

## Project structure

```
src/
  api/            Axios instance + one module per backend resource (auth, user, blog)
  components/
    common/       Generic UI primitives (Button, Field, Avatar, Loader, EmptyState)
    layout/       Navbar, Footer, page Layout
    blog/         Blog-specific UI (BlogCard, BlogList, CommentSection, CategoryTabs)
    ProtectedRoute.jsx
  context/        AuthContext (session state, backed by the cookie session)
  hooks/          useAuth
  pages/          One file per route
  utils/          Formatting + category helpers
  App.jsx         Route table
  main.jsx        App entry point
```

## Design notes

The visual identity ("ink & paper") pairs a Fraunces display serif with Inter for body text
and JetBrains Mono for meta/utility text. Each blog category has a dedicated color used as a
"spine" accent on story cards and category tabs, evoking a library card catalog. Colors and
type are defined as CSS variables in `src/index.css` under `@theme`.
