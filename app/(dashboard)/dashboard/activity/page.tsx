import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
};

function getSeverity(action: ActivityType): 'low' | 'medium' | 'high' {
  const high = [ActivityType.DELETE_ACCOUNT, ActivityType.UPDATE_PASSWORD, ActivityType.REMOVE_ORGANIZATION_MEMBER];
  const medium = [ActivityType.CREATE_ORGANIZATION, ActivityType.INVITE_ORGANIZATION_MEMBER];
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
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP: return 'Identity Established';
    case ActivityType.SIGN_IN: return 'Access Granted';
    case ActivityType.SIGN_OUT: return 'Session Terminated';
    case ActivityType.UPDATE_PASSWORD: return 'Security Re-credentialed';
    case ActivityType.DELETE_ACCOUNT: return 'Permanent Deletion Request';
    case ActivityType.UPDATE_ACCOUNT: return 'Profile Metadata Sync';
    case ActivityType.CREATE_ORGANIZATION: return 'Workgroup Initialized';
    case ActivityType.REMOVE_ORGANIZATION_MEMBER: return 'Privileged Access Revoked';
    case ActivityType.INVITE_ORGANIZATION_MEMBER: return 'Outbound Collaboration Invite';
    case ActivityType.ACCEPT_INVITATION: return 'Network Participation Confirmed';
    default: return 'System Kernel Event';
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic">
            Observability Hub
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">Real-time immutable audit trail for organizational compliance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-background/50 font-bold flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-primary" />
            Audit Sync Active
          </Badge>
          <Badge variant="outline" className="h-10 px-4 rounded-xl border-border/50 bg-background/50 font-bold flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-500" />
            Immutable Logs
          </Badge>
        </div>
      </div>

      <Card className="border-border/40 bg-card/10 backdrop-blur-md rounded-[32px] overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-accent/5 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">System Events</CardTitle>
              <CardDescription className="font-medium text-xs mt-1">Comprehensive historical record of all high-privilege operations.</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Live Streaming
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {logs.length > 0 ? (
            <div className="divide-y divide-border/40">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const severity = getSeverity(log.action as ActivityType);
                
                return (
                  <div key={log.id} className="relative flex items-center gap-6 p-6 group hover:bg-accent/5 transition-colors">
                    <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500 shadow-lg ${
                      severity === 'high' ? 'bg-destructive/10 border-destructive/20 text-destructive' :
                      severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                      'bg-primary/10 border-primary/20 text-primary'
                    } group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <p className="font-black text-foreground group-hover:text-primary transition-colors text-lg tracking-tight">
                            {formatAction(log.action as ActivityType)}
                          </p>
                          <Badge className={`text-[8px] h-4 px-1.5 uppercase font-black tracking-tighter ${
                            severity === 'high' ? 'bg-destructive/10 text-destructive' :
                            severity === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-emerald-500/10 text-emerald-500'
                          } border-transparent`}>
                            {severity}
                          </Badge>
                        </div>
                        <time className="text-xs font-black text-muted-foreground/60 uppercase tracking-widest bg-accent/50 px-3 py-1 rounded-lg">
                          {getRelativeTime(new Date(log.timestamp))}
                        </time>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                          <UserCog className="w-3.5 h-3.5 text-primary/60" />
                          {log.userName || 'System Kernel'}
                        </div>
                        {log.ipAddress && (
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            <Globe className="w-3.5 h-3.5 text-blue-500/60" />
                            {log.ipAddress}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                          <ArrowRight className="w-3 h-3 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-32 px-6">
              <div className="h-24 w-24 rounded-[32px] bg-accent/20 flex items-center justify-center mb-8 rotate-12 group hover:rotate-0 transition-transform duration-700">
                <ActivityIcon className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Zero Events Detected</h3>
              <p className="text-muted-foreground max-w-sm font-medium leading-relaxed">
                Your organizational audit trail is currently vacant. Trigger an interaction to initiate high-fidelity tracking.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
