'use client';

import { AuditLogViewer } from '@/components/enterprise/audit-log-viewer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShieldAlert,
  History,
  Lock,
  FileCheck,
  Server,
  Activity,
  Database,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnterprisePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-6xl space-y-8 py-8 duration-700">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Enterprise Infrastructure
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage scaling, security, and production hardening for your Noxfolio
            instance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 rounded-xl"
          >
            <Server className="mr-2 h-4 w-4" />
            Infrastructure Logs
          </Button>
          <Button size="sm" className="rounded-xl">
            Compliance Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50 group hover:border-primary/50 cursor-pointer backdrop-blur-sm transition-all">
          <CardHeader className="pb-2">
            <Lock className="text-primary mb-2 h-5 w-5" />
            <CardTitle className="text-sm">Security Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              MFA Enforced, CSP Active
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 group hover:border-primary/50 cursor-pointer backdrop-blur-sm transition-all">
          <CardHeader className="pb-2">
            <Database className="mb-2 h-5 w-5 text-blue-500" />
            <CardTitle className="text-sm">DB Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              99.9% Query Efficiency
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 group hover:border-primary/50 cursor-pointer backdrop-blur-sm transition-all">
          <CardHeader className="pb-2">
            <Cloud className="mb-2 h-5 w-5 text-emerald-500" />
            <CardTitle className="text-sm">CDN Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Global Edge Active</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 group hover:border-primary/50 cursor-pointer backdrop-blur-sm transition-all">
          <CardHeader className="pb-2">
            <Activity className="mb-2 h-5 w-5 text-amber-500" />
            <CardTitle className="text-sm">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">99.99% Last 30 Days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit" className="space-y-8">
        <TabsList className="bg-accent/30 rounded-xl p-1">
          <TabsTrigger value="audit" className="rounded-lg">
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">
            Security Hardening
          </TabsTrigger>
          <TabsTrigger value="scaling" className="rounded-lg">
            Scaling & DB
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-lg">
            GDPR & Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-8">
          <AuditLogViewer />
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
          <div className="border-border/50 bg-accent/5 grid grid-cols-1 gap-8 rounded-3xl border-2 border-dashed py-20 text-center md:grid-cols-2">
            <div className="col-span-full flex flex-col items-center">
              <ShieldAlert className="text-muted-foreground/20 mb-4 h-12 w-12" />
              <p className="text-sm font-medium">
                Advanced security configurations are managed via environment
                variables.
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                MFA, CSP, and IP Whitelisting are currently ACTIVE.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
