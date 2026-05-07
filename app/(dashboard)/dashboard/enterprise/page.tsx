'use client';

import { AuditLogViewer } from '@/components/enterprise/audit-log-viewer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldAlert, 
  History, 
  Lock, 
  FileCheck, 
  Server, 
  Activity,
  Database,
  Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EnterprisePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Infrastructure</h1>
          <p className="text-muted-foreground mt-1">Manage scaling, security, and production hardening for your BillForge instance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl border-border/50">
            <Server className="w-4 h-4 mr-2" />
            Infrastructure Logs
          </Button>
          <Button size="sm" className="rounded-xl">
            Compliance Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <Lock className="w-5 h-5 text-primary mb-2" />
            <CardTitle className="text-sm">Security Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">MFA Enforced, CSP Active</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <Database className="w-5 h-5 text-blue-500 mb-2" />
            <CardTitle className="text-sm">DB Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">99.9% Query Efficiency</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <Cloud className="w-5 h-5 text-emerald-500 mb-2" />
            <CardTitle className="text-sm">CDN Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Global Edge Active</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all cursor-pointer">
          <CardHeader className="pb-2">
            <Activity className="w-5 h-5 text-amber-500 mb-2" />
            <CardTitle className="text-sm">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">99.99% Last 30 Days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audit" className="space-y-8">
        <TabsList className="bg-accent/30 p-1 rounded-xl">
          <TabsTrigger value="audit" className="rounded-lg">Audit Trail</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg">Security Hardening</TabsTrigger>
          <TabsTrigger value="scaling" className="rounded-lg">Scaling & DB</TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-lg">GDPR & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-8">
          <AuditLogViewer />
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center py-20 border-2 border-dashed border-border/50 rounded-3xl bg-accent/5">
             <div className="col-span-full flex flex-col items-center">
               <ShieldAlert className="w-12 h-12 text-muted-foreground/20 mb-4" />
               <p className="text-sm font-medium">Advanced security configurations are managed via environment variables.</p>
               <p className="text-xs text-muted-foreground mt-1">MFA, CSP, and IP Whitelisting are currently ACTIVE.</p>
             </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
