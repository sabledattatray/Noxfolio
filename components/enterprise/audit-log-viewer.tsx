'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, Search, Filter, Download, User, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockLogs = [
  {
    id: 1,
    action: 'API Key Created',
    user: 'admin@noxfolio.com',
    ip: '192.168.1.1',
    timestamp: '2024-03-20 14:30:05',
    status: 'success',
  },
  {
    id: 2,
    action: 'Invoice Purged',
    user: 'finance@noxfolio.com',
    ip: '192.168.1.5',
    timestamp: '2024-03-20 12:15:22',
    status: 'warning',
  },
  {
    id: 3,
    action: 'User MFA Enabled',
    user: 'dev@noxfolio.com',
    ip: '192.168.1.12',
    timestamp: '2024-03-19 09:45:10',
    status: 'success',
  },
  {
    id: 4,
    action: 'Billing Plan Changed',
    user: 'admin@noxfolio.com',
    ip: '192.168.1.1',
    timestamp: '2024-03-18 16:20:00',
    status: 'success',
  },
];

export function AuditLogViewer() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Enterprise Audit Trail</CardTitle>
              <CardDescription>
                Immutable record of all critical platform actions.
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search logs by user, action or IP..."
              className="bg-accent/30 border-border/50 rounded-xl pl-10"
            />
          </div>
          <Button variant="outline" className="border-border/50 rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="border-border/50 overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader className="bg-accent/30">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-bold tracking-wider uppercase">
                  Action
                </TableHead>
                <TableHead className="text-xs font-bold tracking-wider uppercase">
                  User
                </TableHead>
                <TableHead className="text-center text-xs font-bold tracking-wider uppercase">
                  IP Address
                </TableHead>
                <TableHead className="text-right text-xs font-bold tracking-wider uppercase">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-border/50 hover:bg-accent/20 group transition-colors"
                >
                  <TableCell className="py-4">
                    <span className="text-sm font-bold">{log.action}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <User className="h-3 w-3" />
                      {log.user}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-muted-foreground flex items-center justify-center gap-2 font-mono text-xs">
                      <Globe className="h-3 w-3" />
                      {log.ip}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right font-mono text-xs">
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
