# Logistics Project Management Platform

## Overview

This is a comprehensive logistics project management platform built for coordinating deliveries, tracking shipments, and managing logistics operations. The application focuses on project-based logistics management with detailed trip tracking capabilities, including specialized wind turbine component tracking. The platform implements a Material Design 3 (Material You) design system with a modern, clean interface optimized for both light and dark modes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library based on Radix UI primitives
- Material Design 3 design principles with custom color system
- Tailwind CSS for utility-first styling with custom Material Design color palette
- Roboto font family for typography (primary UI) and Roboto Mono for monospace content
- Component variants managed through class-variance-authority
- Comprehensive theme system supporting light and dark modes with CSS variables

**State Management Approach**
- TanStack Query for remote data synchronization
- React hooks (useState, useContext) for local component state
- Custom hooks for reusable stateful logic (useToast, useIsMobile)
- No global state management library (Redux/Zustand) currently implemented

**Key UI Features**
- Responsive design with mobile-first breakpoints
- Accessibility-focused components using Radix UI primitives
- Toast notifications system for user feedback
- Theme toggle with localStorage persistence and system preference detection
- Reusable form components with validation support via react-hook-form

### Backend Architecture

**Server Framework**
- Express.js REST API server
- TypeScript for type safety across frontend and backend
- Middleware-based request processing with logging and error handling
- HTTP server creation using Node's native http module

**API Design**
- RESTful API pattern with /api prefix for all routes
- Shared type definitions between client and server via TypeScript
- JSON request/response format
- Session-based or stateless authentication (implementation pending)

**Code Organization**
- Modular route registration system (server/routes.ts)
- Storage abstraction layer with interface-based design (IStorage)
- In-memory storage implementation (MemStorage) for development
- Centralized database connection management

### Data Storage

**Database**
- PostgreSQL as the primary database (Neon serverless)
- Drizzle ORM for type-safe database operations
- Schema-first approach with TypeScript type inference
- WebSocket connection support for real-time capabilities via Neon serverless

**Data Models**
- Users table with UUID primary keys, username/password authentication
- Schema validation using Zod with drizzle-zod integration
- Automatic UUID generation using PostgreSQL's gen_random_uuid()
- Migration management via drizzle-kit

**Storage Architecture Decision**
- Abstraction layer (IStorage interface) allows swapping between in-memory and database implementations
- Currently uses MemStorage for rapid development
- Database schema defined but not actively used in routes yet
- Easy migration path from mock data to database persistence

### Authentication & Authorization

**Current Implementation**
- Basic user schema with username/password fields
- No active authentication middleware or session management implemented
- Login UI components designed and ready for integration

**Planned Architecture**
- Session-based authentication using connect-pg-simple for PostgreSQL session storage
- Credential-based login with password hashing (library to be selected)
- Protected API routes requiring authentication
- User context management on frontend

### External Dependencies

**Core Third-Party Services**
- Neon Database: Serverless PostgreSQL hosting with WebSocket support for real-time features
- Google Fonts API: Roboto and Roboto Mono font families loaded via CDN

**Development Dependencies**
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime-error-modal)
- ESBuild for production bundling of server code
- TSX for TypeScript execution in development

**UI Component Dependencies**
- Radix UI: 20+ primitive components for accessible UI building blocks
- Lucide React: Icon library
- React Icons: Additional icon set (specifically for brand icons like Google)
- date-fns: Date formatting and manipulation
- cmdk: Command palette component
- vaul: Drawer/sheet component primitive
- embla-carousel-react: Carousel functionality
- react-day-picker: Calendar/date picker
- recharts: Charting library (imported but not actively used)

**Form & Validation**
- react-hook-form: Form state management
- @hookform/resolvers: Form validation resolvers
- Zod: Runtime type validation and schema definition

**Design System Rationale**
The application explicitly follows Material Design 3 guidelines per user requirements, prioritizing clarity, efficiency, and familiarity. The color system uses HSL values for easy theme manipulation, with distinct palettes for light/dark modes and semantic color assignments for status indicators (success, warning, error, info).

**Storage Layer Rationale**
The IStorage abstraction provides flexibility during development (using MemStorage) while maintaining a clear migration path to database persistence. This allows rapid prototyping without database complexity, then seamless transition to production-ready storage.