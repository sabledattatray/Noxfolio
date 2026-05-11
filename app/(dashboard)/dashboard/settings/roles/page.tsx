'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UserCheck,
  Shield,
  ChevronRight,
  Lock,
  Eye,
  Edit3,
} from 'lucide-react';

export default function RolesPermissionsPage() {
  const roles = [
    {
      name: 'Owner',
      description: 'Full access to all settings and financial data.',
      permissions: 'All',
    },
    {
      name: 'Admin',
      description: 'Can manage team members and communication channels.',
      permissions: 'Restricted Finance',
    },
    {
      name: 'Developer',
      description: 'Access to API keys, webhooks and automation tools.',
      permissions: 'No Billing',
    },
    {
      name: 'Member',
      description: 'Can view dashboard and participate in support.',
      permissions: 'Read-only Settings',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Define access levels and security permissions for your team.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-primary/20 hover:bg-primary/5 text-primary gap-2 rounded-xl"
        >
          <Lock className="h-4 w-4" />
          Audit Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <Card
            key={role.name}
            className="border-border/50 bg-card/50 group hover:border-primary/30 backdrop-blur-sm transition-all"
          >
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                  <Shield className="h-5 w-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{role.name}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-border/50 flex items-center justify-between border-t pt-4">
                <div className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                  Permissions:{' '}
                  <span className="text-foreground">{role.permissions}</span>
                </div>
                <ChevronRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50 bg-primary/5 border-dashed">
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold">Custom Roles</h3>
              <p className="text-muted-foreground text-sm">
                Need a specialized access level? Create a custom role with
                granular permissions.
              </p>
            </div>
          </div>
          <Button className="shadow-primary/20 rounded-xl shadow-lg">
            Create Custom Role
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
