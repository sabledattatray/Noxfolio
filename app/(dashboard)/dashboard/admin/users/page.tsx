'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  UserCog,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Calendar,
  Globe,
  Trash2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading } = useSWR('/api/admin/users', fetcher);

  // Simulated data for UI demonstration until backend is ready
  const demoUsers = [
    {
      id: 1,
      name: 'Datta Sable',
      email: 'datta@example.com',
      role: 'admin',
      status: 'active',
      joined: '2024-01-12',
      region: 'IN-WEST',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah.c@startup.io',
      role: 'user',
      status: 'active',
      joined: '2024-03-05',
      region: 'US-EAST',
    },
    {
      id: 3,
      name: 'Marcus Wright',
      email: 'm.wright@global.com',
      role: 'user',
      status: 'pending',
      joined: '2024-05-10',
      region: 'EU-CENTRAL',
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      email: 'elena@fintech.es',
      role: 'user',
      status: 'suspended',
      joined: '2023-11-20',
      region: 'EU-WEST',
    },
  ];

  const displayUsers = users || demoUsers;

  return (
    <div className="animate-in fade-in space-y-8 duration-700">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">
            Platform Registry
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Manage global user base and administrative credentials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-primary/20 text-primary rounded-none font-bold"
          >
            Export Registry
          </Button>
          <Button className="bg-primary shadow-primary/20 rounded-none font-black text-white shadow-xl">
            Provision User
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-border bg-card/50 rounded-none backdrop-blur-sm">
          <CardHeader className="border-border/50 bg-muted/20 border-b pb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Filter by name, email or UID..."
                  className="bg-background/50 border-border/50 focus-visible:ring-primary rounded-none pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent rounded-none"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="bg-border mx-2 h-8 w-px" />
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary rounded-none px-3 py-1 text-[10px] font-black tracking-widest uppercase"
                >
                  Total Records: {displayUsers.length}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-muted/30 border-border/50 border-b">
                  <th className="text-muted-foreground p-4 text-[10px] font-black tracking-widest uppercase">
                    Identity
                  </th>
                  <th className="text-muted-foreground p-4 text-[10px] font-black tracking-widest uppercase">
                    Access Role
                  </th>
                  <th className="text-muted-foreground p-4 text-[10px] font-black tracking-widest uppercase">
                    Operational Status
                  </th>
                  <th className="text-muted-foreground p-4 text-[10px] font-black tracking-widest uppercase">
                    Deployment Region
                  </th>
                  <th className="text-muted-foreground p-4 text-[10px] font-black tracking-widest uppercase">
                    Registered
                  </th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-border/50 divide-y">
                {displayUsers.map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-accent/30 group transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-none font-black shadow-inner">
                          {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold tracking-tight">
                            {user.name}
                          </p>
                          <p className="text-muted-foreground text-xs font-medium">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? (
                          <div className="text-primary flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            <span className="text-[10px] font-black tracking-wider uppercase">
                              Root Admin
                            </span>
                          </div>
                        ) : (
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span className="text-[10px] font-black tracking-wider uppercase">
                              Standard User
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.status === 'active' && (
                          <div className="h-1.5 w-1.5 rounded-none bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        )}
                        {user.status === 'pending' && (
                          <div className="h-1.5 w-1.5 rounded-none bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        )}
                        {user.status === 'suspended' && (
                          <div className="bg-destructive h-1.5 w-1.5 rounded-none shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        )}
                        <span
                          className={cn(
                            'text-[10px] font-black tracking-widest uppercase',
                            user.status === 'active'
                              ? 'text-emerald-500'
                              : user.status === 'suspended'
                                ? 'text-destructive'
                                : 'text-amber-500',
                          )}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-muted-foreground flex items-center gap-2">
                        <Globe className="h-3 w-3" />
                        <span className="text-xs font-bold tracking-tight">
                          {user.region}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {user.joined}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-accent rounded-none opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-border bg-card rounded-none border-2 p-1 shadow-2xl"
                        >
                          <DropdownMenuLabel className="p-2 text-[10px] font-black tracking-widest uppercase">
                            Operations
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-none py-2 text-xs font-bold">
                            <UserCog className="h-3.5 w-3.5" /> Modify
                            Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-none py-2 text-xs font-bold">
                            <Mail className="h-3.5 w-3.5" /> Send Telemetry
                            Reset
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive hover:!bg-destructive/10 flex cursor-pointer items-center gap-2 rounded-none py-2 text-xs font-bold">
                            <Trash2 className="h-3.5 w-3.5" /> Decommission User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border bg-card/50 rounded-none p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight">98.2%</p>
                <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                  Verified Accounts
                </p>
              </div>
            </div>
          </Card>
          <Card className="border-border bg-card/50 rounded-none p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-none">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight">12</p>
                <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                  Flagged Sessions
                </p>
              </div>
            </div>
          </Card>
          <Card className="border-border bg-card/50 rounded-none p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-500/10 text-blue-500">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight">42</p>
                <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                  Active Regions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
