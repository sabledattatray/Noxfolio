'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, UserPlus, Mail, Trash2, Shield } from 'lucide-react';

export default function UserAccessPage() {
  const members = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Owner',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Admin',
      status: 'Active',
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Access</h1>
          <p className="text-muted-foreground mt-1">
            Manage who can access your business and what they can do.
          </p>
        </div>
        <Button className="shadow-primary/20 gap-2 rounded-xl shadow-lg">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            A list of all users currently associated with this organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-border/50 border-b">
                  <th className="text-muted-foreground pt-0 pb-4 text-sm font-semibold">
                    Member
                  </th>
                  <th className="text-muted-foreground pt-0 pb-4 text-sm font-semibold">
                    Role
                  </th>
                  <th className="text-muted-foreground pt-0 pb-4 text-sm font-semibold">
                    Status
                  </th>
                  <th className="text-muted-foreground pt-0 pb-4 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border/50 divide-y">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="group hover:bg-accent/30 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{member.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Shield className="text-primary h-3.5 w-3.5" />
                        {member.role}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
