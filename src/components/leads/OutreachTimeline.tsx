import { useLeadOutreach } from '@/hooks/useLeads';
import { formatDateTime } from '@/lib/utils';
import { MessageSquare, Phone, Mail, Home, User, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const channelIcons: Record<string, React.ReactNode> = {
  sms: <MessageSquare className="h-4 w-4" />,
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  voicemail: <Phone className="h-4 w-4" />,
  direct_mail: <Home className="h-4 w-4" />,
  in_person: <User className="h-4 w-4" />,
};

const channelColors: Record<string, string> = {
  sms: 'bg-blue-100 text-blue-600 border-blue-200',
  call: 'bg-green-100 text-green-600 border-green-200',
  email: 'bg-purple-100 text-purple-600 border-purple-200',
  voicemail: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  direct_mail: 'bg-orange-100 text-orange-600 border-orange-200',
  in_person: 'bg-pink-100 text-pink-600 border-pink-200',
};

interface OutreachTimelineProps {
  leadId: string;
}

export function OutreachTimeline({ leadId }: OutreachTimelineProps) {
  const { data: activities, isLoading } = useLeadOutreach(leadId);

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1,2,3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-6 text-gray-400">
        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">No outreach recorded yet</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {/* Timeline line */}
      <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-200" />

      {activities.map((a: any, idx: number) => (
        <div
          key={a.id}
          className={cn(
            'flex gap-3 relative',
            a.direction === 'inbound' ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {/* Icon */}
          <div className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center border shrink-0 bg-white z-10',
            channelColors[a.channel] || 'bg-gray-100 text-gray-600 border-gray-200'
          )}>
            {channelIcons[a.channel] || <MessageSquare className="h-4 w-4" />}
          </div>

          {/* Content bubble */}
          <div className={cn(
            'flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200',
            a.direction === 'inbound' ? 'bg-blue-50 border-blue-200' : ''
          )}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium capitalize text-gray-800">
                {a.channel}
              </span>
              <span className={cn(
                'inline-flex items-center gap-1 text-xs',
                a.direction === 'inbound' ? 'text-blue-600' : 'text-gray-400'
              )}>
                {a.direction === 'inbound'
                  ? <ArrowDownLeft className="h-3 w-3" />
                  : <ArrowUpRight className="h-3 w-3" />}
                {a.direction}
              </span>
              {a.status && (
                <span className="text-xs text-gray-400 capitalize">{a.status}</span>
              )}
              <span className="ml-auto text-xs text-gray-400">
                {formatDateTime(a.created_at)}
              </span>
            </div>
            {a.message && (
              <p className="mt-1.5 text-sm text-gray-700">"{a.message}"</p>
            )}
            {a.response && (
              <p className="mt-1 text-sm text-blue-700 italic">↩ "{a.response}"</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
