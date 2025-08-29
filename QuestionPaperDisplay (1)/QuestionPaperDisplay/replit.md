# Overview

This is a full-stack web application built with React, Node.js/Express, and PostgreSQL. The application implements a BFHL (Backend for Frontend Handler Logic) API that processes arrays of mixed data types and categorizes them into numbers, alphabets, and special characters while performing various calculations. The frontend provides an interactive testing interface with documentation for the API.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**UI Framework**: Built with shadcn/ui components using Radix UI primitives and Tailwind CSS for styling. The design system uses a "new-york" theme with neutral base colors and CSS variables for theming.

**State Management**: Uses TanStack React Query for server state management and data fetching. Local component state is managed with React hooks.

**Routing**: Implements client-side routing with Wouter, a lightweight React router.

**Form Handling**: Uses React Hook Form with Zod for form validation and schema validation.

## Backend Architecture

**Framework**: Express.js server with TypeScript, using ES modules.

**API Design**: RESTful API with a single POST endpoint `/api/bfhl` that accepts arrays of mixed data and returns categorized results.

**Data Processing**: The API processes input arrays to separate numbers (odd/even), alphabets, and special characters, while calculating sums and concatenations.

**Error Handling**: Centralized error handling middleware with Zod schema validation for request validation.

**Development Tools**: Uses tsx for TypeScript execution in development and esbuild for production builds.

## Data Storage

**Database**: PostgreSQL with Neon Database as the serverless provider.

**ORM**: Drizzle ORM for type-safe database operations and schema management.

**Schema Management**: Database migrations are handled through Drizzle Kit with schema definitions in TypeScript.

**Storage Abstraction**: Implements a storage interface pattern with both memory-based and database implementations for flexibility.

## Development and Build System

**Package Management**: Uses npm with a monorepo structure containing client, server, and shared code.

**Build Process**: Vite handles frontend builds while esbuild compiles the server for production.

**Development Server**: Vite dev server with HMR for frontend development, integrated with Express server.

**Type Safety**: Shared TypeScript schemas between frontend and backend using Zod for runtime validation.

## Authentication and Session Management

**Session Storage**: Configured with connect-pg-simple for PostgreSQL-based session storage.

**User Management**: Basic user entity with username/password structure, though authentication endpoints are not yet implemented.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: TypeScript ORM for database operations

## UI and Styling
- **Radix UI**: Headless UI component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Development Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: JavaScript bundler for server builds
- **tsx**: TypeScript execution for development

## Validation and Forms
- **Zod**: Schema validation library
- **React Hook Form**: Form handling library

## State Management
- **TanStack React Query**: Server state management and data fetching

## Date Handling
- **date-fns**: Date utility library

## Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment