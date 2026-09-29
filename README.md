# OŠ Drago Milović — next-generation website

A complete, standalone redesign of the public school website and its content-management dashboard. The original project remains separate and unchanged.

## What is included

- All public routes: home, school history, news, Eko school, gallery, documents, public procurements, contact and login
- A magazine-style News experience with shared-image and page transitions
- A responsive gallery with keyboard navigation, swipe gestures and an accessible modal viewer
- Branded loading, transition, error and not-found states
- A refreshed administration dashboard with the existing Firebase workflows preserved
- A production service worker plus idle route prefetching for faster repeat navigation
- Responsive layouts and reduced-motion support

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and provide the project credentials.
3. Start development with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Performance behavior

The service worker is registered in production only. It caches versioned Next.js assets and optimized images, and keeps previously visited public pages available while refreshing them in the background. After the first page settles, the app progressively prefetches the main public routes during browser idle time. Prefetching is skipped on data-saving and slow connections.

## Environment variables

Firebase browser configuration uses the `NEXT_PUBLIC_FIREBASE_*` variables. Firebase Admin powers server-rendered content and protected API routes. Resend is used by the contact endpoint. No secrets are included in this copy.
# juosdragomilovic
