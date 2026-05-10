import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  Shield,
  Activity as ActivityIcon,
  Globe,
  ArrowRight,
  Database,
  Fingerprint,
  type LucideIcon,
} from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';
import { getActivityLogs } from '@/lib/db/queries';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_ORGANIZATION]: Shield,
  [ActivityType.REMOVE_ORGANIZATION_MEMBER]: UserMinus,
  [ActivityType.INVITE_ORGANIZATION_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle,
  [ActivityType.ONBOARDING_COMPLETE]: CheckCircle,
};

function getSeverity(action: ActivityType): 'low' | 'medium' | 'high' {
  const high = [
    ActivityType.DELETE_ACCOUNT,
    ActivityType.UPDATE_PASSWORD,
    ActivityType.REMOVE_ORGANIZATION_MEMBER,
  ];
  const medium = [
    ActivityType.CREATE_ORGANIZATION,
    ActivityType.INVITE_ORGANIZATION_MEMBER,
  ];
  if (high.includes(action)) return 'high';
  if (medium.includes(action)) return 'medium';
  return 'low';
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return 'Identity Established';
    case ActivityType.SIGN_IN:
      return 'Access Granted';
    case ActivityType.SIGN_OUT:
      return 'Session Terminated';
    case ActivityType.UPDATE_PASSWORD:
      return 'Security Re-credentialed';
    case ActivityType.DELETE_ACCOUNT:
      return 'Permanent Deletion Request';
    case ActivityType.UPDATE_ACCOUNT:
      return 'Profile Metadata Sync';
    case ActivityType.CREATE_ORGANIZATION:
      return 'Workgroup Initialized';
    case ActivityType.REMOVE_ORGANIZATION_MEMBER:
      return 'Privileged Access Revoked';
    case ActivityType.INVITE_ORGANIZATION_MEMBER:
      return 'Outbound Collaboration Invite';
    case ActivityType.ACCEPT_INVITATION:
      return 'Network Participation Confirmed';
    case ActivityType.ONBOARDING_COMPLETE:
      return 'System Onboarding Finalized';
    default:
      return 'System Kernel Event';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-black tracking-tight text-transparent italic">
            Observability Hub
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Real-time immutable audit trail for organizational compliance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-border/50 bg-background/50 flex h-10 items-center gap-2 rounded-xl px-4 font-bold"
          >
            <Fingerprint className="text-primary h-4 w-4" />
            Audit Sync Active
          </Badge>
          <Badge
            variant="outline"
            className="border-border/50 bg-background/50 flex h-10 items-center gap-2 rounded-xl px-4 font-bold"
          >
            <Database className="h-4 w-4 text-amber-500" />
            Immutable Logs
          </Badge>
        </div>
      </div>

      <Card className="border-border/40 bg-card/10 overflow-hidden rounded-[32px] backdrop-blur-md">
        <CardHeader className="border-border/40 bg-accent/5 border-b pb-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                System Events
              </CardTitle>
              <CardDescription className="mt-1 text-xs font-medium">
                Comprehensive historical record of all high-privilege
                operations.
              </CardDescription>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Streaming
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {logs.length > 0 ? (
            <div className="divide-border/40 divide-y">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const severity = getSeverity(log.action as ActivityType);

                return (
                  <div
                    key={log.id}
                    className="group hover:bg-accent/5 relative flex items-center gap-6 p-6 transition-colors"
                  >
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-lg transition-all duration-500 ${
                        severity === 'high'
                          ? 'bg-destructive/10 border-destructive/20 text-destructive'
                          : severity === 'medium'
                            ? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                            : 'bg-primary/10 border-primary/20 text-primary'
                      } group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <p className="text-foreground group-hover:text-primary text-lg font-black tracking-tight transition-colors">
                            {formatAction(log.action as ActivityType)}
                          </p>
                          <Badge
                            className={`h-4 px-1.5 text-[8px] font-black tracking-tighter uppercase ${
                              severity === 'high'
                                ? 'bg-destructive/10 text-destructive'
                                : severity === 'medium'
                                  ? 'bg-amber-500/10 text-amber-500'
                                  : 'bg-emerald-500/10 text-emerald-500'
                            } border-transparent`}
                          >
                            {severity}
                          </Badge>
                        </div>
                        <time className="text-muted-foreground/60 bg-accent/50 rounded-lg px-3 py-1 text-xs font-black tracking-widest uppercase">
                          {getRelativeTime(new Date(log.timestamp))}
                        </time>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                          <UserCog className="text-primary/60 h-3.5 w-3.5" />
                          {log.userName || 'System Kernel'}
                        </div>
                        {log.ipAddress && (
                          <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
                            <Globe className="h-3.5 w-3.5 text-blue-500/60" />
                            {log.ipAddress}
                          </div>
                        )}
                        <div className="text-muted-foreground ml-auto flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100">
                          View Details
                          <ArrowRight className="text-primary h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
              <div className="bg-accent/20 group mb-8 flex h-24 w-24 rotate-12 items-center justify-center rounded-[32px] transition-transform duration-700 hover:rotate-0">
                <ActivityIcon className="text-muted-foreground/40 h-12 w-12" />
              </div>
              <h3 className="mb-2 text-2xl font-black tracking-tight">
                Zero Events Detected
              </h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed font-medium">
                Your organizational audit trail is currently vacant. Trigger an
                interaction to initiate high-fidelity tracking.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
