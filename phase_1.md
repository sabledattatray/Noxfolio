PHASE 1 PRD — FOUNDATION & CORE SETUP
Project: BillForge
Phase Goal:

Transform the cloned SaaS starter into a clean, production-grade enterprise foundation before building advanced billing features.

This phase focuses ONLY on:

architecture
cleanup
branding
database setup
auth
organizations
layouts
developer infrastructure
code quality
reusable systems

NOT billing engine yet.

🎯 PHASE 1 OBJECTIVES

By the end of Phase 1, you should have:

✅ Production-ready project structure
✅ Premium branded SaaS foundation
✅ Authentication system working
✅ Organizations/workspaces working
✅ Dashboard shell completed
✅ Dark enterprise UI
✅ Database configured
✅ RBAC foundation
✅ Environment configs
✅ Docker setup
✅ CI/CD foundation
✅ Clean architecture
✅ Reusable component system

🧱 PHASE 1 MODULES
MODULE 1 — PROJECT REBRANDING
Goal

Convert generic SaaS starter into:

“BillForge”
Tasks
Rename Project Everywhere

Replace:

ACME
SaaS Starter
default branding

With:

BillForge
Update
package.json
metadata
manifest
README
SEO titles
OpenGraph
favicon
logos
environment variables
Prompt
Rebrand the entire Next.js SaaS Starter project into a premium enterprise SaaS platform named “BillForge”.

Requirements:
- Replace all ACME branding
- Update metadata
- Update SEO titles/descriptions
- Add premium enterprise branding
- Use modern SaaS language
- Keep architecture clean
- Ensure no old branding remains
- Update favicon references
- Prepare project for production branding

Style:
- Enterprise-grade
- Stripe/Vercel inspired
- Dark mode first
- Premium developer tool aesthetic
MODULE 2 — CLEAN ARCHITECTURE SETUP
Goal

Create scalable enterprise folder structure.

Target Structure
/apps
  /web
  /api

/components
  /dashboard
  /billing
  /analytics
  /tables
  /charts
  /shared
  /forms

/lib
  /auth
  /db
  /stripe
  /redis
  /permissions
  /validators

/hooks
/store
/types
/config
/styles
Tasks
Refactor messy folders
Separate business logic
Create reusable architecture
Centralize utilities
Remove starter boilerplate
Prompt
Refactor the project into a scalable enterprise-grade SaaS architecture.

Requirements:
- Organize components by domain
- Separate dashboard/business/shared logic
- Create reusable utilities structure
- Use clean TypeScript architecture
- Remove unnecessary starter boilerplate
- Prepare folders for future billing modules
- Improve maintainability and scalability

Architecture Style:
- Enterprise monorepo-inspired structure
- Modular
- Highly scalable
- Clean separation of concerns
MODULE 3 — DESIGN SYSTEM FOUNDATION
Goal

Build reusable premium UI system.

Requirements
Design Language
Dark mode first
Premium SaaS aesthetic
Minimal but luxurious
Smooth animations
Glassmorphism
Soft shadows
Rounded corners
Enterprise dashboard feel
Create
Base Components
Button
Card
Modal
Table
Badge
Dropdown
Input
Tabs
Sidebar
Topbar
Empty states
Skeleton loaders
Prompt
Create a premium enterprise SaaS design system for BillForge.

Requirements:
- Dark mode first
- Stripe + Linear inspired aesthetic
- Reusable component system
- Professional dashboard appearance
- Smooth hover states
- Soft shadows
- Rounded 2xl corners
- Consistent spacing
- Accessible UI
- Responsive design
- Elegant typography

Build reusable:
- cards
- tables
- modals
- buttons
- form controls
- badges
- navigation components

Tech:
- Tailwind CSS
- Shadcn UI
- Framer Motion
MODULE 4 — AUTHENTICATION HARDENING
Goal

Upgrade auth into production-grade auth system.

Features
OAuth
session handling
protected routes
middleware
role handling
activity logs
Tasks
Add
Google auth
GitHub auth
session expiration
secure cookies
auth middleware
route protection
login history
Prompt
Upgrade the authentication system into a production-grade enterprise authentication module.

Requirements:
- Google OAuth
- GitHub OAuth
- Secure session management
- Middleware-based route protection
- Protected dashboard routes
- Activity logging
- Secure cookies
- RBAC-ready architecture
- Scalable auth structure
- Type-safe authentication flows

Security:
- HTTP-only cookies
- CSRF protection
- Input validation
- Session expiration handling
MODULE 5 — ORGANIZATION & TEAM SYSTEM
Goal

Build enterprise multi-tenant workspace architecture.

Features
Organizations
Team switching
Invitations
Roles
Permissions
Roles
Owner
Admin
Finance
Developer
Viewer
Prompt
Build a scalable multi-tenant organization and team management system for BillForge.

Requirements:
- Organization workspaces
- Team invitations
- Workspace switching
- Role-based permissions
- Organization settings
- Team member management
- Activity tracking
- Permission guards
- Enterprise SaaS architecture

Roles:
- Owner
- Admin
- Finance
- Developer
- Viewer

Requirements:
- Clean database relationships
- Secure permission handling
- Reusable RBAC utilities
- Type-safe role system
MODULE 6 — DASHBOARD FOUNDATION
Goal

Build dashboard shell before analytics.

Dashboard Layout
Sidebar
workspace switcher
navigation
quick actions
Topbar
notifications
search
profile menu
Main Area
widgets placeholder
activity feed
overview cards
Prompt
Create a premium enterprise SaaS dashboard foundation for BillForge.

Requirements:
- Collapsible sidebar
- Top navigation bar
- Workspace switcher
- Search command menu
- Notification center
- Activity feed
- Responsive dashboard layout
- Smooth animations
- Enterprise UI patterns

Style:
- Stripe dashboard inspired
- Dark premium aesthetic
- Minimal but professional
- Smooth interactions
- Spacious layout
MODULE 7 — DATABASE & ORM SETUP
Goal

Create scalable database foundation.

Tables
users
organizations
organization_members
roles
permissions
sessions
activity_logs
notifications
Tasks
optimize schema
create indexes
prepare relationships
add enums
type-safe queries
Prompt
Design a scalable PostgreSQL database architecture for BillForge Phase 1 foundation.

Requirements:
- Multi-tenant SaaS structure
- Organization relationships
- Team memberships
- Role-based permissions
- Session handling
- Activity logging
- Notification system

Requirements:
- Optimized indexes
- Prisma/Drizzle best practices
- Type-safe schema
- Scalable relationships
- Clean migrations
MODULE 8 — DEVELOPER EXPERIENCE
Goal

Professional engineering setup.

Add
ESLint
Prettier
Husky
lint-staged
commitlint
env validation
Prompt
Set up enterprise-grade developer tooling for BillForge.

Requirements:
- ESLint
- Prettier
- Husky git hooks
- lint-staged
- commitlint
- TypeScript strict mode
- Environment variable validation
- Path aliases
- Clean import structure
- Scalable DX setup

Goal:
- Production-quality engineering workflow
- Consistent code standards
- Maintainable architecture
MODULE 9 — DOCKER & INFRASTRUCTURE
Goal

Production-ready local environment.

Add
Dockerfile
docker-compose
PostgreSQL container
Redis container
Prompt
Create production-grade Docker infrastructure for BillForge.

Requirements:
- Dockerized Next.js app
- PostgreSQL container
- Redis container
- Docker Compose setup
- Environment variable support
- Development and production configurations
- Optimized Docker builds
- Scalable infrastructure setup

Goal:
- Easy local development
- Production deployment readiness
MODULE 10 — CI/CD FOUNDATION
Goal

Automated quality pipeline.

Add
GitHub Actions
lint workflow
build checks
test pipeline
Prompt
Set up enterprise CI/CD pipelines for BillForge.

Requirements:
- GitHub Actions workflows
- Lint checks
- Type checking
- Build validation
- Test pipeline foundation
- Pull request validation
- Environment setup
- Production deployment readiness

Goal:
- Enterprise engineering workflow
- Automated quality assurance
MODULE 11 — GLOBAL APP CONFIGURATION
Goal

Production-safe configuration layer.

Add
env validation
constants
feature flags
config abstraction
Prompt
Create a scalable application configuration architecture for BillForge.

Requirements:
- Environment variable validation
- Centralized app config
- Feature flags system
- Runtime-safe configuration
- Type-safe env handling
- Scalable constants structure
- Production-ready config architecture

Goal:
- Clean maintainable app configuration
- Enterprise-grade scalability
MODULE 12 — PHASE 1 FINAL POLISH
Goal

Make project look like funded startup.

Add
loading states
skeletons
animations
empty states
premium typography
transitions
Prompt
Polish the entire BillForge Phase 1 foundation into a premium enterprise SaaS experience.

Requirements:
- Smooth animations
- Skeleton loading states
- Empty states
- Hover interactions
- Premium typography
- Transition effects
- Dashboard polish
- Responsive refinement
- Professional spacing
- Enterprise-quality visual consistency

Goal:
- Product should feel like a funded startup
- Premium SaaS experience
- Recruiter-impressive UI quality
✅ PHASE 1 COMPLETION CHECKLIST
Architecture
 Clean folder structure
 Modular architecture
 Reusable components
UI
 Premium dark UI
 Responsive dashboard
 Design system
Backend
 Auth hardened
 RBAC foundation
 Organizations working
Infrastructure
 Docker working
 CI/CD setup
 Env validation
DX
 ESLint
 Prettier
 Git hooks
Final
 Looks production-grade
 No starter branding
 Clean GitHub repo
 Deployable foundation