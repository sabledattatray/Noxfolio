import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  emailVerifiedAt: timestamp('email_verified_at'),
  otp: varchar('otp', { length: 6 }),
  otpExpiresAt: timestamp('otp_expires_at'),
  image: text('image'),
});

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  razorpayCustomerId: text('razorpay_customer_id').unique(),
  razorpaySubscriptionId: text('razorpay_subscription_id').unique(),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
  branding: jsonb('branding').default({
    logo: null,
    primaryColor: '#000000',
    accentColor: '#f4f4f5',
    font: 'Inter',
    darkMode: true
  }),
  installedApps: jsonb('installed_apps').default([]),
  customDomain: varchar('custom_domain', { length: 255 }).unique(),
  balance: integer('balance').default(0),
});

export const organizationMembers = pgTable('organization_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  isRead: integer('is_read').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  stripeInvoiceId: varchar('stripe_invoice_id', { length: 255 }).unique(),
  razorpayOrderId: varchar('razorpay_order_id', { length: 255 }).unique(),
  razorpayPaymentId: varchar('razorpay_payment_id', { length: 255 }).unique(),
  number: varchar('number', { length: 50 }),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull().default('usd'),
  status: varchar('status', { length: 50 }).notNull(),
  pdfUrl: text('pdf_url'),
  hostedInvoiceUrl: text('hosted_invoice_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const invoiceItems = pgTable('invoice_items', {
  id: serial('id').primaryKey(),
  invoiceId: integer('invoice_id')
    .notNull()
    .references(() => invoices.id),
  description: text('description').notNull(),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 10 }).notNull().default('usd'),
  quantity: integer('quantity').notNull().default(1),
});

export const coupons = pgTable('coupons', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  amountOff: integer('amount_off'),
  percentOff: integer('percent_off'),
  duration: varchar('duration', { length: 20 }).notNull(),
  durationInMonths: integer('duration_in_months'),
  maxRedemptions: integer('max_redemptions'),
  timesRedeemed: integer('times_redeemed').notNull().default(0),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usageEvents = pgTable('usage_events', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  type: varchar('type', { length: 50 }).notNull(),
  value: integer('value').notNull().default(1),
  metadata: jsonb('metadata'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});

export const analyticsSnapshots = pgTable('analytics_snapshots', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  type: varchar('type', { length: 50 }).notNull(), // e.g., 'mrr_snapshot', 'customer_cohort'
  data: jsonb('data').notNull(),
  snapshotDate: timestamp('snapshot_date').notNull().defaultNow(),
});

export const kpiMetrics = pgTable('kpi_metrics', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  name: varchar('name', { length: 50 }).notNull(), // e.g., 'MRR', 'ARR', 'LTV'
  value: integer('value').notNull(), // Multiplied by 100 for decimals if needed
  period: varchar('period', { length: 20 }).notNull(), // e.g., '2024-05'
  calculatedAt: timestamp('calculated_at').notNull().defaultNow(),
});

export const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  key: varchar('key', { length: 255 }).notNull().unique(), // Hashed key
  name: varchar('name', { length: 100 }).notNull(),
  prefix: varchar('prefix', { length: 20 }).notNull(), // e.g., 'bf_live_'
  scopes: jsonb('scopes').notNull(), // e.g., ['read:billing', 'write:customers']
  environment: varchar('environment', { length: 20 }).notNull().default('live'),
  expiresAt: timestamp('expires_at'),
  lastUsedAt: timestamp('last_used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const webhookEndpoints = pgTable('webhook_endpoints', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  url: text('url').notNull(),
  secret: varchar('secret', { length: 255 }).notNull(),
  events: jsonb('events').notNull(), // e.g., ['invoice.paid', 'subscription.deleted']
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  organizationId: integer('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: integer('user_id').references(() => users.id),
  action: varchar('action', { length: 255 }).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // e.g., 'invoice', 'api_key'
  entityId: varchar('entity_id', { length: 255 }).notNull(),
  metadata: jsonb('metadata'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  organizationMembers: many(organizationMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
  invoices: many(invoices),
  usageEvents: many(usageEvents),
  analyticsSnapshots: many(analyticsSnapshots),
  kpiMetrics: many(kpiMetrics),
  apiKeys: many(apiKeys),
  webhookEndpoints: many(webhookEndpoints),
  auditLogs: many(auditLogs),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [invoices.organizationId],
    references: [organizations.id],
  }),
  items: many(invoiceItems),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  organizationMembers: many(organizationMembers),
  invitationsSent: many(invitations),
  notifications: many(notifications),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  organization: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMember = typeof organizationMembers.$inferSelect;
export type NewOrganizationMember = typeof organizationMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type OrganizationDataWithMembers = Organization & {
  organizationMembers: (OrganizationMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type NewInvoiceItem = typeof invoiceItems.$inferInsert;
export type Coupon = typeof coupons.$inferSelect;
export type NewCoupon = typeof coupons.$inferInsert;
export type UsageEvent = typeof usageEvents.$inferSelect;
export type NewUsageEvent = typeof usageEvents.$inferInsert;
export type AnalyticsSnapshot = typeof analyticsSnapshots.$inferSelect;
export type NewAnalyticsSnapshot = typeof analyticsSnapshots.$inferInsert;
export type KpiMetric = typeof kpiMetrics.$inferSelect;
export type NewKpiMetric = typeof kpiMetrics.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type WebhookEndpoint = typeof webhookEndpoints.$inferSelect;
export type NewWebhookEndpoint = typeof webhookEndpoints.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_ORGANIZATION = 'CREATE_ORGANIZATION',
  REMOVE_ORGANIZATION_MEMBER = 'REMOVE_ORGANIZATION_MEMBER',
  INVITE_ORGANIZATION_MEMBER = 'INVITE_ORGANIZATION_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
