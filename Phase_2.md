PHASE 2 PRD — BILLING ENGINE & PAYMENT INFRASTRUCTURE
Project: Noxfolio
Phase Goal:

Build the complete enterprise-grade billing core for Noxfolio.

This phase transforms the project from:

“SaaS dashboard”

into:

“Real Subscription Billing Platform”

This is the MOST IMPORTANT phase of the entire product.

🎯 PHASE 2 OBJECTIVES

By the end of Phase 2:

✅ Subscription system fully working
✅ Stripe billing integrated
✅ Plans & pricing engine complete
✅ Invoice generation complete
✅ Usage billing ready
✅ Tax system foundation working
✅ Customer billing portal built
✅ Payment workflows production-ready
✅ Refund system implemented
✅ Coupon/discount system working
✅ Webhook processing operational
✅ Billing database architecture finalized

🧱 PHASE 2 MODULES
MODULE 1 — BILLING ARCHITECTURE FOUNDATION
Goal

Create scalable enterprise billing architecture.

Core Concepts
Entities
Customers
Plans
Subscriptions
Payments
Invoices
Usage events
Coupons
Tax records
Refunds
Transactions
Required Structure
/modules
  /billing
    /subscriptions
    /plans
    /payments
    /invoices
    /tax
    /coupons
    /usage
    /refunds
    /webhooks
Prompt
Design an enterprise-grade billing architecture for Noxfolio.

Requirements:
- Modular billing system
- Clean separation of concerns
- Stripe-compatible architecture
- Scalable subscription handling
- Invoice system structure
- Usage billing support
- Tax engine support
- Refund workflows
- Coupon architecture
- Webhook event processing

Architecture Goals:
- Enterprise-grade maintainability
- Scalable billing workflows
- Future-proof extensibility
- Clean TypeScript architecture
MODULE 2 — STRIPE INTEGRATION
Goal

Integrate production-grade Stripe billing workflows.

Features
Stripe Features
Checkout sessions
Customer portal
Subscription management
Payment intents
Invoice syncing
Webhook verification
Refunds
Payment methods
Requirements
Stripe Flows
New Subscription
User selects plan
Stripe checkout opens
Payment succeeds
Subscription created
Webhook verifies
DB updates
Access granted
Add
Stripe SDK
Secure webhook handling
Retry-safe logic
Idempotency
Prompt
Integrate Stripe into Noxfolio as a production-grade billing infrastructure provider.

Requirements:
- Stripe Checkout integration
- Subscription handling
- Customer portal integration
- Secure webhook verification
- Invoice synchronization
- Payment intent handling
- Refund support
- Payment method management
- Subscription lifecycle syncing

Security:
- Webhook signature verification
- Idempotent payment handling
- Secure server-side processing
- Retry-safe billing workflows

Architecture:
- Clean billing abstraction layer
- Scalable Stripe service architecture
MODULE 3 — PLANS & PRICING ENGINE
Goal

Build flexible subscription pricing system.

Plan Types
Supported
Free
Monthly
Yearly
Usage-based
Tiered
Per-seat
Enterprise custom
Plan Features
plan limits
feature gating
pricing metadata
quota system
upgrade/downgrade
custom enterprise plans
Example Plans
Starter
₹999/month
Growth
₹4999/month
Enterprise
Custom
Prompt
Build a scalable SaaS pricing and subscription plan engine for Noxfolio.

Requirements:
- Monthly/yearly plans
- Usage-based pricing
- Tiered subscriptions
- Per-seat billing
- Plan limits
- Feature gating
- Quota tracking
- Upgrade/downgrade flows
- Enterprise custom plans

Features:
- Plan comparison system
- Dynamic pricing support
- Flexible metadata structure
- Subscription entitlement system

Architecture:
- Future-proof pricing engine
- Enterprise SaaS flexibility
MODULE 4 — SUBSCRIPTION MANAGEMENT SYSTEM
Goal

Build complete subscription lifecycle management.

Features
Subscription States
active
trialing
past_due
cancelled
suspended
incomplete
expired
Workflows
start trial
upgrade
downgrade
cancel
pause
resume
renew
retry failed payment
Add
proration handling
grace periods
dunning management
subscription schedules
Prompt
Build a production-grade subscription lifecycle management system for Noxfolio.

Requirements:
- Subscription creation
- Upgrade/downgrade handling
- Plan switching
- Trial management
- Subscription cancellation
- Pause/resume subscriptions
- Grace periods
- Dunning management
- Proration calculations
- Renewal workflows

Subscription States:
- active
- trialing
- past_due
- cancelled
- suspended
- incomplete
- expired

Architecture:
- Event-driven subscription workflows
- Stripe synchronization
- Enterprise-grade reliability
MODULE 5 — CUSTOMER BILLING PORTAL
Goal

Create premium self-service billing portal.

Features
manage subscriptions
change plans
payment methods
invoice downloads
billing history
cancel subscriptions
update company details
UI Requirements
premium tables
modern cards
invoice timeline
payment history
Prompt
Build a premium customer billing portal for Noxfolio.

Requirements:
- Subscription management
- Invoice downloads
- Billing history
- Payment method updates
- Plan upgrades/downgrades
- Company billing details
- Subscription cancellation
- Billing activity timeline

UI Requirements:
- Premium enterprise design
- Responsive billing tables
- Elegant invoice cards
- Stripe-inspired UX
- Smooth transitions
MODULE 6 — INVOICE ENGINE
Goal

Build enterprise invoice system.

Features
automatic invoices
PDF invoices
branded invoices
invoice statuses
recurring invoices
invoice emails
Invoice Statuses
paid
pending
failed
overdue
refunded
cancelled
PDF Requirements
logo
customer info
tax breakdown
line items
totals
invoice number
Prompt
Build a complete enterprise invoice generation system for Noxfolio.

Requirements:
- Automatic invoice generation
- PDF invoice downloads
- Branded invoices
- Recurring invoices
- Invoice status tracking
- Invoice email delivery
- Tax calculations
- Payment history integration

Invoice States:
- paid
- pending
- failed
- overdue
- refunded
- cancelled

Requirements:
- Professional PDF design
- Enterprise invoice formatting
- Accurate tax breakdowns
- Downloadable invoice history
MODULE 7 — TAX ENGINE FOUNDATION
Goal

Build regional tax infrastructure.

Support
GST
VAT
Sales tax
Features
tax calculation
country tax logic
tax-inclusive pricing
tax-exclusive pricing
GST validation
Prompt
Build a scalable SaaS tax engine foundation for Noxfolio.

Requirements:
- GST support
- VAT support
- Regional tax calculations
- Tax-inclusive pricing
- Tax-exclusive pricing
- Tax validation workflows
- Country-based tax rules
- Invoice tax integration

Architecture:
- Modular tax calculation engine
- Multi-region ready
- Extensible tax rules system
MODULE 8 — PAYMENT FAILURE & DUNNING SYSTEM
Goal

Handle failed payments intelligently.

Features
payment retries
retry schedules
email reminders
grace periods
suspension logic
Retry Strategy
Day 1 retry
Day 3 retry
Day 5 retry
Suspend after threshold
Prompt
Build a production-grade failed payment recovery and dunning system for Noxfolio.

Requirements:
- Automatic retry logic
- Retry scheduling
- Grace periods
- Subscription suspension workflows
- Payment reminder notifications
- Failed payment tracking
- Retry analytics
- Customer recovery flows

Architecture:
- Event-driven retry system
- Queue-based retry handling
- Enterprise reliability
MODULE 9 — COUPON & DISCOUNT SYSTEM
Goal

Build flexible discount engine.

Features
percentage discounts
flat discounts
coupon codes
expiration dates
usage limits
referral rewards
Prompt
Build a scalable coupon and discount engine for Noxfolio.

Requirements:
- Percentage discounts
- Flat discounts
- Coupon codes
- Expiration dates
- Usage limits
- Referral rewards
- Subscription discounts
- One-time discounts

Architecture:
- Flexible promotion system
- Reusable discount logic
- Enterprise pricing compatibility
MODULE 10 — USAGE BILLING SYSTEM
Goal

Build metered billing foundation.

Features
usage tracking
API usage counting
storage tracking
request metering
usage quotas
Examples
API requests
storage GB
seats/users
transactions
Prompt
Build a scalable usage-based billing system for Noxfolio.

Requirements:
- Usage event tracking
- API request metering
- Storage tracking
- Seat-based billing
- Usage quotas
- Overage calculations
- Real-time usage monitoring
- Billing usage aggregation

Architecture:
- Event-driven usage tracking
- Scalable aggregation pipelines
- Enterprise metered billing support
MODULE 11 — BILLING DATABASE DESIGN
Goal

Finalize production billing schema.

Tables
plans
subscriptions
subscription_items
customers
payments
invoices
invoice_items
refunds
coupons
usage_events
billing_events
payment_methods
tax_records
Requirements
indexes
relationships
enums
constraints
scalability
Prompt
Design a production-grade billing database schema for Noxfolio.

Requirements:
- Subscription relationships
- Invoice architecture
- Payment tracking
- Refund handling
- Usage billing support
- Coupon system
- Tax records
- Billing events

Requirements:
- Optimized indexes
- Scalable relationships
- Transaction-safe design
- Prisma/Drizzle best practices
- Enterprise-grade schema architecture
MODULE 12 — BILLING EVENTS & WEBHOOKS
Goal

Process billing events reliably.

Events
subscription created
invoice paid
payment failed
refund issued
plan changed
Features
webhook verification
retry logic
event logs
replay events
Prompt
Build a scalable billing webhook and event processing system for Noxfolio.

Requirements:
- Stripe webhook handling
- Secure signature verification
- Billing event logging
- Retry-safe processing
- Event replay support
- Failed event recovery
- Subscription sync events
- Invoice payment events

Architecture:
- Event-driven billing workflows
- Queue-based processing
- Enterprise reliability
MODULE 13 — BILLING EMAIL SYSTEM
Goal

Automate transactional billing emails.

Emails
invoice generated
payment success
payment failed
trial ending
subscription cancelled
Prompt
Build a transactional billing email system for Noxfolio.

Requirements:
- Invoice emails
- Payment confirmation emails
- Failed payment alerts
- Trial expiration reminders
- Subscription cancellation emails
- Billing reminder workflows

Requirements:
- Premium email templates
- Responsive email design
- Queue-based delivery
- Retry-safe email sending
MODULE 14 — BILLING ANALYTICS FOUNDATION
Goal

Prepare billing metrics infrastructure.

Metrics
MRR
ARR
active subscriptions
failed payments
churn
Prompt
Build the foundational billing analytics infrastructure for Noxfolio.

Requirements:
- Revenue aggregation
- Subscription metrics
- MRR calculations
- ARR calculations
- Failed payment tracking
- Churn preparation
- Billing event aggregation

Architecture:
- Scalable analytics-ready design
- Event-driven metric tracking
- Enterprise SaaS analytics foundation
MODULE 15 — BILLING UI POLISH
Goal

Make billing experience premium.

Add
loading states
invoice animations
billing charts
payment cards
empty states
Prompt
Polish the entire Noxfolio billing experience into a premium enterprise SaaS platform.

Requirements:
- Elegant billing tables
- Invoice cards
- Smooth animations
- Payment status indicators
- Skeleton loaders
- Empty billing states
- Stripe-inspired UX
- Premium dark dashboard aesthetic

Goal:
- Billing platform should feel enterprise-grade
- Modern SaaS UX quality
- Recruiter-impressive product polish
✅ PHASE 2 COMPLETION CHECKLIST
Billing Core
 Stripe integrated
 Plans system working
 Subscriptions working
 Customer portal working
Payments
 Payment processing
 Refunds
 Payment retries
 Dunning system
Invoices
 PDF invoices
 Invoice history
 Invoice emails
Usage Billing
 Metered billing
 Usage tracking
 Quota system
Infrastructure
 Webhooks
 Billing events
 Email system
UI
 Premium billing dashboard
 Responsive tables
 Payment flows polished
🚀 PHASE 2 FINAL OUTPUT

After Phase 2, Noxfolio should feel like:

✅ real SaaS billing infrastructure
✅ Stripe alternative prototype
✅ enterprise subscription platform
✅ production-ready payment system

At this stage:

users can subscribe
invoices work
billing flows work
taxes work
plans work
Stripe sync works
enterprise billing workflows exist