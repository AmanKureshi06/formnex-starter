# Formnex Starter

A CLI tool to add contact and waitlist starter forms to Next.js apps.

## Overview

Pre-made components to get you started with Formnex.

- Contact form with Server Action
- Waitlist form with Server Action

## Usage

1. Create a form endpoint in your Formnex dashboard.
2. Create a Next.js app (typescript, tailwind, shadcn/ui, Next15)
3. Use the npx command to install the components

```bash
npx @9d8/router-start
```

It will add the following files to your project:

- app/contact/page.tsx
- app/contact/form.tsx
- app/contact/action.ts
- app/waitlist/page.tsx
- app/waitlist/form.tsx
- app/waitlist/action.ts

Make sure to add the following to your .env.local file:

```bash
FORMNEX_API_KEY=your_api_key
```

You can always reference the example project in this repo for more details.
