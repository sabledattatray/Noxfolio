'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageCircle, Phone } from 'lucide-react';

export default function NotificationsSettings() {
  const channels = [
    {
      id: 'email',
      label: 'Email Notifications',
      description: 'Receive updates via your registered email.',
      icon: Mail,
    },
    {
      id: 'browser',
      label: 'Browser Push',
      description: 'Real-time alerts directly in your browser.',
      icon: Bell,
    },
    {
      id: 'sms',
      label: 'SMS Alerts',
      description: 'Critical security alerts sent to your phone.',
      icon: Phone,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Updates',
      description: 'Receive daily usage summaries on WhatsApp.',
      icon: MessageCircle,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notification Preferences
        </h1>
        <p className="text-muted-foreground mt-1">
          Choose how and when you want to be notified.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Communication Channels</CardTitle>
          <CardDescription>
            Enable or disable global notification delivery methods.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="border-border/50 hover:bg-accent/50 flex items-center justify-between space-x-4 rounded-xl border p-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <channel.icon className="text-primary h-5 w-5" />
                </div>
                <div>
                  <Label
                    htmlFor={channel.id}
                    className="text-base font-semibold"
                  >
                    {channel.label}
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    {channel.description}
                  </p>
                </div>
              </div>
              <Switch id={channel.id} defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="shadow-primary/20 rounded-xl px-8 shadow-lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
