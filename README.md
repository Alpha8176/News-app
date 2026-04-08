# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Environment variables

This project now uses a backend proxy and reads your NewsAPI key from a server-side environment variable.

1. Copy `.env.example` to `.env`.
2. Set your key:

```env
NEWSAPI_KEY=your_newsapi_key_here
```

3. Restart the server or dev process after changing `.env`.

> `.env` is ignored by git, so your key will not be committed.

## Local development

Install dependencies and start both frontend and backend:

```bash
npm install
npm run dev:all
```

Then open `http://localhost:5173`.

The frontend calls `/api/top-headlines`, and the backend proxies the request to NewsAPI using the secret key.

## Production deployment

This app now includes a server that can serve the built frontend plus the NewsAPI proxy.

Use a host that supports Node.js, such as Vercel, Render, or Railway.

1. Run `npm install`
2. Build the frontend: `npm run build`
3. Start the server: `npm run start`

In production the server will serve the `dist` folder and proxy `/api/top-headlines` to NewsAPI.

- Set `NEWSAPI_KEY` in the deployment environment
- Do not deploy to GitHub Pages only, because GitHub Pages cannot run the backend proxy

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
