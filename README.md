# Apex Construction Group

A professional marketing site for a commercial and residential construction company. The app showcases services and completed projects, builds trust with testimonials and certifications, and captures leads through a multi-step quote request flow.

## Features

- Responsive layout with dark and light theme support
- Service catalog with detail views
- Project gallery with category filtering
- Multi-step quote request form with validation
- About, contact, and profile sections
- CMS-style content management view

## Tech Stack

- React 19 with TypeScript
- Vite 6
- Tailwind CSS 4
- React Hook Form + Zod for form validation
- Motion for animations
- Lucide React for icons

## Prerequisites

- Node.js 18 or later
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove build output and generated server files |

## Project Structure

```
src/
├── components/     # UI components, forms, and page sections
├── data/           # Static content for services, projects, and testimonials
├── utils/          # Shared helpers (including Persian number formatting)
├── App.tsx         # Main layout, navigation, and routing
├── main.tsx        # Application entry point
└── types.ts        # Shared TypeScript types
```

## Environment Variables

Copy `.env.example` to `.env.local` if you need to configure runtime settings for deployment. Local development works without additional setup.
