'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Search, Filter, Download, User, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockLogs = [
  { id: 1, action: 'API Key Created', user: 'admin@billforge.com', ip: '192.168.1.1', timestamp: '2024-03-20 14:30:05', status: 'success' },
  { id: 2, action: 'Invoice Purged', user: 'finance@billforge.com', ip: '192.168.1.5', timestamp: '2024-03-20 12:15:22', status: 'warning' },
  { id: 3, action: 'User MFA Enabled', user: 'dev@billforge.com', ip: '192.168.1.12', timestamp: '2024-03-19 09:45:10', status: 'success' },
  { id: 4, action: 'Billing Plan Changed', user: 'admin@billforge.com', ip: '192.168.1.1', timestamp: '2024-03-18 16:20:00', status: 'success' },
];

export function AuditLogViewer() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Enterprise Audit Trail</CardTitle>
              <CardDescription>Immutable record of all critical platform actions.</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search logs by user, action or IP..." className="pl-10 rounded-xl bg-accent/30 border-border/50" />
          </div>
          <Button variant="outline" className="rounded-xl border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="rounded-2xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-accent/30">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider">Action</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider">User</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-center">IP Address</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id} className="border-border/50 hover:bg-accent/20 transition-colors group">
                  <TableCell className="py-4">
                    <span className="text-sm font-bold">{log.action}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      {log.user}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      {log.ip}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">
                    {log.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
