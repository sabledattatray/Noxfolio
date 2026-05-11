'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Shield, Users, Server, Activity, Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminOverview() {
  const adminStats = [
    {
      label: 'Total Users',
      value: '1,284',
      icon: Users,
      change: '+12% this month',
    },
    {
      label: 'Active Infrastructure',
      value: '14 Regions',
      icon: Server,
      change: 'All systems operational',
    },
    {
      label: 'System Load',
      value: '24%',
      icon: Activity,
      change: 'Optimal performance',
    },
    {
      label: 'Global Traffic',
      value: '1.2M',
      icon: Globe,
      change: 'Real-time monitoring',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Control Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Global platform management and infrastructure oversight.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <Card
            key={stat.label}
            className="border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <stat.icon className="text-primary h-5 w-5" />
                <span className="text-xs font-medium text-emerald-500">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Oversee platform users and their organizational access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/admin/users">
              <Button className="w-full rounded-xl">View All Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Global Infrastructure</CardTitle>
            <CardDescription>
              Monitor and scale worldwide deployment regions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/admin/infrastructure">
              <Button className="w-full rounded-xl">
                Infrastructure Status
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
