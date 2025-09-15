# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for WeCreate3, Japan's largest student Web3 community. The site is built with TypeScript and styled with Tailwind CSS, following a monochrome, minimal design approach.

## Development Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans and Geist Mono from Google Fonts

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page importing all sections
├── components/
│   ├── ui/               # Reusable UI components (Button, Container, Section)
│   ├── sections/         # Page sections (Hero, About, Mission, etc.)
│   ├── Header.tsx        # Navigation header
│   └── Footer.tsx        # Site footer
└── utils/                # Utility functions and constants
    ├── constants.ts      # Site-wide constants
    └── scrollToSection.ts # Smooth scroll functionality
```

### Component Architecture
- **Page Structure**: Single-page application with 8 main sections imported in `src/app/page.tsx`
- **Component Exports**: All components are re-exported through index.ts files for clean imports
- **UI Components**: Reusable components in `ui/` folder following consistent design patterns
- **Sections**: Each major page section is a separate component in `sections/` folder

### Path Aliases
- `@/*` maps to `./src/*` for clean imports (configured in tsconfig.json)

### Styling Approach
- Uses CSS custom properties defined in `globals.css` for theme consistency
- Tailwind classes for component styling
- Responsive design with mobile-first approach
- Monochrome color scheme with focus on typography and white space

### Development Notes
- TypeScript strict mode enabled
- ES modules with ESNext target
- Next.js 15 features available (App Router, etc.)
- Japanese language content (lang="ja" in layout)
- SEO optimized with comprehensive metadata including OpenGraph and Twitter cards